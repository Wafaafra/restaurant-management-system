from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'role', 'salary', 'commission', 'created_at')
    search_fields = ('fullname', 'role')
    list_filter = ('role',)