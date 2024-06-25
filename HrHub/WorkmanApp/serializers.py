from rest_framework import serializers
from .models import Departments, Workman


class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('DepartmentId', 'DepartmentName')


class WorkmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workman
        fields = ('WorkmanId', 'WorkmanName', 'Department', 'HireDate', 'PhotoFileName')
