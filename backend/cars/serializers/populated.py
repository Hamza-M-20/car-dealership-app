from .common import CarSerializer
from dealerships.serializers.common import DealershipSerializer
from reviews.serializers.common import ReviewSerializer
from jwt_auth.serializers import UserSerializer

class PopulatedCarSerializer(CarSerializer):
    dealership = DealershipSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
