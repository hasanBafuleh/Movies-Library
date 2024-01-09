function addMovie() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const releaseYear = document.querySelector("#releaseYear").value;
  const genre = document.querySelector("#genre").value;
  const director = document.querySelector("#director").value;
  const actorName1 = document.querySelector("#actorName1").value;
  const actorAge1 = document.querySelector("#actorAge1").value;
  const actorCountry1 = document.querySelector("#actorCountry1").value;

  console.log(title);
  console.log(description);
  console.log(releaseYear);
  console.log(genre);
  console.log(director);
  console.log(actorName1);
  console.log(actorAge1);
  console.log(actorCountry1);

  document.querySelector("#movie-list").innerHTML += `
  <div class="card">
  <div class="card-body">
    <h5 class="card-title mb-3">${title}</h5>
    <p class="card-text">
      <strong>Description:</strong>${description}
    </p>
    <p class="card-text"><strong>Release Year:</strong>${releaseYear}</p>
    <p class="card-text"><strong>Genre:</strong>${genre}</p>
    <p class="card-text"><strong>Director:</strong>${director}</p>
    <h6 class="card-subtitle mb-3 mt-4 text-muted">Cast</h6>
    <div class="list-group">
      <div class="list-group-item">
        <div class="row">
          <div class="col">
            <h6 class="mb-1">${actorName1}</h6>
          </div>
          <div class="col text-end">
            <small>Age: ${actorAge1}</small>
          </div>
          <div class="col text-end">
            <small>Country: ${actorCountry1}</small>
          </div>
        </div>
      </div>`;
}
