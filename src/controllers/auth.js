"use strict"
const passwordEncrypt = require("../helpers/passwordEncrypt")
const jwt=require("jsonwebtoken")

/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// Auth Controller:

const User=require("../models/user")

module.exports={
    login:async(req,res)=>{
          /*
                #swagger.tags = ["Authentication"]
                #swagger.summary = "Login"
                #swagger.description = 'Login with userName (or email) and password for get simpleToken and JWT'
                #swagger.parameters["body"] = {
                    in: "body",
                    required: true,
                    schema: {
                        "userName": "test",
                        "password": "aA?123456",
                    }
                }
            */

        const {username,email,password}=req.body

        if (!(username || email) && password ){
            res.errorStatusCode=401
            throw new Error("username/email and password are required")
        }

        const user=await User.findOne({$or: [{username},{email}]})

        if (user?.password !== passwordEncrypt(password)){
            res.errorStatusCode=401
            throw new Error("incorrect username/email or password")
        }
        
        if (!user.isActive){
            res.errorStatusCode=401
            throw new Error("This account is not active")
        }

        /* -------------------------------------------------------------------------- */
        /*                                     JWT                                    */
        /* -------------------------------------------------------------------------- */
        // Access Token
        const accessData={
            _id:user._id,
            username:user.username,
            email:user.email,
            isActive:user.isActive,
            isAdmin:user.isAdmin
        }
        

        // Convert JWT 
        const accessToken=jwt.sign(accessData,process.env.ACCESS_KEY,{expiresIn:'30m'})

        // REFRESH 

    const refreshData = {
        _id: user._id,
        password: user.password,
      };

      const refreshToken=jwt.sign(refreshData,process.env.REFRESH_KEY,{expiresIn:"2d"})

        res.status(200).send({
            error:false,
            bearer:{
                access:accessToken,
                refresh: refreshToken
            }
        })
    },

    refresh: async (req, res) => {
        const refreshToken = req.body?.bearer?.refresh;
    
        if (refreshToken) {
          const refreshData = await jwt.verify(
            refreshToken,
            process.env.REFRESH_KEY
          );
    
          if (refreshData) {
            const user = await User.findOne({ _id: refreshData._id });
    
            if (user && user.password == refreshData.password) {
              if (user.isActive) {
                res.status(200).send({
                  error: false,
                  bearer: {
                    access: jwt.sign(user.toJSON, process.env.ACCESS_KEY, {
                      expireIn: "30m",
                    }),
                  },
                });
              } else {
                res.errorStatusCode = 401;
                throw new Error("This account is not active");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Wrong Id and password");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error(" JWT refresh data  is  wrong");
          }
        } else {
          res.errorStatusCode = 401;
          throw new Error("Please enter a bearer refresh");
        }
      },

    
    logout:async(req,res)=>{
        res.send({
            error:false,
            message:"JWT : no need any process"
        })
    }
    
}