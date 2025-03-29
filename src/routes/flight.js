"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const flight=require("../controllers/flight")
const permissions=require("../middlewares/permissions")
// const {isStaffOrAdmin,isAdmin}=require("../middlewares/permissions")


router.use(permissions.isStaffOrAdmin,permissions.isAdmin)
router.route("/").get(flight.list).post(flight.create)

router.route("/:id")
.get(flight.read)
.put(flight.update)
.patch(flight.update)
.delete(permissions.isAdmin,flight.delete)

/* ------------------------------------------------------- */
module.exports = router