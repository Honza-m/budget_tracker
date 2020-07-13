from .models import Budget
from .models import Campaign
from .models import Client
from .models import Platform
from .models import Spend
from .models import SpendUploadRecord
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied


class CurrentUser():
    """ Get current user or it's attribute """
    def __init__(self, attribute=None):
        self.attribute = attribute

    def set_context(self, serializer_field):
        self.user = serializer_field.context['request'].user

    def __call__(self):
        if self.attribute is None:
            return self.user
        else:
            return getattr(self.user, self.attribute)


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

    organization = serializers.HiddenField(
        default=CurrentUser('organization')
    )


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

    client = serializers.HiddenField(default=None)

    def validate_platforms(self, platforms):
        """ Check platforms belong to client user has access to """
        user_clients = (
            self.context['request'].user
            .clients.values_list('pk', flat=True)
        )
        for platform in platforms:
            if platform.client.pk not in user_clients:
                raise serializers.ValidationError("Unknown platform")
        return platforms


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

    campaign = serializers.HiddenField(default=None)

    def validate(self, data):
        """ Make sure one campaign only has one budget at any day """
        budgets = Budget.objects.filter(
            campaign__pk=self.context['view'].kwargs['campaign_pk']
        )
        covered = budgets.values_list('start_date', 'end_date')
        for each in covered:
            sd_fail = (
                data['start_date'] >= each[0] and
                data['start_date'] <= each[1]
            )
            ed_fail = (
                data['end_date'] >= each[0] and
                data['end_date'] <= each[1]
            )
            over_fail = (
                each[0] >= data['start_date'] and
                each[1] <= data['end_date']
            )
            if sd_fail:
                raise serializers.ValidationError({
                    'start_date': "Start date conflicts with existing budget"
                })
            if ed_fail:
                raise serializers.ValidationError({
                    'end_date': "End date conflicts with existing budget"
                })
            if over_fail:
                raise serializers.ValidationError(
                    "Date conflicts with existing budget"
                )
        return data


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

    client = serializers.HiddenField(default=None)


class SpendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spend
        fields = '__all__'


class SpendUploadRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpendUploadRecord
        fields = '__all__'

    platform = serializers.SlugRelatedField("name", read_only=True)
    row_count = serializers.SerializerMethodField()

    def get_row_count(self, obj):
        return obj.spend_set.count()
