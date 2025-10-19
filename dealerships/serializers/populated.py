from rest_framework import serializers
from ..models import Dealership
from jwt_auth.serializers import UserSerializer

class PopulatedDealershipSerializer(serializers.ModelSerializer):
    cars = serializers.StringRelatedField(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = Dealership
        fields = '__all__'
   
