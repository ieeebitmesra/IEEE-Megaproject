# Backend for the VSCode extension for vsbuddies

# Features
### User data is authorised through jwts
### Github auth using Passport-Github2
### And a middleware is setup with callback to the extension polka server

# How to run on your machine
## Website
See the instructions on [This Link](https://github.com/Lohit244/vsbuddies-website)
## Node Backend 
1. Clone this repo and navigate to it in your terminal
2. Install the dependencies with

```bash
npm i 
```
3. Create a .env file at the root folder and add add your firebase keys using .env.example for the key names
4. The last variable in .env is SECRET which is a long string used for jwt so make sure it is not easily guessable
5. Optional install nodemon 
```bash
npm i -g nodemon
```
6. Start the server with node / nodemon
```bash
# with node
node index.js
# with nodemon
nodemon index.js
```
## Extension:
See the instuction on [This page](https://github.com/Lohit244/vsbuddiesExtension)