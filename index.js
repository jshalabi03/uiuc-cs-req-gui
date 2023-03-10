const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3080;

const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/data/:file", (req, res) => {
  const { file } = req.params;
  const filePath = path.join(__dirname, "data", file);
  res.sendFile(filePath);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
