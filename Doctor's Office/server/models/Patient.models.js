const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  CIN: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  appointments:[ {
  date:{
      type:Date,
      
  },
   comment:{
      type:String,
     
  }

  }]
});

module.exports = mongoose.model('Patient', PatientSchema);