from django.urls import path
from rest_framework import urlpatterns, views
from rest_framework.urlpatterns import format_suffix_patterns

from .views import getEmployeeList, addEmployee, deleteEmployee, updateEmployee

urlpatterns = [
    path('getlist/', getEmployeeList),
    path('add/', addEmployee),
    path('delete/<str:pk>/', deleteEmployee),
    path('update/<str:pk>/', updateEmployee),
]

urlpatterns = format_suffix_patterns(urlpatterns)