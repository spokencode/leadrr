const express = require('express');
const app = express();

const public = app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

// Mongoose internally uses a promise-like object,
// but it's better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');

const {leadModel} = require('./models/leads');
const uuid = require('uuid');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/leads', (req, res) => {
  res.sendFile(__dirname + '/public/leads.html');
  
});

app.get('/leads/add', (req, res) => {
  res.sendFile(__dirname + '/public/leads-add.html');
});

app.post('/api/leads', jsonParser, (req, res) => {
  //IF it has API in the URL respond with JSON
  //res.json(leadList.create(req.body.name, req.body.email, req.body['phone-number'], req.body['service-address'], req.body['service-city'], req.body['service-state'], req.body['service-zip-code'], req.body['job-name']));


const requiredFields = ['name', 'email', 'phone-number', 'service-address', 'service-city', 'service-state', 'service-zip-code', 'jobs'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }


  leadModel
    .create({
        "name": req.body.name,
        "email": req.body.email,
        "phone-number": req.body['phone-number'],
        "service-address": req.body['service-address'],
        "service-city": req.body['service-city'],
        "service-state": req.body['service-state'],
        "service-zip-code": req.body['service-zip-code'],
        jobs: [{
            "job-name": req.body.jobs[0]['job-name'],
            "job-number": uuid.v4()
            }]
        })
    .then(
      lead => res.status(201).json(lead.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });


});

app.get('/api/leads/', (req, res) => {
  //IF it has API in the URL respond with JSON
  //res.json(leadList.get());

  leadModel
    .find()
    .limit(10)
    .exec()
    .then(leads => {
      res.json(leads.map(
          (leads) => leads.apiRepr())
      );
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });



});

app.get('*', function(req,res){
  res.status(400).send('Page NOT Found');
});






let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};