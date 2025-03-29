"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// Middleware: permissions

module.exports={
    isLogin:(req,res,next)=>{
        if (req.user && req.user.isActive){
            next()
        }else{
            res.statusCode=403
            throw new Error("No Permission: You must login")
        }
    },
    isStaffOrAdmin:(req,res,next)=>{
        if ( req.user && ( req.user.isStaff || req.user.isAdmin)){
            next()

        }else{
            res.statusCode=403
            throw new Error("No Permission: You must be staff or admin")
        }
    },
    isAdmin:(req,res,next)=>{

        if ( req.user && req.user.isAdmin){
            next()

        }else{
            res.statusCode=403
            throw new Error("No Permission: You must be an admin")
        }
    }


}