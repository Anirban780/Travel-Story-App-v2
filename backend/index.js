const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const storyRoutes = require("./routes/storyRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://travel-story-app-v2-1xil.vercel.app',
  'https://travel-story-app-v2.vercel.app'
];

// Configure CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


app.use(express.json());

app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is running"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
