# [VSBuddies](https://vsbuddies.netlify.app)
> A simple way to meet new friends and chat with your friends.
[Link To Extension](https://marketplace.visualstudio.com/items?itemName=Lohitaksha.vsbuddies)
# About the project
This project was created for IEEE Megaproject and each fo the parts is available in their own git repositories.

The problem this project tries to solve is that we have no real platform to connect developers with each other and if i am learning a technology i want to be able to know if any of my college friends are interested/experienced in it, and get recommendations for what i should learn going forward from people with similar interests.

So we created this platform to connect college students weather they are from the same college or not (and of course we want that people from your college get priority). This platform allow developers to login through github, add their interests and get a list of developers based on how similar they are, and if you find someone with a particular set of interests, you can send a friend request and if they accept, you can start chatting with them.

### Domain: Web Development

### Particulars about the project
1. We have used firebase as our backend so we are not storing data on our own database and it is more secure.
1. The website is built using React and MUI, and the extension uses svelte and typescript for it webviews
1. We are using dice similarity to calculate the match percentage of any two users
1. The extension Backend is setup with express and the middleware used for auth is through passport-github2 npm package

# Features
### Supports Dark and Light mode
![LightDark](https://user-images.githubusercontent.com/44966242/148548114-719434bb-13ae-44d2-979c-ee1d9409db96.png)
### Login with github
### Customize you profile and your interestss
![Screenshot-20220108212619-1919x977](https://user-images.githubusercontent.com/44966242/148650937-62310bfd-d19c-4c13-8a9a-0070ced5a21b.png)
### Find other developers with common interests
![Connect](https://user-images.githubusercontent.com/44966242/148548167-0a8ce685-4fac-4222-816e-577e5b2781fc.png)
### Send them friend requests and recieve friend requests from other developers
### Remove friends you dont want
### See your common intersts on anyone's profile you visit
### Get match percentage on the basis of 
+ Common Interests
+ College
+ Your top two languages
+ Your extensions*
+ Your Preference in dark and light themes
## Login to the VSCode extension to be able to chat with your friends while coding
![Extension](https://user-images.githubusercontent.com/44966242/148548190-284fa183-4589-4952-b433-dba112a40f3f.png)

[Link To Extension](https://marketplace.visualstudio.com/items?itemName=Lohitaksha.vsbuddies)
### Your extension list gets auto updated so your match percentage remains accurate*

> *Your extensions will only be fetched though the vscode extension

# About the team
This project was created by [Lohitaksha Malhotra](https://github/com/lohit244) , [Ishan Pandey](https://github.com/ishanpandey703) and [Ankur Pandey](https://github.com/ankurpandey07) under the team name 404_name_not_found 

# How to deploy locally
## Website and firebase server
Follow the instructions [here](https://github.com/Lohit244/VSBuddies-Website)
## Node backend
Follow the instructions on [this link](https://github.com/Lohit244/vsbuddiesextapi)
## Extension
Look at the instruction [Here](https://github.com/Lohit244/vsbuddiesExtension)

