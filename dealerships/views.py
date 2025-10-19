from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Dealership
from .serializers.common import DealershipSerializer
from rest_framework.exceptions import NotFound

class DealershipListView(ListCreateAPIView):
   
    def get(self, _request):
        dealerships = Dealership.objects.all()
        serialized_dealerships = DealershipSerializer(dealerships, many=True)
        return Response(serialized_dealerships.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serialized_dealership = DealershipSerializer(data=request.data)
        serialized_dealership.is_valid(raise_exception=True)
        serialized_dealership.save()
        return Response(serialized_dealership.data, status=status.HTTP_201_CREATED)

class DetailDealershipView(APIView):
    
    def get_dealership(self, pk):
        try:
            dealership = Dealership.objects.get(pk=pk)
            return dealership
        except Dealership.DoesNotExist:
            raise NotFound(detail="Dealership not found")
    
    def get(self, _request, pk):
        dealership = self.get_dealership(pk=pk)
        serialized_dealership = DealershipSerializer(dealership)
        return Response(serialized_dealership.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        dealership = self.get_dealership(pk=pk)
        serialized_dealership = DealershipSerializer(dealership, data=request.data)
        serialized_dealership.is_valid(raise_exception=True)
        serialized_dealership.save()
        return Response(serialized_dealership.data, status=status.HTTP_200_OK)
    
    def delete(self, _request, pk):
        dealership = self.get_dealership(pk=pk)
        dealership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

