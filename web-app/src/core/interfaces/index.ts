type MovieType =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentry'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'TV Movie'
  | 'Thriller'
  | 'War'
  | 'Western';

type UserMovieType= 'FAVORITE' | 'WATCHLIST'

export interface Api {
  isFetching?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}; 

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  token?: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  homepage: string;
  overview: string;
  runtime: string;
  release_date: string;
  spoken_languages: Language[];
  status: string;
  title: string;
  vote_average: string;
};

export interface Movies {
  pageNo: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
};

export interface MoviesData {
  pageNo: number;
  total_results: number;
  total_pages: number;
  results?: Movie[];
};

export interface MoviesRes {
  movies: Movie[]
};

export interface Genre {
  id: number;
  name: MovieType;
};

export interface UserMovie extends Movie {
  _id: string;
  movieType: UserMovieType;
}

export interface User {
  email?: string;
  displayName?: string;
  loggedIn?: boolean;
  movies?: UserMovie[];
  resetMessage?: string;
  token?: string;
}

export interface UserMovieMap {
  [id: string]: UserMovie
}

export interface Cast {
  character: string;
  id: string;
  name: string;
  profile_path?: string;
}

export interface Crew extends Cast {
  department: string;
  job: string;
}

export interface Poster {
  file_path: string;
}

export interface Persons {
  id?: string;
  cast: Cast[];
  crew: Crew[];
}

export interface Posters {
  id?: string;
  backdrops: Poster[];
  posters: Poster[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
}

export interface Videos {
  id: string;
  results: Video[]
}

export interface MovieDetail {
  details: Movie;
  images: Posters;
  persons: Persons;
  videos: Videos
}