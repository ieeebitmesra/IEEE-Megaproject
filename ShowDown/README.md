
Team details:
Team name: Team Oblivion
Members:  Vishal karmakar , Harsh Kumar, Ashish Konaje

Domain: App development 
This app aims to promote sports for development and help the youth in India rediscover their love for sports . To facilitate these we have  created Showdown, showdown  is a sports management app that provides a suite of tools for coaches,sport academies , managers, players & sports fans who need to stay connected during games and practice.We have integrated services like sports match formation , independent team formation , following sports activities & opportunities  and curated sports news. The user gets  an option to choose sports of his interest from an array of options enabling a display of upcoming matches of the sports of interest .The user also gets access to curated news depending on the sports he's chosen .We have also integrated a location based access to sports  venues which can be used to host matches & play on!!


Technologies used : 
A Java/Kotlin based Android App 
xml/Adobe xd for frontend 
Java for backend
Google Firebase
HERE maps SDK for Android
HERE maps Places API
Sports news api

The APP:

![tia626732475791332918](https://user-images.githubusercontent.com/76583677/148654727-b7bbb5f8-7b16-44c9-a756-795c29c3e9c8.png)



Different activities in the app :

Getting started:This is the first page of the app which provides the user with a landing page & then proceeds to a get started page with getstated button which leads you to the sign up page .
Register/sign up: This section takes the email, password and confirm password from the user and uses email and password for authentication using Firebase Authentication.
Login: In this section the user can login using the email and password with which the user had registered or login with Facebook or google.Authentication is done with FirebaseAuth class.
Home page:
card views of all upcoming sports opportunities around the user .The card view contains an image of sport, venue, timing and the name of the user who hosted the match 
On the top right corner one can find a add button to host a new match  which redirects you to a page in which one can choose a sport , date, time and make use of the map feature to set the location .Once filled press “done” and you'll be able to view the newly hosted sport card view on the home page 
The top right has another profile button which opens an page from bottom with your image, name & other relevant features 
Card view :when a card view of the sport of liking is chosen it opens a top view court image of the respective sport and gives you an option to select an position in the sport (eg:batsman , wicketkeeper , bowler etc)& confirm this position and walla wour place is booked !! 
News: We have made use of an news API to access relevant sports news on our app 
Nearby : Using Here maps API we have given the access of all  nearby sports venues in the range of 5km to the user .We have displayed these venues as card views ,which when clicked  expands into a page  with images of venue, rating,location , distance, sports available ,review & other information .
My matches: in this section we can view all the matches we have hosted in the home page .



How to run ? :

