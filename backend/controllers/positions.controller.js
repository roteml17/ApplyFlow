const positionsService = require("../services/positions.service");
const asyncHandler = require("../utils/asyncHandler");

const createPosition = asyncHandler(async (req, res) => {
    const created = positionsService.createPosition(res.body);
    res.status(201).json(created);
});

const getPositions = asyncHandler( async (req, res) => {
    const positions = positionsService.listPositions();
    res.status(200).json(positions);
});

module.exports = {
    createPosition,
    getPositions,
};
