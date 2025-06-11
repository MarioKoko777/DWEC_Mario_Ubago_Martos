// Configuración de la API (The Movie Database API)
const API_KEY = '852e5b6a3ea6655d04c1847758b378d8';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;
let currentPage = 1;
let isLoading = false;

// Elementos del DOM
const moviesContainer = document.getElementById('movies-container');
const loadingElement = document.getElementById('loading');

// Función para obtener películas
async function fetchMovies(page = 1) {
  try {
    isLoading = true;
    loadingElement.classList.remove('hidden');
    const response = await fetch(`${API_URL}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return [];
  } finally {
    isLoading = false;
    loadingElement.classList.add('hidden');
  }
}

// Función para mostrar películas
function displayMovies(movies) {
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl';
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-64 object-cover" onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2 truncate">${movie.title}</h3>
        <p class="text-gray-600 line-clamp-3">${movie.overview || 'Descripción no disponible'}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">${movie.vote_average}/10</span>
          <span class="text-sm text-gray-500">${movie.release_date?.split('-')[0] || 'N/A'}</span>
        </div>
      </div>
    `;
    moviesContainer.appendChild(movieCard);
  });
}

// Cargar películas iniciales
async function loadInitialMovies() {
  const movies = await fetchMovies(currentPage);
  displayMovies(movies);
  currentPage++;
}

// Scroll infinito
window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    const movies = await fetchMovies(currentPage);
    displayMovies(movies);
    currentPage++;
  }
});

// Inicializar
document.addEventListener('DOMContentLoaded', loadInitialMovies);