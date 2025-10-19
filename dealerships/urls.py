from django.urls import path
from .views import DealershipListView, DetailDealershipView

urlpatterns = [
    path('', DealershipListView.as_view()),
    path('<int:pk>/', DetailDealershipView.as_view()),
]