async function addMovie() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const releaseYear = document.querySelector("#releaseYear").value;
  const genre = document.querySelector("#genre").value;
  const director = document.querySelector("#director").value;
  const actorName1 = document.querySelector("#actorName1").value;
  const actorAge1 = document.querySelector("#actorAge1").value;
  const actorCountry1 = document.querySelector("#actorCountry1").value;

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
  show();
}

async function show() {
  let response = await fetch("http://localhost:3000/movies");
  let movies = await response.json();

  // Clear existing movie list
  document.querySelector("#movie-list").innerHTML = "";

  for (let index = 0; index < movies.length; index++) {
    document.querySelector("#movie-list").innerHTML += `
    <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title mb-3">${movies[index].title}</h5>
      <p class="card-text">
        <strong>Description:</strong> ${movies[index].description}
      </p>
      <p class="card-text"><strong>Release Year:</strong> ${movies[index].releaseYear}</p>
      <p class="card-text"><strong>Genre:</strong> ${movies[index].genre}</p>
      <p class="card-text"><strong>Director:</strong> ${movies[index].director}</p>
      <h6 class="card-subtitle mb-3 mt-4 text-muted">Cast</h6>
      <div class="list-group">
        <div class="list-group-item">
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
        </div>`;
  }
}
