from django.urls import path
from .views import ReviewListView, DetailReviewView

urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', DetailReviewView.as_view()),
]