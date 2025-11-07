import { MovieDetails } from 'tmdb-ts';

export interface MovieDetailsAdded extends MovieDetails {
  origin_country: string;
}
