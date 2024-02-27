require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth");
const task =require("./routes/task")
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
console.log(process.env.MONGODB_URI)
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Db connected"))
    .catch((error) => console.log(error));

app.use("/api/v1/auth", auth);
app.use("/api/v1/task", task);

app.get("/api/health", (req, res) => {
    res.json({
        service: "Job Listing Backend API Server",
        status: "true",
        time: new Date(),
    });
});

app.use("/*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found" });
});

app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend server running at http://${HOST}:${PORT}`);
});
