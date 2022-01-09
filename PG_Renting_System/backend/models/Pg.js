const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PgSchema = new Schema({

    meal : {
        type: String,
        required: true
     },

     gender : {
         type: String,
         required: true
     },

     capacity: {
        type: String,
        required: true         
     },

     furnishing: {
        type: String,
        required: true
     },

     price :{
        type: String,
        required: true
     },

     parking :{
      type: String,
      required: true
   },

     
     landmark :{
         type: String,
         required:true
     },

     address  :{
      type: String,
      required: true
   },

   label :{
      type: String,
      required: true
   },

   security :{
      type: String,
      required: true
   },
     
   photos:{
      type: Array,
      required: true
   },


  },  { timestamps: true});
  

  const Pg = mongoose.model('Pg',PgSchema);

  module.exports = Pg;