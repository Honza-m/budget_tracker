from rest_framework import serializers
from .models import Client, Campaign


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


class CurrentClient():
    """ Get current client from url """
    def set_context(self, serializer_field):
        self.client = serializer_field.kwargs.get('client_pk')

    def __call__(self):
        return self.client


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

    client = serializers.HiddenField(
        default=CurrentClient()
    )
