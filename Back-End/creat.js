const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("movies.db");

db.run(
  `
    CREATE TABLE movies (
        [id] INTEGER PRIMARY KEY,
        [title] NVARCHAR(255),
        [description] NVARCHAR(255),
        [releaseYear] NVARCHAR(255),
        [genre] NVARCHAR(255),
        [director] NVARCHAR(255),
        [actorName1] NVARCHAR(255),
        [actorAge1] NVARCHAR(255),
        [actorCountry1] NVARCHAR(255),
        [actorName2] NVARCHAR(255),
        [actorAge2] NVARCHAR(255),
        [actorCountry2] NVARCHAR(255),
        [actorName3] NVARCHAR(255),
        [actorAge3] NVARCHAR(255),
        [actorCountry3] NVARCHAR(255),
        [likes] INTEGER DEFAULT 0
    )
`
);

db.run(
  `
    CREATE TABLE comments (
        [id] INTEGER PRIMARY KEY,
        [movieId] INTEGER,
        [name] NVARCHAR(255),
        [text] NVARCHAR(255),
        FOREIGN KEY(movieId) REFERENCES movies(id)
    )
  `
);
