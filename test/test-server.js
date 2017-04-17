const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);


const {leads} = require('../models/leads');

function generateLead() {
  return {
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "phone-number": faker.phone.phoneNumber(),
      "service-address": faker.address.streetAddress(),
      "service-city": faker.address.city(),
      "service-state": faker.address.state(),
      "service-zip-code": faker.address.zipCode(),
      "jobs":[{"job-name":faker.address.zipCode()}]
  }
}

describe('leadrr', function() {

 before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  
  it('should return 200 status', function() {
   
    return chai.request(app)
      .get('/')
      .then(function(res) {
        res.should.have.status(200);
      });
  });

  it('should list leads on GET', function() {
    return chai.request(app)
      .get('/api/leads')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body);
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.have.all.keys(
            'name', 'email', 'phone-number', 'service-address', 'service-city', 'service-state', 'service-zip-code', 'jobs');
        });
      });
  });



   
  it('should add a new lead on POST', function() {

    const newLead = generateLead();

    return chai.request(app)
      .post('/api/leads')
      .send(newLead)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys(
          'name', 'email', 'phone-number', 'service-address', 'service-city', 'service-state', 'service-zip-code', 'jobs' );
        //res.body.should.deep.equal(newLead);
      })
  });


});