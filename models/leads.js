const uuid = require('uuid');


const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
        "name": {type: String},
        "email": {type: String},
        "phone-number": {type: String},
        "service-address": {type: String},
        "service-city": {type: String},
        "service-state": {type: String},
        "service-zip-code": {type: String},
        jobs: [{
          "job-number": {type: String},
          "job-name": {type: String}
          }]
        });

leadSchema.methods.apiRepr = function() {
  return {
    name: this.name,
    email: this.email,
    "phone-number": this['phone-number'],
    "service-address": this['service-address'],
    "service-city": this['service-city'],
    "service-state": this['service-state'],
    "service-zip-code": this['service-zip-code'],
    jobs: [{
          "job-number": uuid.v4(),
          "job-name": this.service
          }]
        };

  }

const leadModel = mongoose.model('leads', leadSchema);

module.exports = {leadModel};






















/*
const leadList = {
  create: function(name, email, phone, address, city, state, zip, service) {
    console.log('Creating new lead');
    const lead = {
        "name": name,
        "_id": uuid.v4(),
        "email": email,
        "phone-number": phone,
        "service-address": address,
        "service-city": city,
        "service-state": state,
        "service-zip-code": zip,
        jobs: [{
            "job-name": service,
            "job-number": uuid.v4()
            }]
        };
    this.leads[lead._id] = lead;
    //console.log(this.leads, 'Im here')
    return lead;
  },
  get: function() {
    console.log('Retrieving leads');
    return Object.keys(this.leads).map(key => this.leads[key]);
  },
  delete: function(id) {
    console.log(`Deleting lead \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting lead \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createLead(){
	const storage = Object.create(leadList);
	storage.leads = {};
	return storage;
}

module.exports = {leadList: createLead()}*/
