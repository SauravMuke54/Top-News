const mongoose = require("mongoose");


const Schema = mongoose.Schema; //creating schema class
//creation of userschema
const newsSchema = new Schema(
  {
   
    title:{
        type:String,
        trim:true
    },
    url:{
        type:String,
        trim:true,unique:true
    },
    post_date:{
        type:String,
        trim:true
    },
    upvote:{
        type:String,
        trim:true
    },
    comments:{
        type:String,
        trim:true
    },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);