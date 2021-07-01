from django.db import models

# Create your models here.
class Employee(models.Model):
    empCode = models.CharField(max_length=3)
    empName = models.CharField(max_length=100)
    empMobile = models.CharField(max_length=15)
    user = models.CharField(max_length=50)