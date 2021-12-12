const express = require('express');
const { makePayment } = require('../controllers/stripePayment');
const router = express.Router();

router.post('/stripepayment', makePayment);

module.exports = router;
