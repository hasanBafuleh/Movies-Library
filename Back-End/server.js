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
  db.all(
    `SELECT id, title, description, releaseYear, genre, director, actorName1, actorAge1, actorCountry1, actorName2, actorAge2, actorCountry2, actorName3, actorAge3, actorCountry3, likes FROM movies`,
    {},
    (error, rows) => res.send(rows)
  );
});

app.post("/movies", (req, res) => {
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
        actorCountry1,
        actorName2,
        actorAge2,
        actorCountry2,
        actorName3,
        actorAge3,
        actorCountry3
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
        "${req.body.actorCountry1}",
        "${req.body.actorName2}",
        "${req.body.actorAge2}",
        "${req.body.actorCountry2}",
        "${req.body.actorName3}",
        "${req.body.actorAge3}",
        "${req.body.actorCountry3}"
        
      )

  `,
    () => {
      res.send("Done");
    }
  );
});

app.put("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  console.log(`Update request received for movie ID: ${movieId}`);
  console.log(`Received data:`, req.body);

  db.run(
    `
    UPDATE movies
    SET
        title = ?,
        description = ?,
        releaseYear = ?,
        genre = ?,
        director = ?,
        actorName1 = ?,
        actorAge1 = ?,
        actorCountry1 = ?,
        actorName2 = ?,
        actorAge2 = ?,
        actorCountry2 = ?,
        actorName3 = ?,
        actorAge3 = ?,
        actorCountry3 = ?
    WHERE id = ?
  `,
    [
      req.body.title,
      req.body.description,
      req.body.releaseYear,
      req.body.genre,
      req.body.director,
      req.body.actorName1,
      req.body.actorAge1,
      req.body.actorCountry1,
      req.body.actorName2,
      req.body.actorAge2,
      req.body.actorCountry2,
      req.body.actorName3,
      req.body.actorAge3,
      req.body.actorCountry3,
      movieId,
    ],
    (error) => {
      if (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Movie updated successfully");
        res.send("Movie updated successfully");
      }
    }
  );
});

app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  // Delete comments first
  db.run(
    `DELETE FROM comments WHERE movieId = ?`,
    [movieId],
    (commentError) => {
      if (commentError) {
        console.error("Error deleting comments:", commentError.message);
        res.status(500).send("Internal Server Error");
      } else {
        // Once comments are deleted, delete the movie
        db.run(`DELETE FROM movies WHERE id = ?`, [movieId], (movieError) => {
          if (movieError) {
            console.error("Error deleting movie:", movieError.message);
            res.status(500).send("Internal Server Error");
          } else {
            res.send("Movie and related comments deleted");
          }
        });
      }
    }
  );
});

// GET requests for a single movie
app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  db.get(
    `SELECT id, title, description, releaseYear, genre, director, actorName1, actorAge1, actorCountry1, actorName2, actorAge2, actorCountry2, actorName3, actorAge3, actorCountry3, likes FROM movies WHERE id = ?`,
    [movieId],
    (error, row) => {
      if (error) {
        res.status(500).send("Internal Server Error");
      } else if (row) {
        res.send(row);
      } else {
        res.status(404).send("Movie not found");
      }
    }
  );
});

app.get("/comments/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  db.all(`SELECT * FROM comments WHERE movieId = ?`, [movieId], (error, rows) =>
    res.send(rows)
  );
});

app.post("/comments/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const commentText = req.body.text;

  db.run(
    `INSERT INTO comments (movieId, text) VALUES (?, ?)`,
    [movieId, commentText],
    () => {
      res.send("Comment added");
    }
  );
});

app.post("/movies/:id/like", (req, res) => {
  const movieId = req.params.id;
  db.run(`UPDATE movies SET likes = likes + 1 WHERE id = ?`, [movieId], () => {
    res.send("Like added");
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
