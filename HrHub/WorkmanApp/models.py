from django.db import models


class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=500)


class Workman(models.Model):
    WorkmanId = models.AutoField(primary_key=True)
    WorkmanName = models.CharField(max_length=500)
    Department = models.CharField(max_length=500)
    HireDate = models.DateField()
    PhotoFileName = models.CharField(max_length=500)
