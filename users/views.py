from .models import Organization
from .models import User
from .serializers import SignupUserSerializer
from .serializers import OrganizationSerializer
from .serializers import SetPasswordSerializer
from .tokens import account_activation_token
from clients.models import Client
from clients.serializers import ClientSerializer
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from django.utils.encoding import force_bytes
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import ParseError
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response


class SignupUserView(generics.CreateAPIView):
    """ POST creates an org, user, and sends confirmation email """
    serializer_class = SignupUserSerializer
    permission_classes = []

    def perform_create(self, serializer):
        """ Send activation email upon user creation """
        user = serializer.save()
        token = account_activation_token.make_token(user)
        site = get_current_site(self.request)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        link = f"{site}/signup/confirm-token/{uid}/{token}/"
        email = EmailMessage("Activate account", link, to=[user.email])
        email.send()


class NextSignupStep(views.APIView):
    """ Provide uid from signup email as get param to receive guidance
        on next step
    """
    permission_classes = []

    def get(self, request, uid):
        uid = force_text(urlsafe_base64_decode(uid))
        user = get_object_or_404(User, pk=uid)
        if user.organization_owner and user.organization.name == 'SIGNUPDUMMY':
            next_step = 'organization'
        elif not user.has_usable_password():
            next_step = 'password'
        else:
            next_step = 'login'

        return Response(
            data={'next_step': next_step}
        )


class SignupEditOrganization(views.APIView):
    permission_classes = []

    def patch(self, request):
        """ Authenticate with sign-up token in post """
        uid = request.data.get('uid')
        if not uid:
            raise ValidationError()
        uid = force_text(urlsafe_base64_decode(uid))
        user = get_object_or_404(User, pk=uid)
        token = request.data.get('token')
        token_valid = account_activation_token.check_token(user, token)

        if token_valid:
            org = Organization.objects.get(pk=user.organization.pk)
            ser = OrganizationSerializer(org, data=request.data)
            if ser.is_valid(raise_exception=True):
                ser.save()
                return Response(status=status.HTTP_200_OK)
        else:
            raise PermissionDenied()


class SignupSetPassword(views.APIView):
    """ Authenticate with signup token, set password and activate user """
    permission_classes = []

    def post(self, request):
        uid = request.data.get('uid')
        if not uid:
            raise ValidationError()
        uid = force_text(urlsafe_base64_decode(uid))
        user = get_object_or_404(User, pk=uid)
        token = request.data.get('token')
        token_valid = account_activation_token.check_token(user, token)

        if token_valid:
            ser = SetPasswordSerializer(
                user,
                data=request.data,
                context={'request': request}
            )
            if ser.is_valid(raise_exception=True):
                ser.save()
                user.is_active = True
                user.save()
                return Response(status=status.HTTP_200_OK)
        else:
            raise PermissionDenied()


class ClientSet(views.APIView):
    """ GET returns a list of user's client IDS
        POST makes user's client set identical with request
        POST Expects a JSON like [1, 2, 3]
    """
    serializer_class = ClientSerializer

    def get_queryset(self):
        return self.request.user.clients.all()

    def get(self, request, *args, **kwargs):
        """ Lists Users's clients as a list of PKs """
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
