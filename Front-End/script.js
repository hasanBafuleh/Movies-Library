async function addMovie() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const releaseYear = document.querySelector("#releaseYear").value;
  const genre = document.querySelector("#genre").value;
  const director = document.querySelector("#director").value;
  const actorName1 = document.querySelector("#actorName1").value;
  const actorAge1 = document.querySelector("#actorAge1").value;
  const actorCountry1 = document.querySelector("#actorCountry1").value;
  const actorName2 = document.querySelector("#actorName2").value;
  const actorAge2 = document.querySelector("#actorAge2").value;
  const actorCountry2 = document.querySelector("#actorCountry2").value;
  const actorName3 = document.querySelector("#actorName3").value;
  const actorAge3 = document.querySelector("#actorAge3").value;
  const actorCountry3 = document.querySelector("#actorCountry3").value;

  let response = await fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: title,
      description: description,
      releaseYear: releaseYear,
      genre: genre,
      director: director,
      actorName1: actorName1,
      actorAge1: actorAge1,
      actorCountry1: actorCountry1,
      actorName2: actorName2,
      actorAge2: actorAge2,
      actorCountry2: actorCountry2,
      actorName3: actorName3,
      actorAge3: actorAge3,
      actorCountry3: actorCountry3,
    }),
  });

  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#releaseYear").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#director").value = "";
  document.querySelector(`#actorName1`).value = "";
  document.querySelector(`#actorAge1`).value = "";
  document.querySelector(`#actorCountry1`).value = "";
  document.querySelector(`#actorName2`).value = "";
  document.querySelector(`#actorAge2`).value = "";
  document.querySelector(`#actorCountry2`).value = "";
  document.querySelector(`#actorName3`).value = "";
  document.querySelector(`#actorAge3`).value = "";
  document.querySelector(`#actorCountry3`).value = "";
  show();
}

async function show() {
  let response = await fetch("http://localhost:3000/movies");
  let movies = await response.json();
  movies = movies.reverse();

  document.querySelector("#movie-list").innerHTML = "";

  for (let index = 0; index < movies.length; index++) {
    document.querySelector("#movie-list").innerHTML += `
          <div class="card mb-3 custom-border-card">
              <div class="card-body">
                  <button type="button" class="btn-close" aria-label="Close" onclick="deleteMovie(${movies[index].id})"
                      style="position: absolute; top: 15px; right: 15px;"></button>
                  <h5 class="card-title mb-3">${movies[index].title}</h5>
                  <p class="card-text">
                      <strong>Description:</strong> ${movies[index].description}
                  </p>
                  <p class="card-text"><strong>Release Year:</strong> ${movies[index].releaseYear}</p>
                  <p class="card-text"><strong>Genre:</strong> ${movies[index].genre}</p>
                  <p class="card-text"><strong>Director:</strong> ${movies[index].director}</p>
                  <h6 class="card-subtitle mb-3 mt-4 text-muted">Cast</h6>
                  <div class="list-group">
                      <div class="list-group-item custom-border-color">
                          <div class="row">
                              <div class="col">
                                  <h6 class="mb-1">${movies[index].actorName1}</h6>
                              </div>
                              <div class="col text-end">
                                  <small>Age: ${movies[index].actorAge1}</small>
                              </div>
                              <div class="col text-end">
                                  <small>Country: ${movies[index].actorCountry1}</small>
                              </div>
                          </div>
                      </div>
                      <div class="list-group-item custom-border-color">
                          <div class="row">
                              <div class="col">
                                  <h6 class="mb-1">${movies[index].actorName2}</h6>
                              </div>
                              <div class="col text-end">
                                  <small>Age: ${movies[index].actorAge2}</small>
                              </div>
                              <div class="col text-end">
                                  <small>Country: ${movies[index].actorCountry2}</small>
                              </div>
                          </div>
                      </div>
                      <div class="list-group-item custom-border-color">
                          <div class="row">
                              <div class="col">
                                  <h6 class="mb-1">${movies[index].actorName3}</h6>
                              </div>
                              <div class="col text-end">
                                  <small>Age: ${movies[index].actorAge3}</small>
                              </div>
                              <div class="col text-end">
                                  <small>Country: ${movies[index].actorCountry3}</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- Like button -->
                  <div class="row mt-4">
                  <div class="col">
                  <button type="button" class="btn edit-button" style="border-radius: 10px; background-color: #04423dd7; color: #fff; border: none; box-shadow: none;" onclick="editMovie(${movies[index].id})">
                      Edit
                  </button>
                  </div>
                  <div class="col text-end">
                  <button type="button" class="btn like-button" style="border-radius: 10px; background: rgba(4, 67, 62, 0.843); color: rgba(255, 255, 255, 1); border: none; box-shadow: none; font-size: 18px;" onclick="likeMovie(${movies[index].id})">
                    <i class="fa fa-thumbs-up" style="font-size: 20px;"></i>
                    <span class="like-count" style="margin-left: 8px; font-size: 16px;">${movies[index].likes}</span>
                  </button>
                </div>
                  </div>
                  <!-- Add a container for comments -->
                  <div class="comments-container mt-3">
                      <h6 class="text-muted">Comments</h6>
                      <!-- Comment form -->
                      <form class="comment-form mb-2">
                          <div class="input-group">
                          <input type="text" class="form-control custom-border-color rounded-start rounded-end" style="border-radius: 10px !important;" placeholder="Add a comment" />
                          <button type="button" class="btn btn-primary btn-block rounded-start rounded-end" onclick="postComment(${movies[index].id}, this)">Post a Comment</button>
                          </div>
                      </form>
                      <!-- Comment list -->
                      <ul class="list-group comment-list custom-border-color" id="comment-list-${movies[index].id}">
                          <!-- Comments will be dynamically added here -->
                      </ul>
                  </div>
              </div>
          </div>`;

    // Fetch and display comments for each movie
    await fetchAndDisplayComments(movies[index].id);
  }
}

