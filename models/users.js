const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String},
	password: {type: String}
});

userSchema.methods.apiRepr = function(){
	return {
		username: this.username,
		password: this.password
	};
}

const userModel = mongoose.model('users', userSchema);

module.exports = {userModel};