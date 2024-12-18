const express = require('express')


const {verifyUser} = require('../utils/verifyToken')
const { createBooking, getBooking, getALLBooking } = require('../Controller/bookingController')

const router = express.Router()

router.post('/', verifyUser,createBooking)

router.get('/:id', getBooking)

router.get('/', getALLBooking)



module.exports = router