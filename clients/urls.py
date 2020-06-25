from rest_framework import routers
from django.urls import path
from . import views

router = routers.SimpleRouter()
router.register('', views.ClientViewSet, basename='client')
router.register(
    '(?P<client_pk>[^/.]+)/campaigns',
    views.CampaignViewSet,
    basename='campaign'
)
router.register(
    '(?P<client_pk>[^/.]+)/campaigns/(?P<campaign_pk>[^/.]+)/budgets',
    views.BudgetViewSet,
    basename='budget'
)
router.register(
    '(?P<client_pk>[^/.]+)/platforms',
    views.PlatformViewSet,
    basename='platform'
)
router.register(
    '(?P<client_pk>[^/.]+)/platforms/(?P<platform_pk>[^/.]+)/spend',
    views.SpendROViewSet,
    basename='spend'
)
router.register(
    '(?P<client_pk>[^/.]+)/platforms/(?P<platform_pk>[^/.]+)'
    '/spend-upload-records',
    views.SpendUploadRecordViewSet,
    basename='spend_upload'
)

urlpatterns = [
    path(
        '<int:client_pk>/platforms/<int:platform_pk>/spend/upload/',
        views.UploadSpendView.as_view()
    )
]
urlpatterns += router.urls
