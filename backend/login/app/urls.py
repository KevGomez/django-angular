from django.urls import path
from rest_framework import urlpatterns, views
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ProfileView

urlpatterns = [
    path('profile/', ProfileView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)