from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Departments, Workman
from .serializers import DepartmentsSerializer, WorkmanSerializer

from django.core.files.storage import default_storage


@csrf_exempt
def departmentApi(request, id=0):
    if request.method == 'GET':
        departments = Departments.objects.all()
        departments_serializer = DepartmentsSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentsSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serializer = DepartmentsSerializer(department, data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        department = Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def workmanApi(request, id=0):
    if request.method == 'GET':
        workman = Workman.objects.all()
        workman_serializer = WorkmanSerializer(workman, many=True)
        return JsonResponse(workman_serializer.data, safe=False)
    elif request.method == 'POST':
        workman_data = JSONParser().parse(request)
        workman_serializer = WorkmanSerializer(data=workman_data)
        if workman_serializer.is_valid():
            workman_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        workman_data = JSONParser().parse(request)
        workman = Workman.objects.get(WorkmanId=workman_data['WorkmanId'])
        workman_serializer = WorkmanSerializer(workman, data=workman_data)
        if workman_serializer.is_valid():
            workman_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        workman = Workman.objects.get(WorkmanId=id)
        workman.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)
