from .models import Budget
from .models import Campaign
from .models import Client
from .models import Platform
from .models import Spend
from .models import SpendUploadRecord
from .serializers import BudgetSerializer
from .serializers import CampaignSerializer
from .serializers import ClientSerializer
from .serializers import PlatformSerializer
from .serializers import SpendSerializer
from .serializers import SpendUploadRecordSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from utils.pagination import DefaultPagination

import csv


class ClientViewSet(viewsets.ModelViewSet):
    """ Access clients from user's organization """
    serializer_class = ClientSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        return self.request.user.clients.all()

    def perform_create(self, serializer):
        """ Add client to user's clients on create """
        client = serializer.save()
        self.request.user.clients.add(client)


class ClientAccessMixin:
    """ Checks that user has access to client for
        viewsets that depend on client_pk url
    """
    def _check_client_access(self):
        """ Make sure client exists and belongs to the same organization """
        client = (
            Client.objects
            .filter(pk=self.kwargs.get('client_pk'))
            .filter(organization=self.request.user.organization)
            .first()
        )
        if client is None:
            raise NotFound()

        return client

    def _check_campaign_access(self, client):
        """ Make sure campaign belongs to client """
        campaign = (
            client.campaign_set
            .filter(pk=self.kwargs['campaign_pk']).first()
        )
        if campaign is None:
            raise NotFound()

        return campaign

    def _check_platform_access(self, client):
        """ Make sure platform belongs to client """
        platform = (
            client.platform_set
            .filter(pk=self.kwargs['platform_pk']).first()
        )
        if platform is None:
            raise NotFound()

        return platform


class CampaignViewSet(ClientAccessMixin, viewsets.ModelViewSet):
    """ Access campaigns belonging to client """
    serializer_class = CampaignSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        client = self._check_client_access()
        return Campaign.objects.filter(client=client)

    def perform_create(self, serializer):
        """ Assign client on resource create """
        client = self._check_client_access()
        serializer.save(client=client)


class BudgetViewSet(ClientAccessMixin, viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        client = self._check_client_access()
        campaign = self._check_campaign_access(client)
        return Budget.objects.filter(campaign=campaign)

    def perform_create(self, serializer):
        client = self._check_client_access()
        campaign = self._check_campaign_access(client)
        serializer.save(campaign=campaign)


class PlatformViewSet(ClientAccessMixin, viewsets.ModelViewSet):
    """ Access platforms client advertises on """
    serializer_class = PlatformSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        client = self._check_client_access()
        return Platform.objects.filter(client=client)

    def perform_create(self, serializer):
        """ Assign client on resource create """
        client = self._check_client_access()
        serializer.save(client=client)


class SpendROViewSet(ClientAccessMixin, viewsets.ReadOnlyModelViewSet):
    """ Read individual spend records """
    serializer_class = SpendSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        client = self._check_client_access()
        platform = self._check_platform_access(client)
        return Spend.objects.filter(platform=platform)


class SpendUploadRecordViewSet(ClientAccessMixin, viewsets.ModelViewSet):
    """ Access spend upload records """
    serializer_class = SpendUploadRecordSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        client = self._check_client_access()
        platform = self._check_platform_access(client)
        return SpendUploadRecord.objects.filter(platform__pk=platform.pk)

    def perfom_create(self, serializer):
        """ Asign platform to new resources from URL string """
        client = self._check_client_access()
        platform = self._check_platform_access(client)
        serializer.save(platform=platform)


class UploadSpendView(ClientAccessMixin, views.APIView):
    """ Endpoint to upload spend as a CSV file """

    def post(self, request, *args, **kwargs):
        # Check access
        client = self._check_client_access()
        platform = self._check_platform_access(client)
        # Create a SpendUpload record
        upload_record = SpendUploadRecord(
            platform=platform,
            name=request.FILES['csvfile'].name
        )
        upload_record.save()
        # Load csv
        file = request.FILES['csvfile'].read().decode('utf-8').splitlines()
        reader = csv.DictReader(file)
        # Save each row as one spend
        spendrows = []
        for row in reader:
            spendrows.append(
                Spend(
                    upload_record=upload_record,
                    platform=platform,
                    **row
                )
            )
        Spend.objects.bulk_create(spendrows)

        return Response(status=status.HTTP_201_CREATED)
