const express = require('express')
const { createReview } = require('../Controller/reviewController')

const {verifyUser} = require('../utils/verifyToken')

const router = express.Router()

router.post('/:tourId', verifyUser,createReview)



module.exports = router