const Disaster = require("../models/Disaster");

// CREATE: POST /api/disasters
exports.createDisaster = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      locationName,
      latitude,
      longitude,
      severity,
      status,
    } = req.body;

    if (!title || !type || !locationName || latitude == null || longitude == null) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const disaster = await Disaster.create({
      title,
      type,
      description,
      locationName,
      latitude,
      longitude,
      severity,
      status,
      reportedBy: req.user?.id,
      source: "manual",
    });

    return res.status(201).json(disaster);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// READ ALL: GET /api/disasters?type=Flood&status=active
exports.getDisasters = async (req, res) => {
  try {
    const { type, status, severity, search } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (severity) filter.severity = severity;
    if (search) filter.title = { $regex: search, $options: "i" };

    const disasters = await Disaster.find(filter)
      .sort({ createdAt: -1 })
      .populate("reportedBy", "username email role");

    return res.json(disasters);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// READ ONE: GET /api/disasters/:id
exports.getDisasterById = async (req, res) => {
  try {
    const disaster = await Disaster.findById(req.params.id).populate(
      "reportedBy",
      "username email role"
    );

    if (!disaster) return res.status(404).json({ msg: "Disaster not found" });

    return res.json(disaster);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// UPDATE: PUT /api/disasters/:id
exports.updateDisaster = async (req, res) => {
  try {
    const updated = await Disaster.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ msg: "Disaster not found" });

    return res.json(updated);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// DELETE: DELETE /api/disasters/:id
exports.deleteDisaster = async (req, res) => {
  try {
    const deleted = await Disaster.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Disaster not found" });

    return res.json({ msg: "Disaster deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
