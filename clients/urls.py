from rest_framework import routers
from .views import ClientViewSet, ClientCampaignViewSet

router = routers.SimpleRouter()
router.register('', ClientViewSet, basename='client')
router.register(
    '(?P<client_pk>[^/.]+)/campaigns',
    ClientCampaignViewSet,
    basename='client_campaign'
)

urlpatterns = router.urls
