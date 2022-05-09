const express = require('express')
const path = require('path')
const session = require('express-session')
const { randomUUID } = require('crypto');

const app = express()


app.set("view engine", "ejs")
app.use(session(  {
    genid: function(req) {
        return randomUUID() // use UUIDs for session IDs
    },
    secret: 'NALSKDndas0fjh123WSADc',
    saveUninitialized:false,
    resave:true}))


app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: true}))

var authentication_router= require('./routes/authenticationRouter')
var players_router= require('./routes/playersRouter')

app.use('/auth', authentication_router)
app.use('/players', players_router)

app.get('/', (req, res)=>{
    if(!req.session.isuser_valid){
        req.session.isuser_valid = false
    }
    res.render('pages/index',  {username: req.session.username})
})

app.use(function(req, res){
    res.status(404);
});


app.listen(3000, ()=>{
    console.log('Server is listening at http://localhost:3000');
})

const { auth } = require('express-openid-connect');
app.use(
  auth({
    issuerBaseURL: 'https://dev-s9reqn02.us.auth0.com',
    baseURL: 'http://localhost:3000',
    clientID: 'NufO6yE4surZHmSzlt6qpOIvZ3X7Tsde',
    secret: 'abcdefghijklmnopqrstuvwxyzabcdef',
    idpLogout: true,
  })
);