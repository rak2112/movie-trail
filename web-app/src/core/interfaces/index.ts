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
  username: string;
  password: string;
  confirmPassword?: string;
  token?: string;
}

export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
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

export interface StateProps {
  api? : Api;
  genres: Genre[];
  movies: Movies;
  user: User;
  loadGenres: () => void;
  loadMovies: (pageNo: number) => void;
}

export interface UserMovie extends Movie {
  type: UserMovieType;
}

export interface User {
  displayName?: string;
  movies?: UserMovie[]
  token?: string;
}