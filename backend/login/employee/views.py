from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer

@api_view(["GET"])
def getEmployeeList(self): # method
    employee = Employee.objects.all()
    serializer = EmployeeSerializer(employee, many=True) # serializing whole data
    return Response(serializer.data)

@api_view(["POST"])
def addEmployee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(["DELETE"])
def deleteEmployee(self, pk):
    employee = Employee.objects.get(id=pk)
    employee.delete()
    
    return Response("Employee Deleted")

@api_view(["PUT"])
def updateEmployee(request, pk):
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(instance = employee, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)