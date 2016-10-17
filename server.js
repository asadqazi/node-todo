// require modules =====================================================
var express = require('express');
var mongoose = require('mongoose'); //DB
var morgan = require('morgan'); // Logs
var bodyParser = require('body-parser'); // JSON COnversion
var methodOverride = require('method-override'); // Http methods override

var Schema = mongoose.Schema;
var port = process.env.PORT || 2000;
var app = express();

mongoose.connect('mongodb://asad:asad@ds037195.mlab.com:37195/node-tododb');
mongoose.connection.once('connected', function() {
  console.log('database connected successfuly');
});

// Database Concnection
var TodoSchema = new Schema({
  text:String
});
var Todo = mongoose.model('Todo', TodoSchema);
// configuration
app.use(express.static(__dirname + '/public'));
// set the static files location /public/img will be /img for users
app.use(morgan('dev'));
// log every http request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
 // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());
 // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 // parse application/vnd.api+json as json
 app.use(methodOverride());
 //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

// api calls ===================================================== // insert an entry
app.post('/api/todos', function(req, res) {
  console.log(req.body.text);
  Todo.create({
     text: req.body.text
   },
    function(err, todo) {
       if (err) {
      res.send(err);
    } Todo.find(function(err,todos){
      if(err){ res.send(err);
      } res.json(todos);
    });
  })
});


// get

// get all entries
 app.get('/api/todos', function(req, res) { Todo.find(function(err, todos) { if (err) { res.send(err); } res.json(todos); }); });
// delete method
 app.delete('/api/todos/:todo_id', function(req, res) { Todo.remove({ _id: req.params.todo_id }, function(err, todo) { if (err) { res.send(err); } Todo.find(function(err, todos) { if (err) { res.send(err); } res.json(todos); }); }); });

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});
// start server =====================================================
app.listen(port);
console.log('Server is live, port : ' + port);
