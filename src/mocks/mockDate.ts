import { PopularMovies } from 'tmdb-ts';
import { MovieDetailsAdded, MovieVideosResponse } from '@/src/types/types';

export const mockPopularMoviesTitle = [
  'Demon Slayer: Kimetsu no Yaiba Infinity Castle',
  'The Lord of the Rings: The Return of the King',
];

export const mockPopularMovies: PopularMovies = {
  page: 2,
  results: [
    {
      adult: false,
      backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg',
      genre_ids: [16, 28, 14, 53],
      id: 1,
      original_language: 'ja',
      original_title: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
      overview:
        'The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.',
      popularity: 780.4859,
      poster_path: '/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg',
      release_date: '2025-07-18',
      title: mockPopularMoviesTitle[0],
      video: false,
      vote_average: 7.638,
      vote_count: 203,
    },
    {
      adult: false,
      backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg',
      genre_ids: [16, 28, 14, 53],
      id: 2,
      original_language: 'en',
      original_title: 'The Lord of the Rings: The Return of the King',
      overview:
        'As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.',
      popularity: 22.333,
      poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
      release_date: '2025-07-18',
      title: mockPopularMoviesTitle[1],
      video: false,
      vote_average: 8.9,
      vote_count: 2030,
    },
  ],
  total_pages: 10,
  total_results: 200,
};

export const mockMovieDetails: MovieDetailsAdded = {
  adult: false,
  backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg',
  belongs_to_collection: {
    id: 925155,
    name: 'Demon Slayer: Kimetsu no Yaiba Collection',
    poster_path: '/3exjjYTseefny9nYjSbkIblZZdK.jpg',
    backdrop_path: '/oHx043lHsysn8klll1nPvKMBHLf.jpg',
  },
  budget: 20000000,
  genres: [
    {
      id: 16,
      name: 'Animation',
    },
  ],
  homepage: 'https://www.demonslayer-movie.com',
  id: 1,
  imdb_id: 'tt32820897',
  origin_country: 'JP',
  original_language: 'ja',
  original_title: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
  overview:
    'The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.',
  popularity: 820.4782,
  poster_path: '/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg',
  production_companies: [
    {
      id: 5887,
      logo_path: '/m6FEqz8rQECnmfjEwjNhNAlmhCJ.png',
      name: 'ufotable',
      origin_country: 'JP',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'JP',
      name: 'Japan',
    },
  ],
  release_date: '2025-07-18',
  revenue: 390280149,
  runtime: 156,
  spoken_languages: [
    {
      english_name: 'Japanese',
      iso_639_1: 'ja',
      name: '日本語',
    },
  ],
  status: 'Released',
  tagline: "It's time to have some fun.",
  title: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle',
  video: false,
  vote_average: 7.65,
  vote_count: 204,
};

export const mockMovieVideos: MovieVideosResponse = {
  id: 1,
  results: [
    {
      id: '68c36bf0682941f0c924890f',
      key: 'DitPK3bfFOI',
      name: 'English Dub - Behind the Scenes',
      site: 'YouTube',
      type: 'Behind the Scenes',
      official: true,
    },
    {
      id: '691838e7579b325ab63a4fe9',
      key: 'pp2vyPNBOI4',
      name: 'Shinobu Kocho [Subtitled]',
      site: 'YouTube',
      type: 'Trailer',
      official: true,
    },
  ],
};
