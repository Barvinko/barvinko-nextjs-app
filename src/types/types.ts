import { MovieDetails } from 'tmdb-ts';

export interface MovieDetailsAdded extends MovieDetails {
  origin_country: string;
}

interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}
