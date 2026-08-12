from django.contrib import admin
from .models import Sale, SaleItem


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'total_amount', 'sale_date')


@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = (
        'sale',
        'menu_item',
        'quantity',
        'unit_price',
        'total_price'
    )