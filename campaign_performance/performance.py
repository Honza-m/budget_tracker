from clients.models import Budget
from clients.models import Spend
from datetime import datetime
from datetime import timedelta
from django.db import models


def get_campaign_querysets(campaign):
    # GET SPEND
    # Only for same client as campaign
    spend = Spend.objects.filter(platform__client=campaign.client)
    # Only for same platforms as campaign
    spend = spend.filter(
        platform__pk__in=campaign.platforms.values_list('pk', flat=True)
    )
    # Apply regex filter to spend if provided by campaign
    if campaign.name_filter:
        spend = spend.filter(name__iregex=campaign.name_filter)

    # GET BUDGETS
    budgets = campaign.budget_set

    return (spend, budgets)


def convert_spend_currency(campaign, spend):
    if spend.count() > 0:
        spend_cur = list(set(spend.values_list('currency', flat=True)))
        if spend_cur != [campaign.currency]:
            raise NotImplementedError(
                "Currency converting not implemented, make sure budgets "
                "and spends are in the same currency"
            )
        # Convert spend to list so that we can alter change currency
        spend = list(spend)
    else:
        spend = []

    return spend


def get_campaign_performance(campaign):
    spend, budgets = get_campaign_querysets(campaign)
    spend = convert_spend_currency(campaign, spend)
    # SPLIT BUDGETS AND SPEND TO ARRAY OF DAILY CHUNK
    # Loop through all spend and add to array
    start_date = datetime(2100, 1, 1)
    end_date = datetime(1990, 1, 1)
    result = {}
    for sp in spend:
        # Note min date
        # Calculate amount per day
        days = (sp.end_date - sp.start_date).days + 1
        daily_amount = sp.amount / days
        # Add daily amount to result
        for i in range(days):
            day = sp.start_date + timedelta(days=i)
            result.setdefault(day, {}).setdefault('spend', daily_amount)

    # Loop through all budgets and add to array
    for bg in budgets.all():
        # Calculate amount per day
        days = (bg.end_date - bg.start_date).days + 1
        daily_amount = bg.amount / days
        # Add daily amount to result
        for i in range(days):
            day = bg.start_date + timedelta(days=i)
            result.setdefault(day, {}).setdefault('budget', daily_amount)

    # Return empty {} if no budgets or spend
    if len(result) == 0:
        return result

    # Fill in missing days and budgets/spend if needed
    min_date = min(list(result.keys()))
    max_date = max(list(result.keys()))
    total_dates = (max_date - min_date).days + 1
    for i in range(total_dates):
        day = min_date + timedelta(days=i)
        result.setdefault(day, {}).setdefault('budget', 'NaN')
        result[day].setdefault('spend', 'NaN')

    # Convert keys to string so that serializable into JSON
    result_converted = {}
    for each in result:
        result_converted[each.strftime('%Y-%m-%d')] = result[each]
    result = result_converted

    # Convert to Chartjs design
    result2 = {
        'labels': list(result.keys()),
        'datasets': [
            {
                'label': 'Spend',
                'data': [result[x]['spend'] for x in result],
                'backgroundColor': 'rgb(255, 99, 132)',
                'borderColor': 'rgb(255, 99, 132)',
            },
            {
                'label': 'Budget',
                'data': [result[x]['budget'] for x in result]
            },
        ]
    }

    return result2
