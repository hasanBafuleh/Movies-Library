const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const port = 3000;
const db = new sqlite3.Database("movies.db");

const app = express();

// Express middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Front-End")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/index.html"));
});

app.get("/movies", (req, res) => {
  db.all(`SELECT * FROM movies`, {}, (error, rows) => res.send(rows));
});

app.post("/movies", (req, res) => {
  console.log(req.body);
  db.run(
    `

    INSERT INTO movies
      (
        title,
        description,
        releaseYear,
        genre,
        director,
        actorName1,
        actorAge1,
        actorCountry1
      )
      VALUES
      (
        "${req.body.title}",
        "${req.body.description}",
        "${req.body.releaseYear}",
        "${req.body.genre}",
        "${req.body.director}",
        "${req.body.actorName1}",
        "${req.body.actorAge1}",
        "${req.body.actorCountry1}"
      )

  `,
    () => {
      res.send("Done");
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
