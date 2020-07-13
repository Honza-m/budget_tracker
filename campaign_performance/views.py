from clients.models import Campaign
from rest_framework import views
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .performance import CampaignPerformance


class CampaignPerformanceView(views.APIView):
    def _check_campaign_in_users_client(self):
        clients = self.request.user.clients.values_list('pk', flat=True)
        camp = Campaign.objects.get(pk=self.kwargs['campaign_pk'])
        if camp.client.pk not in clients:
            raise NotFound
        return camp

    def get(self, request, *args, **kwargs):
        # Get start time (default this month)
        start = request.GET.get('start', 'month')
        # Get filters (comma-delimined string)(default None)
        filters = request.GET.get('filters')
        if filters is not None:
            filters = filters.split(',')
        # Check campaign access
        campaign = self._check_campaign_in_users_client()
        # Get and return data
        result = CampaignPerformance(campaign, start).get(filters)
        return Response(data=result, status=status.HTTP_200_OK)
