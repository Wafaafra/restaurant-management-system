from django.contrib import admin
from .models import FixedExpense, DailyExpense


@admin.register(FixedExpense)
class FixedExpenseAdmin(admin.ModelAdmin):
    list_display = ('expense_name', 'amount', 'expense_month')
    search_fields = ('expense_name',)


@admin.register(DailyExpense)
class DailyExpenseAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'expense_date')
    search_fields = ('title',)