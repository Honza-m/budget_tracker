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
