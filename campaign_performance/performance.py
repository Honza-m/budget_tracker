from clients.models import Budget
from clients.models import Spend
from datetime import date as datetimedate
from datetime import datetime
from datetime import timedelta
from django.db import models
from rest_framework.exceptions import ParseError
import math
import pandas as pd


class CampaignPerformance:
    """ Get aggregated info about one campaign """
    def __init__(self, campaign, start):
        # Initial arguments
        self.campaign = campaign
        self.start = start

        self.BUDGETS_NAME = 'Budgets'

        self.required_ran = False

    def get(self, filt=None):
        """ Return data
            filt: only return certain data (list)
        """
        # Required functions
        self.check_required()

        # Filter output
        results = {}
        if filt is None:
            filt = [
                'daily_data', 'daily_diff', 'cum_diff',
                'totals', 'info'
            ]

        # Optional functions
        # Prerequisits to multiple funcions
        if 'daily_diff' in filt or 'cum_diff' in filt:
            daily_diff = self.get_daily_diff()
        if 'daily_data' in filt or 'daily_diff' in filt:
            results['daily_index'] = self.daily_df.index

        # Single functions
        if 'daily_data' in filt:
            results['daily_data'] = self.daily_df.to_dict('list')
        if 'daily_diff' in filt:
            results['daily_diff'] = daily_diff
        if 'totals' in filt:
            results['totals'] = self.get_totals()
        if 'info' in filt:
            results['info'] = self.get_info()
        if 'cum_diff' in filt:
            results['cum_diff'] = self.get_cum_diff(daily_diff)
        # results['recommend'] = {'spend_per_day', 'spend_diff(spend per day vs avg_past_spend_per_day)'}

        print(results)
        return results

    def _get_start_date(self):
        """ self.start = week, month, quarter, year, all, or %Y-%m-%d date
        """
        today = datetimedate.today()
        if self.start == 'week':
            start_date = today - timedelta(days=today.weekday())
        elif self.start == 'month':
            start_date = today.replace(day=1)
        elif self.start == 'quarter':
            quarter = math.ceil(today.month / 3)
            start_date = datetimedate(
                today.year,
                ((quarter - 1) * 3) + 1,
                1
            )
        elif self.start == 'year':
            start_date = datetimedate(today.year, 1, 1)
        elif self.start == 'all':
            start_date = datetimedate(2010, 1, 1)
        else:
            try:
                start_date = datetime.strptime(self.start, "%Y-%m-%d").date()
            except Exception as e:
                raise ParseError("start argument not valid")

        self.start_date = start_date

    def _get_querysets(self):
        # GET SPEND
        # Only for same client as campaign
        spend = Spend.objects.filter(platform__client=self.campaign.client)
        # Only for same platforms as campaign
        spend = spend.filter(
            platform__pk__in=(
                self.campaign.platforms.values_list('pk', flat=True)
            )
        )
        # Only where spend end_date >= start_date
        spend = spend.filter(end_date__gte=self.start_date)
        # Apply regex filter to spend if provided by campaign
        if self.campaign.name_filter:
            spend = spend.filter(name__iregex=self.campaign.name_filter)

        # GET BUDGETS
        budgets = self.campaign.budget_set
        # Only where budget end_date >= start_date
        budgets = budgets.filter(end_date__gte=self.start_date)

        # SAVE
        self.spend = spend
        self.budgets = budgets

    def _convert_to_daily_df(self):
        daily = {}
        for each in self.budgets:
            # Calculate amount per day
            days = (each.end_date - each.start_date).days + 1
            daily_amount = each.amount / days
            for i in range(days):
                day = each.start_date + timedelta(days=i)
                if day < self.start_date:
                    continue
                daily.setdefault(self.BUDGETS_NAME, {})[day] = daily_amount

        for each in self.spend:
            name = each.platform.name
            if name == self.BUDGETS_NAME:
                name = f'{self.BUDGETS_NAME} (spend)'
            days = (each.end_date - each.start_date).days + 1
            daily_amount = each.amount / days
            for i in range(days):
                day = each.start_date + timedelta(days=i)
                if day < self.start_date:
                    continue
                dayspend = daily.setdefault(name, {}).setdefault(day, 0)
                daily[name][day] = dayspend + daily_amount

        df = pd.DataFrame(daily)
        # Change datetime dates to string and fillNA for later json
        df.index = [x.strftime('%Y-%m-%d') for x in df.index.tolist()]
        df.fillna(0, inplace=True)

        self.daily_df = df

    def _convert_spend_currency(self):
        if self.spend.count() > 0:
            spend_cur = list(set(
                self.spend.values_list('currency', flat=True)
            ))
            if spend_cur != [self.campaign.currency]:
                raise NotImplementedError(
                    "Currency converting not implemented, make sure budgets "
                    "and spends are in the same currency"
                )
            # Convert spend to list so that we can alter change currency
            self.spend = list(self.spend)
        else:
            self.spend = []

    def _get_budget_spend_series(self):
        try:
            self.budget_series = self.daily_df[self.BUDGETS_NAME]
        except KeyError:
            self.budget_series = pd.Series()

        self.spend_series = (
            self.daily_df
            .drop(self.BUDGETS_NAME, axis=1, errors='ignore')
            .sum(axis=1)
        )

    def check_required(self):
        """ Functions needed for any of the public methods to work """
        if not self.required_ran:
            self._get_start_date()
            self._get_querysets()
            self._convert_spend_currency()
            self._convert_to_daily_df()
            self._get_budget_spend_series()

            self.required_ran = True

    def get_daily_diff(self):
        self.check_required()
        res = self.budget_series - self.spend_series
        res.fillna(0, inplace=True)
        return res

    def get_cum_diff(self, daily_diff):
        self.check_required()
        return daily_diff.cumsum()

    def get_totals(self):
        self.check_required()
        spend_sum = self.spend_series.sum()
        budget_sum = self.budget_series.sum()
        spend_days = self.spend_series.count()
        budget_days = self.budget_series.count()
        diff = budget_sum - spend_sum
        totals = {
            'spend': spend_sum,
            'budget': budget_sum,
            'avg_spend_per_day': (
                spend_sum / spend_days
            ),
            'avg_budget_per_day': (
                budget_sum / budget_days
            ),
            'diff': diff,
            'avg_diff_per_day': diff / spend_days
        }

        for each in totals:
            if pd.isnull(totals[each]):
                totals[each] = 0

        return totals

    def get_info(self):
        info = {
            'last_spend': self.spend_series.dropna().index[-1]
        }

        return info
