from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    path(
        '',
        auth_views.LoginView.as_view(
            redirect_authenticated_user=True,
            template_name='users/login.html'
        ),
        name='login'
    ),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
