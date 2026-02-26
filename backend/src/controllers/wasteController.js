const WasteBin = require('../models/WasteBin');
const WasteRequest = require('../models/WasteRequest');
const User = require('../models/User');
const ScoringConfig = require('../models/ScoringConfig');

// Waste Requests
exports.createRequest = async (req, res) => {
    try {
        const { binLevel } = req.body;

        const newRequest = new WasteRequest({
            user: req.user.id,
            binLevel
        });

        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserRequests = async (req, res) => {
    try {
        const requests = await WasteRequest.find({ user: req.user.id }).sort({ date: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await WasteRequest.find().populate('user', ['username', 'email']).sort({ date: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateStatus = async (req, res) => {
    try {
        let request = await WasteRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ msg: 'Request not found' });
        }

        const oldStatus = request.status;
        request.status = req.body.status;
        await request.save();

        // Award points if completed
        if (req.body.status === 'completed' && oldStatus !== 'completed') {
            const config = await ScoringConfig.findOne() || new ScoringConfig();
            const user = await User.findById(request.user);

            if (user) {
                user.wasteScore = (user.wasteScore || 0) + config.wastePickupPoints;
                // Add to total sustainability score (capped at 100)
                user.sustainabilityScore = Math.min(100, (user.sustainabilityScore || 0) + (config.wastePickupPoints / 10));
                await user.save();
            }
        }

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Waste Bins
exports.createBin = async (req, res) => {
    try {
        const { name, user, latitude, longitude } = req.body;

        const newBin = new WasteBin({
            name,
            user,
            latitude,
            longitude
        });

        const bin = await newBin.save();
        res.json(bin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getBins = async (req, res) => {
    try {
        const bins = await WasteBin.find().populate('user', ['username', 'email']);

        // For each bin, check if there's a pending request for that user
        const binsWithStatus = await Promise.all(bins.map(async (bin) => {
            const pendingRequest = await WasteRequest.findOne({
                user: bin.user._id,
                status: 'pending'
            });
            return {
                ...bin._doc,
                hasPendingRequest: !!pendingRequest
            };
        }));

        res.json(binsWithStatus);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserBin = async (req, res) => {
    try {
        const bin = await WasteBin.findOne({ user: req.user.id });
        if (!bin) return res.json(null);

        const pendingRequest = await WasteRequest.findOne({
            user: req.user.id,
            status: 'pending'
        });

        res.json({
            ...bin._doc,
            hasPendingRequest: !!pendingRequest
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteBin = async (req, res) => {
    try {
        const bin = await WasteBin.findById(req.params.id);

        if (!bin) {
            return res.status(404).json({ msg: 'Bin not found' });
        }

        await WasteBin.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Bin removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateBinStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let bin = await WasteBin.findById(req.params.id);

        if (!bin) {
            return res.status(404).json({ msg: 'Bin not found' });
        }

        bin.status = status;
        await bin.save();
        res.json(bin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
