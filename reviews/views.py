from django.shortcuts import render
from rest_framework.views import APIView
# Response gives us a way of sending a http response to the user making the request, passing back data and other information
from rest_framework.response import Response
# status gives us a list of official/possible response codes
from rest_framework import status
# This is the import for the NotFound exception
from rest_framework.exceptions import NotFound
# import the IsAuthenticatedOrReadOnly class
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Review
from .serializers.common import ReviewSerializer

class ReviewListView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        print("CREATING REVIEW WITH USER ID", request.user.id)
        request.data['owner'] = request.user.id
        review_to_add = ReviewSerializer(data=request.data)
        try:
            review_to_add.is_valid()
            review_to_add.save()
            return Response(review_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("ERROR")
            return Response(e.__dict__ if e.__dict__ else (str(e)), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Create your views here.
class DetailReviewView(APIView):
    def get(self, request, pk):
        print("GET A REVIEW")
        review = Review.objects.get(pk=pk)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data, status=status.HTTP_200_OK)
    def put(self, request, pk):
        print("UPDATING A REVIEW")
        review = Review.objects.get(pk=pk)
        serialized_review = ReviewSerializer(review, data=request.data)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data, status=status.HTTP_200_OK)
# Create your views here.

