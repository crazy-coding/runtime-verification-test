const express = require("express");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fetch = require("node-fetch");
const { client_id, redirect_uri, client_secret } = require("./config");
const dbo = require("./conn");
const Web3 = require('web3');

dbo.connectToServer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  console.log(code)
  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.post("/scan", (req, res) => {
  const { username, wallet } = req.body;

  const dbConnect = dbo.getDb();
  const matchDocument = {
    username,
    wallet
  };

  dbConnect
    .collection("rv")
    .find(matchDocument).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      }
      if (result.length === 0) {
        dbConnect
          .collection("rv")
          .insertOne(matchDocument, function (err, result) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              console.log(`Added a new match with id ${result.insertedId}`);
              dbConnect
                .collection("listingsAndReviews")
                .find(matchDocument).limit(50)
                .toArray(function (err, result) {
                  if (err) {
                    res.status(400).send("Error fetching listings!");
                } else {
                    res.json(result);
                  }
                });
            }
          });
        } else {
          res.json(result);
        }
      });

  
})

app.post("/blockchain", (req, res) => {
  const { username, wallet } = req.body;

  var web3 = new Web3();

  var signature = web3.eth.getAccounts().then(res => console.log(res))
  // console.log(signature)

  
})

app.get("/", (req, res) => {
  
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));