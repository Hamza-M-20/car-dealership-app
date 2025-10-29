from django.urls import path
from .views import RegisterView, LoginView, userView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', userView.as_view()),
]