from django.contrib import admin
from .models import Product, StockMovement


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'unit',
        'current_stock',
        'minimum_stock',
        'created_at'
    )
    search_fields = ('name',)
    list_filter = ('unit',)


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'movement_type',
        'quantity',
        'reference_type',
        'reference_id',
        'movement_date'
    )
    list_filter = ('movement_type',)