from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from.models import Task, CustomUser
# Register your models here.
admin.site.register(Task)
admin.site.register(CustomUser, UserAdmin)