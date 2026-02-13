const SustainabilityAudit = require('../models/SustainabilityAudit');
const User = require('../models/User');

// Helper function to calculate score
const calculateScore = (data) => {
    let score = 0;

    // Environmental (Max 40)
    // Electricity Usage (Max 10)
    if (data.environmental.electricityUsage < 150) score += 10;
    else if (data.environmental.electricityUsage < 300) score += 5;

    // Boolean questions (10 points each)
    if (data.environmental.solarPanels) score += 10;
    if (data.environmental.waterSavingTaps) score += 10;
    if (data.environmental.wasteSeparation) score += 10;

    // Social (Max 30)
    if (data.social.communityParticipation) score += 10;
    if (data.social.safeNeighborhood) score += 10;
    if (data.social.publicTransportUsage) score += 10;

    // Economic (Max 30)
    if (data.economic.energyEfficientAppliances) score += 10;
    if (data.economic.budgetTracking) score += 10;
    if (data.economic.sustainableShopping) score += 10;

    return Math.min(score, 100); // Ensure max is 100
};

exports.createAudit = async (req, res) => {
    try {
        const { environmental, social, economic } = req.body;

        const score = calculateScore({ environmental, social, economic });

        const newAudit = new SustainabilityAudit({
            user: req.user.id,
            environmental,
            social,
            economic,
            score
        });

        const audit = await newAudit.save();

        // Update User's sustainability score
        await User.findByIdAndUpdate(req.user.id, { sustainabilityScore: score });

        res.json(audit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAudit = async (req, res) => {
    try {
        const audits = await SustainabilityAudit.find({ user: req.user.id }).sort({ date: -1 });

        if (!audits) {
            return res.status(404).json({ msg: 'No audits found for this user' });
        }

        res.json(audits);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllAudits = async (req, res) => {
    try {
        const audits = await SustainabilityAudit.find().populate('user', ['username', 'email']);
        res.json(audits);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateAudit = async (req, res) => {
    try {
        const { environmental, social, economic } = req.body;
        let audit = await SustainabilityAudit.findById(req.params.id);

        if (!audit) {
            return res.status(404).json({ msg: 'Audit not found' });
        }

        // Make sure user owns audit
        if (audit.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const score = calculateScore({ environmental, social, economic });

        audit = await SustainabilityAudit.findByIdAndUpdate(
            req.params.id,
            { $set: { environmental, social, economic, score } },
            { new: true }
        );

        // Update User's sustainability score
        await User.findByIdAndUpdate(req.user.id, { sustainabilityScore: score });

        res.json(audit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteAudit = async (req, res) => {
    try {
        let audit = await SustainabilityAudit.findById(req.params.id);

        if (!audit) {
            return res.status(404).json({ msg: 'Audit not found' });
        }

        // Make sure user owns audit
        if (audit.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await SustainabilityAudit.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Audit removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
