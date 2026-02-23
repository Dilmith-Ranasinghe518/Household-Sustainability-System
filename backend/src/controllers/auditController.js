const SustainabilityAudit = require('../models/SustainabilityAudit');
const User = require('../models/User');

// Helper function to calculate score
const calculateScore = (data) => {
    let environmentalPoints = 0;
    let socialPoints = 0;
    let economicPoints = 0;

    // Environmental (Max 50)
    // Electricity Usage (Max 10)
    if (data.environmental.electricityUsage < 150) environmentalPoints += 10;
    else if (data.environmental.electricityUsage < 300) environmentalPoints += 5;

    // Water Usage (Max 10)
    if (data.environmental.waterUsage < 100) environmentalPoints += 10;
    else if (data.environmental.waterUsage < 200) environmentalPoints += 5;

    // Boolean questions (10 points each)
    if (data.environmental.solarPanels) environmentalPoints += 10;
    if (data.environmental.waterSavingTaps) environmentalPoints += 10;
    if (data.environmental.wasteSeparation) environmentalPoints += 10;

    // Social (Max 30)
    if (data.social.communityParticipation) socialPoints += 10;
    if (data.social.safeNeighborhood) socialPoints += 10;
    if (data.social.publicTransportUsage) socialPoints += 10;

    // Economic (Max 30)
    if (data.economic.energyEfficientAppliances) economicPoints += 10;
    if (data.economic.budgetTracking) economicPoints += 10;
    if (data.economic.sustainableShopping) economicPoints += 10;

    const totalPoints = environmentalPoints + socialPoints + economicPoints;
    const maxPoints = 110; // 50 (Env) + 30 (Soc) + 30 (Eco)

    const environmentalScore = (environmentalPoints / 50) * 100;
    const overallSustainabilityPercentage = (totalPoints / maxPoints) * 100;

    return {
        score: Math.min(totalPoints, 100), // Keep legacy score for backward compatibility if needed, but capped at 100
        environmentalScore: Math.round(environmentalScore * 100) / 100,
        overallSustainabilityPercentage: Math.round(overallSustainabilityPercentage * 100) / 100
    };
};

exports.createAudit = async (req, res) => {
    try {
        const { environmental, social, economic } = req.body;

        const scores = calculateScore({ environmental, social, economic });

        const newAudit = new SustainabilityAudit({
            user: req.user.id,
            environmental,
            social,
            economic,
            score: scores.score,
            environmentalScore: scores.environmentalScore,
            overallSustainabilityPercentage: scores.overallSustainabilityPercentage
        });

        const audit = await newAudit.save();

        // Update User's sustainability score
        await User.findByIdAndUpdate(req.user.id, { sustainabilityScore: scores.overallSustainabilityPercentage });

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

        const scores = calculateScore({ environmental, social, economic });

        audit = await SustainabilityAudit.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    environmental,
                    social,
                    economic,
                    score: scores.score,
                    environmentalScore: scores.environmentalScore,
                    overallSustainabilityPercentage: scores.overallSustainabilityPercentage
                }
            },
            { new: true }
        );

        // Update User's sustainability score
        await User.findByIdAndUpdate(req.user.id, { sustainabilityScore: scores.overallSustainabilityPercentage });

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
