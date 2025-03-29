"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// $ npm i morgan
// app.use(logger):

const morgan = require('morgan')
const fs = require('node:fs')

const now = new Date()
//  toISOString() → "YYYY-MM-DD T HH:mm:ss.sssZ" Split from T letter. Seperate from day and time
const today = now.toISOString().split('T')[0]

// flag a+  ( if there is a log file, it updates, if not,it creates)

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
})