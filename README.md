### Usage and Setup
- Clone this repo. Go into the root folder and run *yarn* to install the dependencies.
- Create a .env file in the root folder and set these variables: 
  ```
  REACT_APP_CLIENT_ID=0f0beecf7fd73353297c
  REACT_APP_CLIENT_SECRET=baa991a2935f04bbe80f4f59687457ee1be1d2cb
  REACT_APP_REDIRECT_URI=http://localhost:3000
  REACT_APP_PROXY_URL=http://localhost:5000/authenticate
  REACT_APP_SCAN_URL=http://localhost:5000/scan
  REACT_APP_BLOCKCHAIN_URL=http://localhost:5000/blockchain
  SERVER_PORT=5000
  MONGO_ATLAS_URI=mongodb+srv://root:root@cluster0.dbfx0.mongodb.net/test
  ```
- Run *yarn start* to start the app
