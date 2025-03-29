"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const PassengerSchema=new mongoose.Schema({
    
    firstName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        enum:[null,"M","F"],
        default:null
    },
    email:{
        type:String,
        trim:true,
        unique:[true,"This email has been taken already"],
        required:[true,"Email field must be filled"],
        validate:[(email)=>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),"Please fill a valid email"]
    },
  
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{collection:"passengers",timestamps:true})

module.exports=mongoose.model("Passenger",PassengerSchema)