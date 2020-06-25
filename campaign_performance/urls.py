from django.urls import path
from . import views

urlpatterns = [
    path('<int:campaign_pk>/', views.CampaignPerformance.as_view())
]
