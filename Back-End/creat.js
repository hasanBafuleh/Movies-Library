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
        [actorCountry1] NVARCHAR(255)
    )
`
);
