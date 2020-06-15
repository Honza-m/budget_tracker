from django.db import models as mod
from django.utils import timezone

PLATFORM_CHOICES = [
    ('manual', 'Manual data import')
]


class Client(mod.Model):
    """ Entity that you create budgets and campaigns for """
    class Meta:
        ordering = ['name']
    name = mod.CharField(max_length=200)
    organization = mod.ForeignKey('users.Organization', on_delete=mod.CASCADE)


class ClientPlatform(mod.Model):
    """ TODO: docstring """
    client = mod.ForeignKey('clients.Client', on_delete=mod.CASCADE)
    kind = mod.CharField(max_length=50, choices=PLATFORM_CHOICES)


class Spend(mod.Model):
    """ TODO: docstring """
    client_platform = mod.ForeignKey(
        'clients.ClientPlatform', on_delete=mod.CASCADE
    )
    name = mod.CharField(max_length=1000)
    currency = mod.CharField(max_length=3)
    start_date = mod.DateField()
    end_date = mod.DateField()
    amount = mod.FloatField()


class Campaign(mod.Model):
    """ TODO: docstring """
    class Meta:
        ordering = ['name']
    client = mod.ForeignKey('clients.Client', on_delete=mod.CASCADE)
    name = mod.CharField(max_length=300)
    currency = mod.CharField(max_length=3)
    name_filter = mod.CharField(max_length=1000, null=True, blank=True)


class CampaignBudget(mod.Model):
    """ TODO: docstring """
    campaign = mod.ForeignKey('clients.Campaign', on_delete=mod.CASCADE)
    platforms = mod.ManyToManyField('clients.ClientPlatform')
    start_date = mod.DateField(default=timezone.now)
    end_date = mod.DateField()
    amount = mod.FloatField()
