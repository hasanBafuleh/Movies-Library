const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = 3000;

const db = new sqlite3.Database("movies.db");

db.run(`
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    release_year INTEGER,
    genre TEXT,
    director TEXT,
    likes INTEGER DEFAULT 0
  )
`);

db.run(`
  CREATE TABLE casts (
    id INTEGER PRIMARY KEY,
    movie_id INTEGER,
    actor_name TEXT,
    actor_age INTEGER,
    actor_country TEXT
  )
`);

db.run(`
  CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    movie_id INTEGER,
    user TEXT,
    comment TEXT
  )
`);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  