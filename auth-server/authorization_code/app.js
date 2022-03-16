/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
const fetch = require ('node-fetch');

var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const { response } = require('express');

var client_id = '47404a7d925b47c9b4fe4b5c5797da55'; // Your client id
var client_secret = '2116c152f48f408d8a6afb686de04e5a'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Or Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
  .use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  var to_base64 = client_id + ':' + client_secret;
  var base_64_text = Buffer.from(to_base64).toString('base64');
  
  let spotify_body = {
    grant_type : "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
  }
  let form_body = [];

  for (var item in spotify_body) {
    var encodedKey = encodeURIComponent(item);
    var encodedValue = encodeURIComponent(spotify_body[item]);
    form_body.push(encodedKey + "=" + encodedValue);
  }

  form_body = form_body.join("&");

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:form_body,
      
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base_64_text}`
      }
    })
    .then( results => {
      
      
      if(results.status == 200){
        return results.text();
      }else{

        res.redirect('http://localhost:3000/?' +
          querystring.stringify({
            error: results.statusText,
            status: results.status
          })
        );

      }
      
    })
    .then( response => {
      
      let data = JSON.parse(response)
      res.redirect('http://localhost:3000/?' +
        querystring.stringify(data)
      );
      
    })

});

app.get('/refresh_token', function(req, res) {

  var to_base64 = client_id + ':' + client_secret;
  var base_64_text = Buffer.from(to_base64).toString('base64');
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  console.log(refresh_token)
  let spotify_body = {
    grant_type : "refresh_token",
    refresh_token: refresh_token,
    client_id: client_id
  }
  let form_body = [];

  for (var item in spotify_body) {
    var encodedKey = encodeURIComponent(item);
    var encodedValue = encodeURIComponent(spotify_body[item]);
    form_body.push(encodedKey + "=" + encodedValue);
  }

  form_body = form_body.join("&");
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:form_body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base_64_text}`
      }
    })
    .then( results => {
            
      if(results.status == 200){
       return results.text();
      }

    })
    .then( response => {
      let data = JSON.parse(response)      
      res.send(data)

    })

  
});

console.log('Listening on 8888');
app.listen(8888);
