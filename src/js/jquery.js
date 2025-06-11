// Configuración de la API (The Movie Database API)
const API_KEY = '852e5b6a3ea6655d04c1847758b378d8';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`;
let currentPage = 1;
let isLoading = false;

// Función para obtener películas
function fetchMovies(page = 1) {
  return new Promise((resolve, reject) => {
    isLoading = true;
    $('#loading').removeClass('hidden');
    $.ajax({
      url: `${API_URL}&page=${page}`,
      method: 'GET',
      success: function(data) {
        resolve(data.results);
      },
      error: function(error) {
        console.error('Error al obtener películas:', error);
        reject([]);
      },
      complete: function() {
        isLoading = false;
        $('#loading').addClass('hidden');
      }
    });
  });
}

// Función para mostrar películas
function displayMovies(movies) {
  movies.forEach(movie => {
    const posterPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Imagen';
    const movieCard = `
      <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <img src="${posterPath}" alt="${movie.title}" class="w-full h-64 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-bold mb-2 truncate">${movie.title}</h3>
          <p class="text-gray-600 line-clamp-3">${movie.overview || 'Descripción no disponible'}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">${movie.vote_average}/10</span>
            <span class="text-sm text-gray-500">${movie.release_date?.split('-')[0] || 'N/A'}</span>
          </div>
        </div>
      </div>
    `;
    $('#movies-container').append(movieCard);
  });
}

// Cargar películas iniciales
async function loadInitialMovies() {
  try {
    const movies = await fetchMovies(currentPage);
    displayMovies(movies);
    currentPage++;
  } catch (error) {
    console.error(error);
  }
}

// Infinite scroll
$(window).scroll(async function() {
  const scrollTop = $(this).scrollTop();
  const scrollHeight = $(document).height();
  const clientHeight = $(this).height();
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    try {
      const movies = await fetchMovies(currentPage);
      displayMovies(movies);
      currentPage++;
    } catch (error) {
      console.error(error);
    }
  }
});

// Inicializar
$(document).ready(loadInitialMovies);