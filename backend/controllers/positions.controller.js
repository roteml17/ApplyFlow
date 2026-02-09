const positionsService = require("../services/positions.service");

function createPosition(req, res) {
    try {
        const created = positionsService.createPosition(req.body);
        return res.status(201).json(created);
    } catch (err) {
        const status = err.statusCode || 500;
        return res.status(status).json({ error: err.message || "Server error" });
    }
}

function getPositions(_req, res) {
    const positions = positionsService.listPositions();
    return res.json(positions);
}

module.exports = {
    createPosition,
    getPositions,
};
