from django.db import models as mod

PLATFORM_CHOICES = [
    ('manual', 'Manual data import')
]


class Client(mod.Model):
    """ Entity that you create budgets and campaigns for """
    class Meta:
        ordering = ['name']
    name = mod.CharField(max_length=200)
    organization = mod.ForeignKey('users.Organization', on_delete=mod.CASCADE)


class Platform(mod.Model):
    """ TODO: docstring """
    client = mod.ForeignKey('clients.Client', on_delete=mod.CASCADE)
    name = mod.CharField(max_length=150)
    kind = mod.CharField(max_length=50, choices=PLATFORM_CHOICES)


class Spend(mod.Model):
    """ TODO: docstring + start date comes before end date """
    upload_record = mod.ForeignKey(
        'clients.SpendUploadRecord', on_delete=mod.CASCADE
    )
    platform = mod.ForeignKey(
        'clients.Platform', on_delete=mod.CASCADE
    )
    name = mod.CharField(max_length=1000)
    currency = mod.CharField(max_length=3)
    start_date = mod.DateField()
    end_date = mod.DateField()
    amount = mod.FloatField()


class SpendUploadRecord(mod.Model):
    class Meta:
        ordering = ['date_uploaded']
    """ TODO: docstring """
    platform = mod.ForeignKey(
        'clients.Platform', on_delete=mod.CASCADE
    )
    name = mod.CharField(max_length=300)
    date_uploaded = mod.DateTimeField(auto_now_add=True)


class Campaign(mod.Model):
    """ TODO: docstring """
    class Meta:
        ordering = ['name']
    client = mod.ForeignKey('clients.Client', on_delete=mod.CASCADE)
    name = mod.CharField(max_length=300)
    currency = mod.CharField(max_length=3)
    name_filter = mod.CharField(max_length=1000, null=True, blank=True)
    platforms = mod.ManyToManyField('clients.Platform')


class Budget(mod.Model):
    """ TODO: docstring + start date comes before end date """
    campaign = mod.ForeignKey('clients.Campaign', on_delete=mod.CASCADE)
    name = mod.CharField(max_length=300)
    start_date = mod.DateField()
    end_date = mod.DateField()
    amount = mod.FloatField()
