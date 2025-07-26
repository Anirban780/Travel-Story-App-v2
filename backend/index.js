const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const storyRoutes = require("./routes/storyRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", storyRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
