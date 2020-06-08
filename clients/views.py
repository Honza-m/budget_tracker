from rest_framework import viewsets, generics, mixins, status, views
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Client, Campaign
from .serializers import ClientSerializer, CampaignSerializer


class FivePerPagePagination(PageNumberPagination):
    """ Return pages of 5 and return total_pages """
    page_size = 5
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })


class ClientViewSet(viewsets.ModelViewSet):
    """ Access clients from user's organization """
    serializer_class = ClientSerializer
    pagination_class = FivePerPagePagination

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


class ClientSummaryView(generics.ListAPIView):
    """ Get all clients belonging to User with current status info """
    serializer_class = ClientSerializer
    pagination_class = FivePerPagePagination

    def get_queryset(self):
        return self.request.user.clients.all()


class UserClientsActions(views.APIView):
    """ Add or remove clients to/from a user list
        Expects a JSON like {
            "action": "add/remove",
            "ids": [1, 2, 3]
        }
    """

    def get_queryset(self):
        return self.request.user.clients.all()

    def post(self, request, *args, **kwargs):
        """ Adds or removes clients to/from a user list
        """
        # Return 400 if bad JSON
        if 'action' not in request.data or 'ids' not in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check all ids exist in organisation
        org_ids = (
            Client.objects.filter(organization=request.user.organization)
            .values_list('pk', flat=True)
        )
        for pk in request.data['ids']:
            if pk not in org_ids:
                return Response(
                    f"Client ID {pk} does not exist in your organization.",
                    status=status.HTTP_400_BAD_REQUEST
                )
            pass

        clients = Client.objects.filter(pk__in=request.data['ids'])
        # Add clients to list if asked for
        if request.data['action'] == 'add':
            for client in clients.all():
                request.user.clients.add(client)
        # Otherwise remove clients from list if asked for
        elif request.data['action'] == 'remove':
            for client in clients.all():
                request.user.clients.remove(client)
        # Otherwise return 400
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


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
