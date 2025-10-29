#PROJECT TITLE 

##Car Dealership App

A full stack web application built with Django and react stack and custom authentication where users can easily register, login, signout, view all cars at the landing page, with links to each car to take you on the details page, where only the signed in user has some aspects to the application like create, edit,update, delete and see all the reviews. also see all the dealerships.

This is my plan for project 4 for the car dealership app.

## USER STORIES

- AAU when i get on the landing page, i should be to see the different cars in each dealerships.
- AAU when i log-in, i should be able to explore all dealerships, with full information and prices.
- AAU i should be able to create, update, edit and delete a dealership.
- AAU i want to stay logged-in untill i log out or my token expires so that i dont have to log-in everytime.
- AAU i should be able to create and read also reviews from other users.
- AAU if i enter invalid credentials, i should get an error message.

## STRETCH GOALS

- AAU i would like to be able to easily filter, advanced searches and sort cars depending on what im looking for.
- Integrate live chats.
- Integrate maps in the app so i can easily find dealerships and also dealerships near me.
- E-mail notifications when someone registers on the app.
- Car comparison feature side by side so that i can see prices, mileage and features.
- Include contact seller button through a link opens email with pre-filled message.

## WIRE FRAME FOR MY APP 

```
django/
├── authentication/     
│   ├── models.py       
│   ├── views.py       
│   ├── serializers.py  
│   ├── authentication.py 
│   └── urls.py         
│
├── dealerships/            
│   ├── models.py       
│   ├── views.py        
│   ├── serializers/    
│   └── urls.py         
│
├── cars/              
│   ├── models.py       
│   ├── views.py        
│   ├── serializers/    
│   └── urls.py         
│
├── reviews/           
│   ├── models.py       
│   ├── views.py        
│   ├── serializers/    
│   └── urls.py        
│
└── project/            
    ├── settings.py     
    └── urls.py  
```

## ENTITY RELATIONSHIP DIAGRAM

![Entity Relationship Diagram](./diagram-erd%202.png)
![Entity Relationship Diagram](./Blank-diagram.jpeg)

My ERD shows how many parts of my project data base are related.
Four tables include user, dealership, cars and reviews.
Basically a dealership can have many cars and a car can have many reviews.
Each review comes from one user and every car belongs to specific dealership and owner.

##FEATURES

##Authentication

Register and login endpoints 

Custom model with Django's AbstractUser

stay logged in using JWT 

Srcure Password using Django's inbuilt hashers

##Cars-Dealership

Full Crud operations 

Ownership based permissions. only users have access to edit/delete/create functionality

Foreign key relationship between owners , dealership and cars

Fields: Name, Make, Model, Year, Price, Mileage, Dealership, color

##Reviews

Users can add reviews

View Reviews per car

##Security 

JWT token-based authentication

Password validation and hashing

Owner-based resource protection

IsAuthenticatedOrReadOnly permissions

CORS headers for cross-origin requests

Explicit serializer fields (no __all__ for security)

##Serializer Structure

common.py - basic serializer

populated.py - serializers with nested data

write only fields for sensitive data


## Technology Stack

###Backend

Django

Django Rest Framework

Pyjwt

Django Cors Headers

Psycopg2

Pipenv

Python 3.11+

PostgreSql


###Frontend

React-router

Vite 6 

Tailwind

Axios