function searchMovies() {
  const searchInput = document.querySelector(".form-control");
  const searchTerm = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll("#movie-list .card");

  // Loop through each card and check if the movie title matches the search term
  cards.forEach((card) => {
    const title = card.querySelector(".card-title").innerText.toLowerCase();

    if (title.includes(searchTerm)) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

async function deleteMovie(movieId) {
  // Implement logic to delete the movie from the database and update UI
  await fetch(`http://localhost:3000/movies/${movieId}`, { method: "DELETE" });
  show(); // Refresh the movie list after deletion
}

// Function to update the movie in the database
async function editMovie(movieId) {
  setTimeout(() => {
    // Scroll to the top with a smooth animation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 1000);

  let response = await fetch(`http://localhost:3000/movies/${movieId}`);
  let movieDetails = await response.json();

  // Populate the form with movie details for editing
  document.querySelector("#title").value = movieDetails.title;
  document.querySelector("#description").value = movieDetails.description;
  document.querySelector("#releaseYear").value = movieDetails.releaseYear;
  document.querySelector("#genre").value = movieDetails.genre;
  document.querySelector("#director").value = movieDetails.director;
  document.querySelector("#actorName1").value = movieDetails.actorName1;
  document.querySelector("#actorAge1").value = movieDetails.actorAge1;
  document.querySelector("#actorCountry1").value = movieDetails.actorCountry1;
  document.querySelector("#actorName2").value = movieDetails.actorName2;
  document.querySelector("#actorAge2").value = movieDetails.actorAge2;
  document.querySelector("#actorCountry2").value = movieDetails.actorCountry2;
  document.querySelector("#actorName3").value = movieDetails.actorName3;
  document.querySelector("#actorAge3").value = movieDetails.actorAge3;
  document.querySelector("#actorCountry3").value = movieDetails.actorCountry3;

  // Update the form button to indicate editing mode
  document.querySelector("#addMovieBtn").innerText = "Update Movie";

  document
    .querySelector("#addMovieBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      await updateMovie(movieId);
    });
}

async function updateMovie(movieId) {
  await fetch(`http://localhost:3000/movies/${movieId}`, { method: "DELETE" });

  // Update the existing movie in the array
  const moviesResponse = await fetch("http://localhost:3000/movies");
  let movies = await moviesResponse.json();
  movies = movies.map((movie) => {
    if (movie.id === movieId) {
      return {
        id: movieId,
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        releaseYear: document.querySelector("#releaseYear").value,
        genre: document.querySelector("#genre").value,
        director: document.querySelector("#director").value,
        actorName1: document.querySelector("#actorName1").value,
        actorAge1: document.querySelector("#actorAge1").value,
        actorCountry1: document.querySelector("#actorCountry1").value,
        actorName2: document.querySelector("#actorName2").value,
        actorAge2: document.querySelector("#actorAge2").value,
        actorCountry2: document.querySelector("#actorCountry2").value,
        actorName3: document.querySelector("#actorName3").value,
        actorAge3: document.querySelector("#actorAge3").value,
        actorCountry3: document.querySelector("#actorCountry3").value,
      };
    }
    return movie;
  });

  // Update the movies array in the database
  await fetch("http://localhost:3000/movies", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movies),
  });

  // Reset the form and update the button text to indicate add mode
  document.querySelector("#addMovieBtn").innerText = "Add Movie";
  document
    .querySelector("#addMovieBtn")
    .removeEventListener("click", updateMovie);

  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#releaseYear").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#director").value = "";
  document.querySelector(`#actorName1`).value = "";
  document.querySelector(`#actorAge1`).value = "";
  document.querySelector(`#actorCountry1`).value = "";
  document.querySelector(`#actorName2`).value = "";
  document.querySelector(`#actorAge2`).value = "";
  document.querySelector(`#actorCountry2`).value = "";
  document.querySelector(`#actorName3`).value = "";
  document.querySelector(`#actorAge3`).value = "";
  document.querySelector(`#actorCountry3`).value = "";

  show();
}

// Function to post a comment
async function postComment(movieId, buttonElement) {
  const inputElement =
    buttonElement.parentElement.querySelector(".form-control");
  const commentText = inputElement.value;

  if (commentText.trim() !== "") {
    await fetch(`http://localhost:3000/comments/${movieId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    });

    // Fetch and display updated comments
    await fetchAndDisplayComments(movieId);

    inputElement.value = "";
  }
}

// Function to fetch and display comments
async function fetchAndDisplayComments(movieId) {
  let response = await fetch(`http://localhost:3000/comments/${movieId}`);
  let comments = await response.json();
  const commentList = document.getElementById(`comment-list-${movieId}`);
  commentList.innerHTML = ""; // Clear existing comments

  comments.forEach((comment) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = comment.text;
    commentList.appendChild(listItem);
  });
}

// Function to like a movie
async function likeMovie(movieId) {
  console.log("Like button clicked for movieId:", movieId);

  await fetch(`http://localhost:3000/movies/${movieId}/like`, {
    method: "POST",
  });

  show();
}

document.querySelector(".d-flex").addEventListener("submit", function (event) {
  event.preventDefault();
  searchMovies();
});

document.addEventListener("DOMContentLoaded", show);
