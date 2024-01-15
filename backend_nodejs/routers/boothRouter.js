const express = require('express');
const router = express.Router();
const Booth = require('../models/boothSchema');

router.get('/', async (req, res) => {
  // ... your get route logic
});

router.post('/', async (req, res) => {
  // ... your post route logic
});

module.exports = router;
