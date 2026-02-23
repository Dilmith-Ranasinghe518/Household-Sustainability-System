const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    isRegistrationOtpEnabled: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Settings', SettingsSchema);
