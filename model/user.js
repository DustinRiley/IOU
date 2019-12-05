const sHash = require('../services/salt-hash');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
   groups: [String],
   uName: { type : String , unique : true, required : true },
   hash: String,
   salt: String,
   globalDebt: Number,
   pendingGroups: [String]
});




module.exports = mongoose.model('User', userSchema);