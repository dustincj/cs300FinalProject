const express = require('express')
const app = express()
const port = process.env.PORT || 5766
const session = require("express-session")
const User = require('./models/User')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')

require("dotenv").config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

mongoose.connection.on("error", (err) => {
    console.log("ERROR: " + err.message)
})

mongoose.connection.once("open", () => {
    console.log("MONGODB CONNECTED")
})

app.use(session({
  secret:"Welcome",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2*45*1000
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","html");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res,next){
  res.locals.currentUser = req.user;
  next();
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login")
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/navbar.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post("/register",(req,res)=>{

  User.register(new User({username: req.body.username,}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/login");
  })
  })
})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/"
}),
  function(req, res) {
});



const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

    const io = require('socket.io')(server)
require("./models/Message")
const Message = mongoose.model("Message")

io.use((socket,next) => {
  const user = socket.handshake.auth.user;
  socket.user = user;
  next();
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg)

        const newMessage = new Message({
            message: `${msg.user}: ${msg.msg}`
        })
    newMessage.save()
      })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      })
  })
