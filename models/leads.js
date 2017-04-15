const uuid = require('uuid');

const mockLeads = {
    "leads": [
        {
        "name": "John Smith",
        "email": "jason@jasonrenai.com",
        "phone-number": "4044445555",
        "service-address": "123 Howell St NE",
        "service-city": "Atlanta",
        "service-state": "GA",
        "service-zip-code": "30301",
        jobs: [{
          "job-number": "450",
          "job-name": "House - 4+ Bedroom"
          }]
        },
        {
        "name": "Joe Williams",
        "email": "jason@jasonrenai.com",
        "phone-number": "7706429100",
        "service-address": "854 Hammonds Dr NE",
        "service-city": "Atlanta",
        "service-state": "GA",
        "service-zip-code": "30302",
        jobs: [{
          "job-number": "451",
          "job-name": "House - 4+ Bedroom"
          }]
        },
        {
        "name": "Jane Smith",
        "email": "jason@jasonrenai.com",
        "phone-number": "40445556666",
        "service-address": "456 Howell Se NE",
        "service-city": "Atlanta",
        "service-state": "GA",
        "service-zip-code": "30303",
        jobs: [{
          "job-number": "452",
          "job-name": "House - 2+ Bedroom"
          }]
        },
        {
        "name": "Jason Renai",
        "email": "jason@jasonrenai.com",
        "phone-number": "4044494455",
        "service-address": "107 Howell Se NE",
        "service-city": "Atlanta",
        "service-state": "GA",
        "service-zip-code": "30304",
        jobs: [{
          "job-number": "453",
          "job-name": "House - 4+ Bedroom"
          }]
        },
        
    ]
};

const leadList = {
  create: function(name, email, phone, address, city, state, zip, service) {
    console.log('Creating new lead');
    const lead = {
        "name": name,
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
    this.leads[lead.id] = lead;
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

module.exports = {leadList: createLead()}
