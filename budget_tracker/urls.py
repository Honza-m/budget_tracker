""" budget_tracker URL Configuration """
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as authviews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', authviews.obtain_auth_token),
    path('api/campaign-performance/', include('campaign_performance.urls')),
    path('api/clients/', include('clients.urls')),
    path('api/users/', include('users.urls')),
    path('', include('frontend.urls')),
]
