
<div align="center">
  <a href="#">
    <img src="https://raw.githubusercontent.com/mayukhpankaj/BIT-Clubs/main/public/logo.png" alt="BIT clubs" width="400" >
  </a>
  <h1 align="center">
    BIT Clubs
  </h1>
  <h3 align="center">
Everyone is here !   
  </h3>
<h4 align="center">
  App for University's clubs and events
</h4>
</div>


![glow (2)](https://user-images.githubusercontent.com/40158577/148701052-756e0f3c-4892-4634-a108-5e6b92979397.png)


## Domain
**App development**

## Techstack
- **React - Native**
- **React - Navigation**
-  **NodeJS**
-  **Firebase**
    *  Authentication
    * Firestore ( NoSQL db )
    * Cloud Storage ( for storing images )

## Idea 

![Untitled (72 x 20 in) (1)](https://user-images.githubusercontent.com/40158577/148661330-509cb506-2331-4e22-a70a-5eff3739101b.png)


As a fresher and due to online mode , one of the challenges  was knowing about the clubs and events being organised around the institute. Also we rely a lot on whatsapp groups to share event details, which is unorganised can become  spammy, missing important updates.
So to tackle all of this, we have developed BIT Clubs !
  

A platform for students of BIT and it’s club, where one can find everything related to a club and stay updated about new events. 

## Achievements 

- **Effcient Lazy loading / infinite Scroll**
    - First query and load first few documents from database and loads more when user scrolls, thus saving user's data usage & server cost. It's also memory efficient as it loads only the item on focus, ( flatlist )
- **Authentication**
    - User can login / SignUp 
    - forget password
    - Anonymous login
 
- **Dynamic Content**
    - Instead of relying on static content, our app fetches , cache and renders content from database.
    - Markdown renderer for additional content
- **Newsroom**
    - New event updates 
    - Event details
    - 1 click Event join

- **Posts CRUD**
    - Admins can create, update, delete event posts.

- **Organisation pages**
    - list of all clubs
    - club details 
    - **MarkDown** for  additional content 
- **User Profiles**
    - Admin profile for admins
    - Student profile for rest users    
- **Platform Specific code **
    - different stylesheet for android, ios, web

## Demo 

#### Android 

App Tour 

https://user-images.githubusercontent.com/40158577/148701264-9d07f43e-f322-4303-8b6c-7268d2037066.mp4

#### iOS 

Admin Tour 

https://user-images.githubusercontent.com/40158577/148701383-0e47e6b4-c024-46c2-bb4d-16165eae5658.mp4

#### Web 

Web Tour 



https://user-images.githubusercontent.com/40158577/148701506-0cc4f2f1-8cea-407d-82d3-06d2fb73ea96.mp4

## How to run

coming soon on playstore & heroku.

first install Expo CLI

```
npm install --global expo-cli
```
Then install node modules

```
npm install
```

then run app 

```
expo start 
```

press 'w' for web , 'a' for android while running Android studio AVD manager,

# Improvement 

one of the limitation of react native is it's JSON stylesheets , UI could have been better.







