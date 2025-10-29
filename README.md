PROJECT TITLE Car Dealership App
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

📋 Prerequisites
Python 3.11+
Pipenv
PostgreSQL
Node.js

⚙️ Installation & Setup
Clone the Repository
git clone 
cd Django

API ENDPOINTS

AUTHENTICATION

Method	Endpoint	           Description	                   Auth Required
POST	/api/auth/register/	  Register a new user	                  No
POST	/api/auth/login/	  Login and receive JWT token	          No

Cars ENDPOINTS
Method	     Endpoint	           Description	                Auth Required
Get          /api/cars/            List all cars                      No
Post         /api/cars/            create new car                     YES
Get          /api/cars/{id}        Get Specific car details           No
Put          /api/cars/{id}        update car                         YES
Delete       /api/cars/{id}        Delete car                         YES

Reviews Endpoints 
Method	  Endpoint	               Description	               Auth Required
Get       /api/cars/{id}/reviews   get a specific car reviews        NO
Post      /api/cars/{id}/reviews   create a review                   YES

🔐 Authentication
This API uses JWT (JSON Web Tokens) for authentication.

Using the Token
Include the token in the Authorization header for protected routes:

Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...