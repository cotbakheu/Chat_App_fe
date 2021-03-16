# OnTalk FRONTEND
OnTalk is web aplication for chatting. It can send message to friend and configure user profile.
This app use socket.io as chat integration, Vue Js as frontend development, Express Js as backend development and MySQl as database. 



## Documentation

### Desktop Version
![login](https://i.ibb.co/YDpmGnC/g-login.jpg)
![home](https://i.ibb.co/Jm0gWZJ/g-home.jpg)
![target](https://i.ibb.co/0XPQVHV/g-target.jpg)
![profile](https://i.ibb.co/413P9HZ/g-profile.jpg)


### Mobile Version
![m-home](https://i.ibb.co/hKN1sVy/g-m-home.jpg)
![m-chat](https://i.ibb.co/3rPY526/g-m-chat.jpg)
![m-profile](https://i.ibb.co/pzcxVj6/g-m-profile.jpg)

## Getting Started


### Dependencies

We use all this main following dependencies:

1. Vue
2. Vuex
3. Sweetalert2
4. Axios
5. Bootstrap
6. Bootstrap Vue
7. socket.io-client

### Installing

Here is few step to run the OnTalk frontend web aplication:

1. Open your terminal and head to your project directory
2. Clone this repository
```
git clone https://github.com/cotbakheu/OnTalk_Frontend
``` 
3. Set up your .env file
  * VUE_APP_SERVER_API : fill with your API URL server or you can use this default backend aplication attach below this page.
  * VUE_APP_URL : fill with your URL server for static image and socket url

4. Use this command to install all dependencies
```
npm install
```
5. Compiles and hot-reloads for development
```
npm run serve
```
6. Compiles and minifies for production
```
npm run build
```
7. Lint and fix files
```
npm run lint
```

## Deployment
 * Visit our demo at : [OnTalk](http://54.164.121.31:4234/)

## Backend Repository
[Backend OnTalk Aplication](https://github.com/cotbakheu/OnTalk_Backend)