from .models import Client
from .models import Platform
from clients.models import Campaign
from django.test import TestCase
from model_bakery import baker
from rest_framework.test import APIClient
from users.models import Organization
from users.models import User


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
        self.assertEqual(len(r['results']), 1)

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


class CampaignEndpointTests(TestCase):
    """ Test security of the campaign endpoint
    """
    def setUp(self):
        o1 = baker.make('users.Organization')
        o2 = baker.make('users.Organization')
        self.u = baker.make('users.User', pk=1, organization=o1)
        c1 = baker.make('clients.Client', pk=1, organization=o1)
        self.u.clients.add(c1)
        baker.make('clients.Campaign', pk=1, client=c1)
        u2 = baker.make('users.User', pk=2)
        c2 = baker.make('clients.Client', pk=2, organization=o2)
        u2.clients.add(c2)
        baker.make('clients.Campaign', pk=2, client=c2)

        self.c = APIClient()
        self.c.force_authenticate(user=self.u)

    def test_campaign_get_own(self):
        r = self.c.get('/api/clients/1/campaigns/1/')
        self.assertEqual(r.status_code, 200)

    def test_campaign_get_foreign(self):
        # Test getting wrong campaign
        r = self.c.get('/api/clients/1/campaigns/2/')
        self.assertEqual(r.status_code, 404)
        # Test getting wrong campaign AND client
        r = self.c.get('/api/clients/2/campaigns/2/')
        self.assertEqual(r.status_code, 404)
        # Test getting wrogn client BUT right campaign
        r = self.c.get('/api/clients/2/campaigns/1/')
        self.assertEqual(r.status_code, 404)

    def test_campaign_list_own(self):
        r = self.c.get('/api/clients/1/campaigns/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(len(r.json()['results']), 1)

    def test_campaign_list_foreign(self):
        r = self.c.get('/api/clients/2/campaigns/')
        self.assertEqual(r.status_code, 404)

    def test_campaign_write_own(self):
        r = self.c.post(
            '/api/clients/1/campaigns/',
            {'name': 'ahoj', 'currency': 'GDP'},
            format='json'
        )
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Campaign.objects.count(), 3)

    def test_campaign_write_missing_fields(self):
        r = self.c.post(
            '/api/clients/1/campaigns/',
            {'name': 'ahoj'},
            format='json'
        )
        self.assertEqual(r.status_code, 400)

    def test_campaign_write_own_with_wrong_payload(self):
        r = self.c.post(
            '/api/clients/1/campaigns/',
            {'client': 2, 'name': 'ahoj', 'currency': 'GBP'},
            format='json'
        )
        self.assertEqual(r.status_code, 201)
        self.assertEqual(
            self.u.clients.first().campaign_set.count(),
            2
        )

    def test_campaign_write_foreign(self):
        r = self.c.post(
            '/api/clients/2/campaigns/',
            {'name': 'ahoj', 'currency': 'GBP'},
            format='json'
        )
        self.assertEqual(r.status_code, 404)

    def test_campaign_write_foreign_with_right_payload(self):
        r = self.c.post(
            '/api/clients/2/campaigns/',
            {'client': 1, 'name': 'ahoj', 'currency': 'GBP'},
            format='json'
        )
        self.assertEqual(r.status_code, 404)
        self.assertEqual(Campaign.objects.count(), 2)

    def test_campaign_delete_own(self):
        r = self.c.delete('/api/clients/1/campaigns/1/')
        self.assertEqual(r.status_code, 204)
        self.assertEqual(
            self.u.clients.first().campaign_set.count(),
            0
        )

    def test_campaign_delete_foreign(self):
        r = self.c.delete('/api/clients/2/campaigns/2/')
        self.assertEqual(r.status_code, 404)

    def tearDown(self):
        Organization.objects.all().delete()
        User.objects.all().delete()
        Client.objects.all().delete()
        Campaign.objects.all().delete()
        del self.c
        del self.u


class PlatformEndpointTest(TestCase):
    """ Test security of the platform endpoint
    """
    def setUp(self):
        o1 = baker.make('users.Organization')
        o2 = baker.make('users.Organization')
        self.u = baker.make('users.User', pk=1, organization=o1)
        c1 = baker.make('clients.Client', pk=1, organization=o1)
        self.u.clients.add(c1)
        baker.make('clients.Platform', pk=1, client=c1)
        u2 = baker.make('users.User', pk=2)
        c2 = baker.make('clients.Client', pk=2, organization=o2)
        u2.clients.add(c2)
        baker.make('clients.Platform', pk=2, client=c2)

        self.c = APIClient()
        self.c.force_authenticate(user=self.u)

    def test_platform_get_own(self):
        r = self.c.get('/api/clients/1/platforms/1/')
        self.assertEqual(r.status_code, 200)

    def test_platform_get_foreign(self):
        # Test getting wrong platform
        r = self.c.get('/api/clients/1/platforms/2/')
        self.assertEqual(r.status_code, 404)
        # Test getting wrong platform AND client
        r = self.c.get('/api/clients/2/platforms/2/')
        self.assertEqual(r.status_code, 404)
        # Test getting wrogn client BUT right platform
        r = self.c.get('/api/clients/2/platforms/1/')
        self.assertEqual(r.status_code, 404)

    def test_platform_list_own(self):
        r = self.c.get('/api/clients/1/platforms/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(len(r.json()['results']), 1)

    def test_platform_list_foreign(self):
        r = self.c.get('/api/clients/2/platforms/')
        self.assertEqual(r.status_code, 404)

    def test_platform_write_own(self):
        r = self.c.post(
            '/api/clients/1/platforms/',
            {'name': 'ahoj', 'kind': 'manual'},
            format='json'
        )
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Platform.objects.count(), 3)

    def test_platform_write_missing_fields(self):
        r = self.c.post(
            '/api/clients/1/platforms/',
            {'name': 'ahoj'},
            format='json'
        )
        self.assertEqual(r.status_code, 400)

    def test_platform_write_own_with_wrong_payload(self):
        r = self.c.post(
            '/api/clients/1/platforms/',
            {'platform': 2, 'name': 'ahoj', 'kind': 'manual'},
            format='json'
        )
        self.assertEqual(r.status_code, 201)
        self.assertEqual(
            self.u.clients.first().platform_set.count(),
            2
        )

    def test_platform_write_foreign(self):
        r = self.c.post(
            '/api/clients/2/platforms/',
            {'name': 'ahoj', 'kind': 'manual'},
            format='json'
        )
        self.assertEqual(r.status_code, 404)

    def test_platform_write_foreign_with_right_payload(self):
        r = self.c.post(
            '/api/clients/2/platforms/',
            {'platform': 1, 'name': 'ahoj', 'kind': 'manual'},
            format='json'
        )
        self.assertEqual(r.status_code, 404)
        self.assertEqual(Platform.objects.count(), 2)

    def test_platform_delete_own(self):
        r = self.c.delete('/api/clients/1/platforms/1/')
        self.assertEqual(r.status_code, 204)
        self.assertEqual(
            self.u.clients.first().platform_set.count(),
            0
        )

    def test_platform_delete_foreign(self):
        r = self.c.delete('/api/clients/2/platforms/2/')
        self.assertEqual(r.status_code, 404)

    def tearDown(self):
        Organization.objects.all().delete()
        User.objects.all().delete()
        Client.objects.all().delete()
        Platform.objects.all().delete()
        del self.c
        del self.u
