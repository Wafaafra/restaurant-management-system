from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, RecipeViewSet

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet)
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]