from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FixedExpenseViewSet, DailyExpenseViewSet

router = DefaultRouter()
router.register(r'fixed-expenses', FixedExpenseViewSet)
router.register(r'daily-expenses', DailyExpenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]