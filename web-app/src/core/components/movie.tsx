import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import UserActions from '../containers/user-actions';
import { Genre, GenresMap, Movie, UserMovieMap, UserView } from '../interfaces';
import { getUuid, paths } from '../utils/util-service';
import { Container, Detail, MovieContainer, NoPoster } from './styles/movie.style';


interface Props {
  genres: GenresMap;
  movie: Movie;
  id?: number;
  profileView?: boolean;
  userView?: UserView;
  userMovies?: UserMovieMap;
  addMovie?: (movie: Movie) => void;
  deleteMovie?: (movie: Movie) => void;
}

export const MovieComponent = memo(({
  genres,
  movie,
  profileView,
  userView
}: Props) => {
  const { backdrop_path, id, genre_ids, genres: detailGrenres, title } = movie;
  return (
    <Container>
      <MovieContainer>
        {
          backdrop_path ?
            <Link to={{pathname: '/movie-details/' + id }}>
              <img src={`${paths.imgPath500}${backdrop_path} `} alt="main image" />
            </Link>
            : <NoPoster>No Image Available</NoPoster>
        }
        <UserActions
          movie={movie}
          userView={userView}
          profileView={profileView}
        />
        <Detail>
          <h3>{title}</h3>
          { (genre_ids) ? 
            genre_ids.map((genre: number) => ( genres && genres[genre] && <span className="genre" key={getUuid()}>{ genres[genre].name }</span>))
            : 
            detailGrenres.map((genre: Genre) =>  <span className="genre" key={getUuid()}>{ genre.name }</span> )
          }
          <p>
          <Link to={{pathname: '/movie-details/'+ id }}>View Details</Link>
          </p>
        </Detail>
      </MovieContainer>
    </Container>
  );
});


