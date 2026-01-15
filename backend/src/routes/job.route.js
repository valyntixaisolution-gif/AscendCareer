const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { asyncHandler } = require('../middlewares/async-handler.middleware');

// GET /jobs - List all jobs (All authenticated users)
router.get('/', authenticate, asyncHandler(jobController.listJobs));

module.exports = router;
