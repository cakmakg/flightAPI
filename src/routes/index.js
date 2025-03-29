"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// auth route
router.use("/auth",require("./auth"))
// user route
router.use("/users",require("./user"))
//Flight Route
router.use("/flights",require("./flight"))
// Passenger
router.use("passengers", require("./passenger"))

// document route
router.use("/documents",require("./document"))

/* ------------------------------------------------------- */
module.exports = router