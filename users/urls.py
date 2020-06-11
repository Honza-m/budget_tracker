from django.urls import path
from . import views

urlpatterns = [
    path('client-set/', views.ClientSet.as_view())
]
