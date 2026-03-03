const { randomUUID } = require("crypto");

const ALLOWED_STATUSES = new Set([
    "APPLIED",
    "HR",
    "TECH",
    "FINAL",
    "OFFER",
    "REJECTED",
]);

// temp positions DB
const positions = [];

function createPosition(input) {
    const { companyName, title, status, notes } = input || {};

    // validation
    if (!companyName || typeof companyName !== "string") {
        const err = new Error("companyName is required (string)");
        err.statusCode = 400;
        throw err;
    }
    if (!title || typeof title !== "string") {
        const err = new Error("title is required (string)");
        err.statusCode = 400;
        throw err;
    }

    const normalizedStatus = status ? String(status).toUpperCase() : "APPLIED";
    if (!ALLOWED_STATUSES.has(normalizedStatus)) {
        const err = new Error(
            `status must be one of: ${Array.from(ALLOWED_STATUSES).join(", ")}`
        );
        err.statusCode = 400;
        throw err;
    }

    const newPosition = {
        id: randomUUID(),
        companyName: companyName.trim(),
        title: title.trim(),
        status: normalizedStatus,
        notes: typeof notes === "string" ? notes.trim() : "",
        createdAt: new Date().toISOString(),
    };

    positions.push(newPosition);
    return newPosition;
}

function listPositions() {
    return positions;
}

module.exports = {
    createPosition,
    listPositions,
};
