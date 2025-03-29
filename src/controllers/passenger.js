"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Passenger API
------------------------------------------------------- */
// Passenger Controller:

const Passenger = require("../models/passenger");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags=["Passengers"]
        #swagger.summary="List Passengers"
        #swagger.description=`
         You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>`      
        
        */

    const result = await res.getModelList(Passenger);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Passenger),
      result,
    });
  },
  create: async (req, res) => {
    /* 
        #swagger.tags=["Passengers"]
        #swagger.summary="Create Passengers"
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
            

            }
        
        }
        
        */

    const result = await Passenger.create(req.body);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Passenger),
      result,
    });
  },

  read: async (req, res) => {
    /*
     #swagger.tags=["Users"]
     #swagger.summary="Read Passenger"
    */

    const result = await Passenger.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags=["Passengers"]
        #swagger.summary="Update Passengers"
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
              
            }
        
        }
        
        */
    const result = await Passenger.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      result,
    });
  },

  delete: async (req, res) => {
    const result = await Passenger.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: !result.deletedCount,
      message: "Data is not found or already deleted",
    });
  },
};
