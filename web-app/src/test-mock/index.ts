import { Genre, Movie, Movies, UserMovieMap } from '../core/interfaces';

// import { State } from '../core/reducers';

export const defaultMoviesState = {
  addMovie: jest.fn(),
  deleteMovie: jest.fn(),
  genres:[
    {id:2, name: "Action"} as Genre
  ], 
  loadMovies: jest.fn(),
  movies: {
    totalPages: 1, pageNo: 1, totalResults: 3, 
    results: [{
      id: 2,
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [],
      status: 'status',
      title: 'title',
      vote_average: 'vote_avg'
    },
    {
      id: 3,
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [],
      status: 'status',
      title: 'title',
      vote_average: 'vote_avg'
    }]
  } as Movies,
  userMovies: {
    favorites: {
      2: {
        id: 2,
        _id: '23',
        backdrop_path: 'path',
        genre_ids: [1, 2],
        genres: [],
        homepage: 'homepage',
        movieType: 'FAVORITE',
        overview: 'overview',
        runtime: '107',
        release_date: '2-04-19',
        spoken_languages: [],
        status: 'status',
        title: 'title',
        vote_average: 'vote_avg'
      }
    },
    watchlist: {}
  } as UserMovieMap
};

export const defaultState = {
  api: { isFetching: true, hasError: false },
  genres: [{id:2, name: 'Action'} as Genre ],
  movies: null,
  movieDetails: null,
  searchedMovies: null,
  user: null,
  userMovies: {}
} as any;

export const defaultMovies = {
  totalPages: 1, pageNo: 1, totalResults: 3, 
  results: [{
    id: 2,
    backdrop_path: 'path',
    genre_ids: [1, 2],
    genres: [],
    homepage: 'homepage',
    overview: 'overview',
    runtime: '107',
    release_date: '2-04-19',
    spoken_languages: [],
    status: 'status',
    title: 'title',
    vote_average: 'vote_avg'
  },
  {
    id: 3,
    backdrop_path: 'path',
    genre_ids: [1, 2],
    genres: [],
    homepage: 'homepage',
    overview: 'overview',
    runtime: '107',
    release_date: '2-04-19',
    spoken_languages: [],
    status: 'status',
    title: 'title',
    vote_average: 'vote_avg'
  }] as Movie[]
} as Movies;