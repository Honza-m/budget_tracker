from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignupUserView.as_view()),
    path('signup/next-step/<str:uid>/', views.NextSignupStep.as_view()),
    path('signup/organization/', views.SignupEditOrganization.as_view()),
    path('signup/password/', views.SignupSetPassword.as_view()),
    path('client-set/', views.ClientSet.as_view())
]
