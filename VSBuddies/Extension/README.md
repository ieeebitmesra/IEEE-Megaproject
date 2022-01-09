# VSBuddies
This is an extension to chat with your friends from the vsBuddies website right inside VSCode.
[Link to website](https://vsbuddies.netlify.app)

[Link to extension page](https://marketplace.visualstudio.com/items?itemName=Lohitaksha.vsbuddies)
## Contributors:
[Lohitaksha Malhotra](https://github.com/lohit244)

[Ishan Pandey](https://github.com/ishanpandey703)

[Ankur Pandey](https://github.com/ankurpandey07)

## Note: Your extension list will be automatically updated every time you login

# Features
1. Login with github(using passport-github2 as middleware)
2. See your friends added from the VSBuddies Website
3. Chat with your friends

# Common Questions
## Is my data safe?
 Yes, your data is stored on firebase and the custom backend for this extension never stores your used id and all actions are authorised usign a jwt(it is however stored in the firebase database)

## Why is my extension list required?
 We see extension list as a good way to know what languages, tech stacks etc you're familiar with and that helps us better calculate your match percentage with other people.

## How do i login manually?

 Press f1 / ctrl (or cmd)+shift+p -> VSBuddies: Login with github

 This will Open up another popup to login with another id.

# Starting the extension on Your machine
## Website
See the instructions on [This Link](https://github.com/Lohit244/vsbuddies-website)
## Node Backend 
See the instructions [here](https://github.com/Lohit244/vsbuddiesextapi)
## Extension:
1. Clone this repo and navigate to the folder in your terminal
2. Run the command to install the dependencies

```bash
npm i
```
3. Go to src/constants.ts and change the apibaseurl to the url of your node backend
4. in src/SidebarProvider.ts line 61 change the url to the url of your website
5. Make sure you have concurrently installed if not, install using

```bash
npm i -g concurrently
```
6. Now start the extension using vscode's run and debug menu (default keybind is F5)