let actorCount = 1;

function addActorSection() {
  actorCount++;

  const castSection = document.getElementById("cast-section");
  const newActorSection = document.createElement("div");
  newActorSection.classList.add("mb-3");

  newActorSection.innerHTML = `
    <h3>Cast</h3>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="actorName${actorCount}" class="form-label">Actor Name:</label>
          <input
            type="text"
            class="form-control"
            id="actorName${actorCount}"
            name="actorName${actorCount}"
            required
          />
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="actorAge${actorCount}" class="form-label">Actor Age:</label>
          <input
            type="number"
            class="form-control"
            id="actorAge${actorCount}"
            name="actorAge${actorCount}"
            required
          />
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="actorCountry${actorCount}" class="form-label">Actor Country:</label>
          <input
            type="text"
            class="form-control"
            id="actorCountry${actorCount}"
            name="actorCountry${actorCount}"
            required
          />
        </div>
      </div>
    </div>
  `;

  castSection.appendChild(newActorSection);
}

function addMovie() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const releaseYear = document.querySelector("#releaseYear").value;
  const genre = document.querySelector("#genre").value;
  const director = document.querySelector("#director").value;

  let castHTML = "";
  for (let i = 1; i <= actorCount; i++) {
    const actorName = document.querySelector(`#actorName${i}`).value;
    const actorAge = document.querySelector(`#actorAge${i}`).value;
    const actorCountry = document.querySelector(`#actorCountry${i}`).value;

    castHTML += `
      <div class="list-group-item">
        <div class="row">
          <div class="col">
            <h6 class="mb-1">${actorName}</h6>
          </div>
          <div class="col text-end">
            <small>Age: ${actorAge}</small>
          </div>
          <div class="col text-end">
            <small>Country: ${actorCountry}</small>
          </div>
        </div>
      </div>
      
    `;

    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#releaseYear").value = "";
    document.querySelector("#genre").value = "";
    document.querySelector("#director").value = "";
    document.querySelector(`#actorName${i}`).value = "";
    document.querySelector(`#actorAge${i}`).value = "";
    document.querySelector(`#actorCountry${i}`).value = "";
  }

  document.querySelector("#movie-list").innerHTML += `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-3"> ${title}</h5>
        <p class="card-text">
          <strong>Description:</strong> ${description}
        </p>
        <p class="card-text"><strong>Release Year:</strong> ${releaseYear}</p>
        <p class="card-text"><strong>Genre:</strong> ${genre}</p>
        <p class="card-text"><strong>Director:</strong> ${director}</p>
        <h6 class="card-subtitle mb-3 mt-4 text-muted">Cast</h6>
        <div class="list-group">
          ${castHTML}
        </div>
      </div>
    </div>`;
}
