const express = require('express');
const server = express();
const mongoose = require('mongoose');
const mustache = require('mustache-express');
const RegUser = require('./modules/registrationSchema');
const Snipps = require('./modules/snippitsSchema');
const session = require('express-session');
const bodyparse = require('body-parser');
mongoose.connect('mongodb://localhost:27017/test');

server.use(bodyparse.urlencoded({
  extended: false
}));
server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');

server.use(express.static('public'));

server.use(session({
  secret: 'silhouetto of a man',
  resave: false,
  saveUninitialized: true,
}));

//
// Above is working
//

server.post('/login', function(req, res) {
  RegUser.findOne({
      username: req.body.username
    })
    .then(function(user) {
      if (user.password === req.body.password) {
        req.session.who = user.username;
        res.redirect('snippyDisplay');
        return;
      } else {
        res.render('index', {
          message: "Username or Password don't match"
        });
      };
    })
    .catch(function() {
      res.render('index', {
        message: "Username or Password don't match"
      });
    });
});

server.post('/regNewAcct', function(req, res) {
  RegUser.create({
    username: req.body.username,
    password: req.body.password,
    passwordHint: req.body.passwordHint,
    eMail: req.body.eMail
  });
  res.render('index', {
    message: "Please log in with your new account"
  });
});

server.get('/snippyDisplay', function(req, res) { // TODO fix this once using mongo for snippys
  if (req.session.who !== undefined) {
    Snipps.find()
      .then(function(snipps) {
        res.render('snippyDisplay', {
          snippySnips: snipps
        })
      });
  } else {
    res.render('index',{
      message: "Please Login."
    });
  }
});

server.post('/search', function(req,res){
 let title = req.body.title;
 let username = req.body.username;
 let language = req.body.language;
 let tags = req.body.tags;

  Snipps.find()
    .where('title')
})
//
// Below is tested and working
//

server.get('/SnippySearch', function(req,res){
  if (req.session.who !== undefined) {
    res.render('SnippySearch')
      return;
  } else {
    res.render('index',{
    message: "Please Login."
  });
  }
});

server.get('/', function(req, res) {
  res.render('index');
});

server.post('/regAccount', function(req, res) {
  res.render('registration');
});

server.get('/createASnippy', function(req, res) {
  if (req.session.who !== undefined) {
        res.render('createASnippy')
        return;
  } else {
    res.render('index',{
      message: "Please Login."
    });
  }
});

server.post('/addSnippy', function(req, res) {
  Snipps.create({
    title: req.body.title,
    body: req.body.codeBody,
    notes: req.body.notes,
    language: req.body.language,
    tags: req.body.tags,
    createdBy: req.session.who
  })
  .then((function(snipps) {
    res.render('snippyDisplay', {
      snippySnips: snipps
    })
  }));
});

server.post('/logout', function(req, res) {
  req.session.destroy(function() {
    res.render('index', {
      message: "Have a nice day"
    });
  });
});

server.listen(3000, function() {
  console.log('Running with Snippy snipps');
});

//TODO: make me happy
// a little CSS work
// split functions up and move things down to working section.

// TODO: Normal mode
// have a comprehensive set of tests for all controllers and models
// allow you to see a list of all your snippets
// allow you to see a list of all your snippets for a specific language
// allow you to see a list of all your snippets for a specific tag
// allow you to look at an individual snippet

// TODO HARDMODE
// Optimally, your snippet organizer should let people not only look at their
// own snippets, but also look at others' snippets. If you get to this part,
// your application should:

// have an API to allow for creating and viewing of snippets as listed above
// allow you to view just your own snippets or others
// allow you to view all snippets for another person
// allow you to view all snippets site-wide for a specific language
// allow you to view all snippets site-wide for a specific tag
// allow you to "star" or favorite other people's snippets
// allow you to sort snippets by date created or updated, and by number of stars
