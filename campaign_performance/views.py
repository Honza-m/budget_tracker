from clients.models import Campaign
from rest_framework import views
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .performance import get_campaign_performance


class CampaignPerformance(views.APIView):
    def _check_campaign_in_users_client(self):
        clients = self.request.user.clients.values_list('pk', flat=True)
        camp = Campaign.objects.get(pk=self.kwargs['campaign_pk'])
        if camp.client.pk not in clients:
            raise NotFound
        return camp

    def get(self, request, *args, **kwargs):
        campaign = self._check_campaign_in_users_client()
        result = get_campaign_performance(campaign)
        return Response(data=result, status=status.HTTP_200_OK)
