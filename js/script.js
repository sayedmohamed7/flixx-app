const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                  : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>`;
    const container = document.getElementById('popular-movies');
    container.appendChild(div);
  });
}

// Display 20 most popular TV shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.getElementById('popular-shows').appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `<div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((comp) => `<span>${comp.name}</span>`)
            .join(', ')}.</div>
        </div>`;
  document.getElementById('movie-details').appendChild(div);
}

// Display show details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showId}`);

  // Overlay for background image
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `<div class="details-top">
          <div>
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.original_name}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.original_name}"
            />`
            }
          </div>
          <div>
            <h2>${show.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes: </span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((comp) => `<span>${comp.name}</span>`)
            .join(', ')}.</div>
        </div>`;
  document.getElementById('show-details').appendChild(div);
}

// Display backdorp on details page
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';
  type === 'movie'
    ? document.querySelector('#movie-details').appendChild(overlayDiv)
    : document.querySelector('#show-details').appendChild(overlayDiv);
};

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '2635839629d3c675dd8efe3cc11cb4f8';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

// Show spinner function
const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};
// Hide spinner function
const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// Highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.getAttribute('href') === global.currentPage &&
      link.classList.add('active');
    global.currentPage === '/index.html' && links[0].classList.add('active');
  });
};

// Init app
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
