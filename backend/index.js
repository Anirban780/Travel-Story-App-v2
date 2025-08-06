const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const storyRoutes = require("./routes/storyRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
