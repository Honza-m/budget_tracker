from rest_framework import routers
from django.urls import path
from . import views

router = routers.SimpleRouter()
router.register('', views.ClientViewSet, basename='client')
router.register(
    '(?P<client_pk>[^/.]+)/campaigns',
    views.ClientCampaignViewSet,
    basename='client_campaign'
)
router.register(
    '(?P<client_pk>[^/.]+)/platforms',
    views.ClientPlatformViewSet,
    basename='client_platforms'
)

urlpatterns = [
    path('summary/', views.ClientSummaryView.as_view())
]
urlpatterns += router.urls
