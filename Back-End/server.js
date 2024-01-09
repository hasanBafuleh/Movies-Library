const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const port = 3000;

const app = express();

// Express middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Front-End")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
