const express = require('express');
const router = express.Router();

const {
  getAllShorts,
} = require('../controllers/shortsController');

/**
 * GET ALL SHORTS
 * GET /api/shorts
 */
router.get('/', getAllShorts);

module.exports = router;
