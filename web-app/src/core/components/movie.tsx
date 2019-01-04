import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as uuid from 'uuid/v4';

import { UserActions } from '../components';
import { Genre, Movie, UserMovieMap, UserView } from '../interfaces';
import { paths } from '../utils/util-service';
import { Container, Detail, MovieContainer, NoPoster } from './styles/movie.style';


interface Props {
  genres: Genre[];
  movie: Movie;
  userView?: UserView;
  userMovies: UserMovieMap;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
}

const getUuid = () => {
  return uuid();
}

export class MovieComponent extends PureComponent <Props>{
  
  render() {
    const { 
      addMovie, 
      deleteMovie,
      genres,
      movie: {id, backdrop_path: moviePoster, genre_ids: movieGenres, title },
      userMovies,
      userView
    } = this.props;
    return (
      <Container>
        <MovieContainer>
          {
            moviePoster ?
              <Link to={{pathname: '/movie-details/' + id }}>
                <img src={`${paths.imgPath500}${moviePoster} `} alt="" />
              </Link>
              : <NoPoster>No Image Available</NoPoster>
          }
          <UserActions 
            addMovie={addMovie} 
            deleteMovie={deleteMovie}
            movie={this.props.movie} 
            userMovies={userMovies}
            userView={userView}
          />
          <Detail>
            <h3>{title}</h3>
            {
              movieGenres.map((genre: number) => (<span className="genre" key={getUuid()}>{ genres && genres[genre] && genres[genre].name }</span>))
            }
            <p>
            <Link to={{pathname: '/movie-details/'+ id }}>View Details</Link>
            </p>
          </Detail>
        </MovieContainer>
      </Container>
    );
  }
};