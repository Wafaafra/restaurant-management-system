from rest_framework import viewsets
from .models import Supplier, SupplierPayment
from .serializers import SupplierSerializer, SupplierPaymentSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('-created_at')
    serializer_class = SupplierSerializer


class SupplierPaymentViewSet(viewsets.ModelViewSet):
    queryset = SupplierPayment.objects.all().order_by('-payment_date')
    serializer_class = SupplierPaymentSerializer