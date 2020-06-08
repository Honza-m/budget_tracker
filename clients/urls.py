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

urlpatterns = [
    path('summary/', views.ClientSummaryView.as_view()),
    path('actions/', views.UserClientsActions.as_view())
]
urlpatterns += router.urls
