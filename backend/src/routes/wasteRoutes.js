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

// Bin Management
// @route   POST api/waste/bins
// @desc    Create/Assign a waste bin (Admin only)
// @access  Private (Admin)
router.post('/bins', auth, admin, wasteController.createBin);

// @route   GET api/waste/bins
// @desc    Get all waste bins (Admin only)
// @access  Private (Admin)
router.get('/bins', auth, admin, wasteController.getBins);

// @route   GET api/waste/my-bin
// @desc    Get user's assigned waste bin
// @access  Private (User)
router.get('/my-bin', auth, wasteController.getUserBin);

// @route   DELETE api/waste/bins/:id
// @desc    Delete a waste bin (Admin only)
// @access  Private (Admin)
router.delete('/bins/:id', auth, admin, wasteController.deleteBin);

module.exports = router;
