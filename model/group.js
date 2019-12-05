const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const groupSchema = new Schema({
    
   users: [String],
   url:  { type : String , unique : true, required : true },
   gName: String,
   isPrivate: Boolean,
   pendingTransactions: [{
       userId: String, 
       amount:Number, 
       approvals:Number, 
       debtors:[{userId:String}]
    }],
   approvedTransactions: [{
       userId:String, 
       amount:Number, 
       debtors:[{userId:String}]
    }]
});
//Debt == sum(aprovedtrans where my id is present in debtors)
//Owed == sum(approvedTrans where my Uid==aprovedTransId)


module.exports = mongoose.model('Group', groupSchema);