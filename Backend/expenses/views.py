from rest_framework import viewsets
from .models import FixedExpense, DailyExpense
from .serializers import FixedExpenseSerializer, DailyExpenseSerializer


class FixedExpenseViewSet(viewsets.ModelViewSet):
    queryset = FixedExpense.objects.all().order_by('-expense_month')
    serializer_class = FixedExpenseSerializer


class DailyExpenseViewSet(viewsets.ModelViewSet):
    queryset = DailyExpense.objects.all().order_by('-expense_date')
    serializer_class = DailyExpenseSerializer