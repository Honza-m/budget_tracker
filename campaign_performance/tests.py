from clients.models import Client
from clients.models import Platform
from clients.models import Campaign
from clients.models import Budget
from clients.models import Spend
from datetime import date
from django.test import TestCase
from model_bakery import baker
from .performance import get_campaign_performance


class CampaignPerformanceTests(TestCase):
    def setUp(self):
        c = baker.make('clients.Client')
        p = baker.make('clients.Platform', client=c)
        self.camp = baker.make(
            'clients.Campaign',
            client=c,
            name_filter=None,
            currency='GBP'
        )
        self.camp.platforms.add(p)

        baker.make(
            'clients.Budget',
            campaign=self.camp,
            start_date='2020-01-01',
            end_date='2020-01-31',
            amount=1000
        )
        baker.make(
            'clients.Spend',
            platform=p,
            currency='GBP',
            start_date='2020-01-01',
            end_date='2020-01-25',
            amount=890
        )

    def test_campaign_performance_function(self):
        res = get_campaign_performance(self.camp)
        self.assertEqual(len(res), 31)
        keys = list(res.keys())
        self.assertIn(date(2020, 1, 1), keys)
        self.assertIn(date(2020, 1, 15), keys)
        self.assertIn(date(2020, 1, 31), keys)

    def tearDown(self):
        Client.objects.all().delete()
        Platform.objects.all().delete()
        Campaign.objects.all().delete()
        Budget.objects.all().delete()
        Spend.objects.all().delete()
