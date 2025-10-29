from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth import authenticate
from .serializers import UserSerializer
import jwt
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    def post(self, request):
        # get data from the request
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email) # get user with email
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials') # throw error
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')

        # timedelta can be used to calculate the difference between dates - passing 7 days gives you 7 days represented as a date that we can add to datetime.now() to get the date 7 days from now
        dt = datetime.now() + timedelta(days=7) # validity of token
        token = jwt.encode(
            {'sub': str(user_to_login.id), 'exp': int(dt.timestamp())}, # Use timestamp() instead of strftime('%s') for macOS compatibility
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({ 'token': token, 'message': f"Welcome back {user_to_login.username}"})
class userView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        serialized_user = UserSerializer(request.user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


