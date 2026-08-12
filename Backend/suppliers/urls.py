from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, SupplierPaymentViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'supplier-payments', SupplierPaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]