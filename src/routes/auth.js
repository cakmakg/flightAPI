"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require('express').Router()

const auth=require("../controllers/auth")
/* ------------------------------------------------------- */

router.route("/login").post(auth.login)
router.route("/refresh").get(auth.refresh)
router.route("/logout").get(auth.logout)

/* ------------------------------------------------------- */
module.exports = router