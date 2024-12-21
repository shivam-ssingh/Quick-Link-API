const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/metadata", async (req, res) => {
  try {
    const { url } = req.query;
    const apiKey = process.env.METADATA_KEY;
    const baseURL = "https://api.linkpreview.net/";
    const response = await axios.get(`${baseURL}?key=${apiKey}&q=${url}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching metadata" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
