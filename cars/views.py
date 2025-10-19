from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Car
from .serializers.common import CarSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import PermissionDenied

class CarListView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, request):
        cars = Car.objects.all()
        serialized_cars = CarSerializer(cars, many=True)
        return Response(serialized_cars.data)
    def post(self, request):
        request.data['owner'] = request.user.id
        serialized_cars = CarSerializer(data=request.data)
        serialized_cars.is_valid(raise_exception=True)
        serialized_cars.save()
        return Response(serialized_cars.data, status=status.HTTP_201_CREATED)

class CarDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get_car(self, pk):
        try:
            return Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            raise NotFound(detail="Car not found")

    def get(self, _request, pk):
        from .serializers.populated import PopulatedCarSerializer
        car = self.get_car(pk=pk)
        serialized_car = PopulatedCarSerializer(car)
        return Response(serialized_car.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        car_to_update = self.get_car(pk=pk)
        if car_to_update.owner != request.user:
            raise PermissionDenied
        updated_car = CarSerializer(car_to_update, data=request.data)
        if updated_car.is_valid():
            updated_car.save()
            return Response(updated_car.data, status=status.HTTP_200_OK)
        return Response(updated_car.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)   

    def delete(self, request, pk):
        car_to_delete = self.get_car(pk=pk)
        if car_to_delete.owner != request.user:
            raise PermissionDenied
        car_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)