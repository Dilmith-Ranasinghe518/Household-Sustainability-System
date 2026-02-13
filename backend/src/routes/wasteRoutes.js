const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { admin } = require('../middleware/authMiddleware');
const wasteController = require('../controllers/wasteController');

// @route   POST api/waste
// @desc    Create a waste pickup request
// @access  Private (User)
router.post('/', auth, wasteController.createRequest);

// @route   GET api/waste
// @desc    Get all requests for logged in user
// @access  Private (User)
router.get('/', auth, wasteController.getUserRequests);

// @route   GET api/waste/all
// @desc    Get all requests (Admin only)
// @access  Private (Admin)
router.get('/all', auth, admin, wasteController.getAllRequests);

// @route   PUT api/waste/:id
// @desc    Update request status (Admin only)
// @access  Private (Admin)
router.put('/:id', auth, admin, wasteController.updateStatus);

module.exports = router;
