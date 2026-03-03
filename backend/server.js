const express = require("express");
const cors = require("cors");
require("dotenv").config();

const positionsController = require("./controllers/positions.controller");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ ok: true, message: "Backend is running" });
});

// routes
app.get("/api/positions", positionsController.getPositions);
app.post("/api/positions", positionsController.createPosition);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});
