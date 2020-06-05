from django.test import TestCase
from rest_framework.test import APIClient
from model_bakery import baker
from users.models import Organization, User
from .models import Client


class ClientRespectsOrganization(TestCase):
    def setUp(self):
        # Crete user with an organization and 1 client
        o = baker.make('users.Organization')
        u = baker.make('users.User', organization=o)
        baker.make('clients.Client', pk=1, organization=o)

        # Create another organization with 2 clients
        o2 = baker.make('users.Organization')
        baker.make('clients.Client', pk=2, organization=o2,)

        self.c = APIClient()
        self.c.force_authenticate(user=u)

    def test_client_endpoint_respects_organization(self):
        r = self.c.get('/api/clients/').json()
        self.assertEqual(len(r), 1)

    def test_user_cant_see_other_clients(self):
        r = self.c.get('/api/clients/2/')
        self.assertEqual(r.status_code, 404)

    def tearDown(self):
        Organization.objects.all().delete()
        User.objects.all().delete()
        Client.objects.all().delete()
        del self.c


class NewClientInCurrentOrganization(TestCase):
    """ Test that when user creates a client it belongs to the same
        organization as user.
    """
    def setUp(self):
        baker.make('users.Organization', _quantity=3)
        o = baker.make('users.Organization', name='testorg')
        self.u = baker.make('users.User', pk=1, organization=o)

        self.c = APIClient()
        self.c.force_authenticate(user=self.u)

    def test_new_client_organization_and_user(self):
        r = self.c.post(
            '/api/clients/',
            {'name': 'testclient'},
            format='json'
        )
        # Check client was created
        self.assertEqual(r.status_code, 201)
        # Check it has same organization as it's user
        self.assertEqual(self.u.clients.first().organization.name, 'testorg')

    def tearDown(self):
        Organization.objects.all().delete()
        User.objects.all().delete()
        Client.objects.all().delete()
        del self.c
        del self.u
