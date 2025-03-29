"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const ReservationSchema=new mongoose.Schema({
    flightId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Flight",
        required:true,
        unique:true
    },

    passengers:[
        {
            type:String,
            required:true
        }
    ],
   
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{collection:"reservations",timestamps:true})

module.exports=mongoose.model("Reservation",ReservationSchema)