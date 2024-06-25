from django.urls import path, re_path
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('department', views.departmentApi),
    re_path(r'department/([0-9]+)$', views.departmentApi),

    path('workman', views.workmanApi),
    re_path(r'workman/([0-9]+)$', views.workmanApi),

    path('workman/savefile', views.SaveFile),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
