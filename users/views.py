from clients.models import Client
from clients.serializers import ClientSerializer
from rest_framework import status
from rest_framework import views
from rest_framework.exceptions import ParseError
from rest_framework.response import Response


class ClientSet(views.APIView):
    """ GET returns a list of user's client IDS
        POST makes user's client set identical with request
        POST Expects a JSON like [1, 2, 3]
    """
    serializer_class = ClientSerializer

    def get_queryset(self):
        return self.request.user.clients.all()

    def get(self, request, *args, **kwargs):
        """ Lists Users's clients """
        client_ids = request.user.clients.all().values_list('pk', flat=True)
        return Response(
            data={'results': client_ids},
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        """ Updates User's client set according to request
        """
        # Check JSON
        try:
            pks = [int(x) for x in request.data]
        except Exception:
            raise ParseError('Invalid payload, expects JSON list with IDs')

        # Check all ids exist in organisation
        org_ids = (
            Client.objects.filter(organization=request.user.organization)
            .values_list('pk', flat=True)
        )
        for pk in pks:
            if pk not in org_ids:
                raise ParseError(
                    f"Client ID {pk} does not exist in your organization."
                )

        # Remove all current clients from User
        request.user.clients.clear()
        # Add clients to User's set if required
        clients = Client.objects.filter(pk__in=pks)
        for client in clients.all():
            request.user.clients.add(client)

        return Response(status=status.HTTP_204_NO_CONTENT)
