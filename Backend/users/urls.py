from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import google_login  # add to existing imports

from .views import (
    UserViewSet,
    RegisterView,
    google_login,
)

router = DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "login/refresh/",
        TokenRefreshView.as_view(),
        name="login_refresh"
    ),

    path("auth/google/", google_login, name="google-login"),  # add to urlpatterns


    path(
        "",
        include(router.urls)
    ),

]