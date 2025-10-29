# Project 4 Frontend Starter Code

This starter code is a react application that can be used as the starting point. It is designed to work with the following authentication flow:

## 🔐 Authentication

This app uses JWT (JSON Web Tokens) for authentication. You should have an API that can serve JWT tokens and the following request/response cycles set up:

### Register

```bash
POST /api/auth/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "profile_image": "https://example.com/image.jpg",
  "password": "securepassword123",
  "password_confirmation": "securepassword123"
}
```

### Login

```bash
POST /api/auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

Response:

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "message": "Welcome back johndoe"
}
```

### Get User

```bash
GET /api/auth/user/
Content-Type: application/json
```

Response:

```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "profile_image": "https://example.com/image.jpg"
}
```

Response:

Before using this starter code, you need to make sure your django application has an endpoint which will return the user.

To do this, add a UserView to your `authentication/views.py`

```python
class UserView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        serialized_user = UserSerializer(request.user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
```

and then update your `authentication/urls.py` to include an endpoint to call

```python
from django.urls import path
from .views import RegisterView, LoginView, UserView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
]
```

This will be important for being able to use the user context in our react app.

# Start

Setup: Create the .env and add the following text to it:

```plaintext
VITE_BACK_END_SERVER_URL=http://localhost:8000/api
```
