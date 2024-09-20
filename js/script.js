const global = {
  currentPage: window.location.pathname,
};


// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '2635839629d3c675dd8efe3cc11cb4f8';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  return data;
}

// Highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.getAttribute('href') === global.currentPage &&
      link.classList.add('active');
      global.currentPage === '/index.html'&& links[0].classList.add('active');
  });
};

// Init app
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
