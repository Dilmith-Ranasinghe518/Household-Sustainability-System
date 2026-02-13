const WasteRequest = require('../models/WasteRequest');

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

        request.status = req.body.status;
        await request.save();

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
