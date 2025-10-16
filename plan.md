This is my plan for project 4 for the car dealership app.
USER STORIES

.AAU when i get on the landing page, i should be to see the different cars in each dealerships.
.AAU when i log-in, i should be able to explore all dealerships, with full information and prices.
.AAU i should be able to create, update, edit and delete a dealership.
.AAU i want to stay logged-in untill i log out or my token expires so that i dont have to log-in 
everytime.
.AAU i should be able to create and read also reviews from other users.
.AAU if i enter invalid credentials, i should get an error message.




STRETCH GOALS
. AAU i would like to be able to easily filter, advanced searches and sort cars depending 
on what im looking for.
.integrate live chats.
.integrate maps in the app so i can easily find dealerships and also 
dealerships near me.
.E-mail notifications when someone registers on the app.
.car comparison feature side by side so that i can see prices,
mileage and features.
.Include contact seller button through a link opens email with 
pre-filled message.

WIRE FRAME FOR MY APP 

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


    THIS WILL BE MY ENTITY RELATIONSHIP DIAGRAM

<img src="./Blank-diagram.jpeg" />
my ERD shows how many parts of my project data base are related.
four tables include user, dealership,cars and reviews.
Basically a dealership can have many cars and a car can have many reviews.
Each review comes from one user  and every car belongs to specific  dealership and owner.