from django.contrib import admin
from .models import Purchase, PurchaseItem


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'supplier', 'total_amount', 'purchase_date')


@admin.register(PurchaseItem)
class PurchaseItemAdmin(admin.ModelAdmin):
    list_display = (
        'purchase',
        'product',
        'quantity',
        'unit_price',
        'total_price'
    )