The frontend application runs at: [http://localhost:5173](http://localhost:5173)

###Development Tools

Pipenv

Npm

EsLint

Autopep8

###DataBase

Postgresql

Django object relational mapping

### Prerequisites

Python 3.11+

Pipenv

PostgreSQL

Node.js

## Installation & Setup

###Clone the Repository

[view on Github](https://github.com/Hamza-M-20/car-dealership-app)

cd backend

###Install Dependencies

pipenv install

###Activate Virtual Environment

pipenv shell

### Set Up PostgreSQL Database

# Create a PostgreSQL database named 'car-dealership-api'

createdb car-dealership-api

 ###Run Migrations

python3 manage.py migrate

###Create a Superuser 

python3 manage.py createsuperuser

###Start the Development Server

python3 manage.py runserver

[The API will be Available at](http://localhost:8000)

##Frontend 

cd frontend

Run npm install

Run npm run dev

The frontend application runs at: [http://localhost:5173](http://localhost:5173)






API ENDPOINTS

## Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Register a new user | No |
| POST | `/api/auth/login/` | Login and receive JWT token | No |

## Cars Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cars/` | List all cars | No |
| POST | `/api/cars/` | Create new car | Yes |
| GET | `/api/cars/{id}/` | Get specific car details | No |
| PUT | `/api/cars/{id}/` | Update car | Yes  |
| DELETE | `/api/cars/{id}/` | Delete car | Yes  |

## Dealerships Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dealerships/` | List all dealerships | No |
| GET | `/api/dealerships/{id}/` | Get dealership details | No |

## Reviews Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/reviews/` | Create new review | Yes |
| GET | `/api/reviews/?car={car_id}` | Get reviews for specific car | No |

### Authentication
This API uses JWT (JSON Web Tokens) for authentication.

Using the Token
Include the token in the Authorization header for protected routes:

Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

##DATABASE Models

 "### User (Custom – extends AbstractUser)"

├── Inherited Fields (from AbstractUser)
│   ├── id (Primary Key)
│   ├── username (unique)
│   ├── password (hashed)
│   ├── is_active
│   ├── is_staff
│   └── is_superuser
│
├── Custom Fields
│   ├── email (EmailField, unique=True)
│   ├── created_at (DateTimeField, auto_now_add=True)
│   ├── updated_at (DateTimeField, auto_now=True)
│   ├── profile_image (CharField, max_length=350, null=True, blank=True)
│   ├── first_name (CharField, null=True, blank=True)
│   └── last_name (CharField, null=True, blank=True)
│
├── Relationships
│   ├── dealerships → Dealership (One-to-Many)
│   ├── cars → Car (One-to-Many)
│   └── reviews → Review (One-to-Many)
│
└── Methods
    └── __str__() → "{username}"


 "###Dealership"

├── Fields
│   ├── id (Primary Key )
│   ├── name (CharField, max_length=255)
│   ├── location (CharField, max_length=255)
│   ├── phone (CharField, max_length=20)
│   ├── email (EmailField)
│   └── owner (ForeignKey → jwt_auth.User)
│       ├── null=True
│       ├── blank=True
│       └── related_name='dealerships'
│
├── Relationships
│   ├── owner → User (One-to-Many)
│   │   └── One User can have many Dealerships
│   └── cars (via Car model)
│       └── One Dealership can have many Cars
│
└── Methods
    └── __str__()
        └── Returns: "{name} - {location}"


 "###Car"

├── Fields
│   ├── id (Primary Key )
│   ├── name (CharField, max_length=255)
│   ├── make (CharField, max_length=255)
│   ├── model (CharField, max_length=255)
│   ├── year (IntegerField)
│   ├── price (DecimalField, max_digits=10, decimal_places=2)
│   ├── color (CharField, max_length=255)
│   ├── mileage (IntegerField)
│   ├── dealership (ForeignKey → dealerships.Dealership, related_name='cars')
│   └── owner (ForeignKey → jwt_auth.User, related_name='cars', null=True, blank=True)
│
├── Relationships
│   ├── dealership → Dealership (Many-to-One)
│   ├── owner → User (Many-to-One)
│   └── reviews → Review (One-to-Many via Review.car, related_name='reviews')
│
└── Methods
    └── __str__() → "{year} {make} {model}"


 "###Review"

├── Fields
│   ├── id (Primary Key )
│   ├── text (TextField)
│   ├── created_at (DateTimeField, auto_now_add=True)
│   ├── owner (ForeignKey → jwt_auth.User, related_name='reviews')
│   └── car (ForeignKey → cars.Car, related_name='reviews')
│
├── Relationships
│   ├── owner → User (Many-to-One)
│   │   └── One User can have many Reviews
│   └── car → Car (Many-to-One)
│       └── One Car can have many Reviews
│
└── Methods
    └── __str__() → "Review by {owner.username}"



## Additional Resources

- [Django Docs](https://docs.djangoproject.com/)

- [DRF Docs](https://www.django-rest-framework.org/)

- [React Docs](https://react.dev/)

- [Tailwind Docs](https://tailwindcss.com/docs)

