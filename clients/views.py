from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from .models import Client, Campaign
from .serializers import ClientSerializer, CampaignSerializer


class ClientViewSet(viewsets.ModelViewSet):
    """ Access clients from user's organization """
    serializer_class = ClientSerializer

    def get_queryset(self):
        return (
            Client.objects
            .filter(organization=self.request.user.organization)
            .all()
        )

    def perform_create(self, serializer):
        """ Add client to user's clients on create """
        client = serializer.save()
        self.request.user.clients.add(client)


class ClientCampaignViewSet(viewsets.ModelViewSet):
    """ Access campaigns belonging to client """
    serializer_class = CampaignSerializer

    def get_queryset(self):
        # Make sure client exists and belongs to the same organization
        client = (
            Client.objects
            .filter(pk=self.kwargs.get('client_pk'))
            .filter(organization=self.request.user.organization)
            .first()
        )
        if client is None:
            raise PermissionDenied()

        # Return all campaigns belonging to the client
        return Campaign.objects.filter(client__pk=client.pk).all()

    def perform_create(self, serializer):
        """ Assign client on campaign create """
        # No need to check cause already checked in get_queryset
        client = Client.objects.get(pk=self.kwargs['client_pk'])
        serializer.save(client=client)
