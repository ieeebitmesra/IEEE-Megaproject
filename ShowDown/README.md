
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
     
<img src="https://user-images.githubusercontent.com/76583677/148654862-c42f3242-def1-4a09-a973-1491c7883f46.png" width=25% height=25%>    <img src="https://user-images.githubusercontent.com/76583677/148654863-057ab670-a1d9-4d79-803e-2d4a49b94abe.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654868-08a26583-326d-488b-8b41-16a3b54dbc6b.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654866-563b01d0-2701-467c-9719-1854c86d0702.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654872-4398005a-3fb3-4548-a425-1bf848cde62c.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654872-4398005a-3fb3-4548-a425-1bf848cde62c.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654870-969359fb-c7da-4faf-8d29-8efb47dc7fb6.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654871-8783a475-4684-44f9-ad97-4a99d87cf72c.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654874-fc6c8346-84d1-4f08-bd64-47d1e574462f.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654875-42df603d-c1b6-4843-9666-c990191fc854.png" width=25% height=25%>     <img src="https://user-images.githubusercontent.com/76583677/148654876-2860a6da-a494-42ae-a076-fd8c7101af91.png" width=25% height=25%>   

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



https://user-images.githubusercontent.com/73362847/148655090-52410682-9fde-471f-b913-b58d66f4ba3a.mp4

