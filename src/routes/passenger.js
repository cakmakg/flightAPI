"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const passenger=require("../controllers/passenger")

router.route("/").get(passenger.list).post(passenger.create)

router.route("/:id")
.get(passenger.read)
.put(passenger.update)
.patch(passenger.update)
.delete(passenger.delete)

/* ------------------------------------------------------- */
module.exports = router