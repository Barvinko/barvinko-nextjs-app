const tmdbBaseUrl = 'https://api.themoviedb.org/3';

export const API_URLS = {
  BASE: tmdbBaseUrl,
  MOVIE_POPULAR: `${tmdbBaseUrl}/movie/popular`,
  MOVIE_SEARCH: `${tmdbBaseUrl}/search/movie`,
  MOVIE_ID: `${tmdbBaseUrl}/movie/:id`,
};

export enum IMAGE_URLS {
  ORIGINAL = 'https://image.tmdb.org/t/p/original',
  W500 = 'https://image.tmdb.org/t/p/w500',
  W200 = 'https://image.tmdb.org/t/p/w200',
}
