import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import * as uuid from 'uuid/v4';

import { UserActions } from '../components';

import { Genre, Movie, UserMovieMap } from '../interfaces';
import { colors } from '../styles';
import { paths } from '../utils/util-service';

interface Props {
  genres: Genre[];
  movie: Movie;
  userMovies?: UserMovieMap;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
}

const Container = styled('div')`
  width: 31%;
  margin: 1%;
  &:nth-of-type(3n) {
    margin-right: 0;
  }
  &:nth-of-type(3n+1) {
    margin-left: 0;
  }
`;
const Movie = styled('div')`
  div {
    box-shadow: 3px 6px 11px #191919;
    padding: 4px 4px 8px;
    text-align: center;
  }
  img {
    padding: 0;
    height: 300px;
    width: 100%;
    vertical-align: middle;
  }
`;

const NoPoster = styled('div')`
  height: 300px;
  font-size: 18px;
  text-align: center;
  background: $black;
  color: ${colors.$orange};
`;

const Detail = styled('div')`
  background: #262626;
  padding: 0 10px;
  height: 160px;
  overflow: hidden;
  a {
    color: #cc3300;
    font-size: 1.6rem;
    text-decoration: none;
  }
  h3 {
    color: #ccc;
    font-size: 2.4rem;
    margin-bottom: 20px;
  }
  p {
    color: #ccc;
    padding-top: 10px;
  }
  span.genre {
    margin: 0px 2px 6px;
    display: inline-block;
    background: #cc3300;
    border-radius: 3px;
    color: #fff;
    font-size: 1.4rem;
    padding: 2px 6px;
    margin: 0 3px;
  }
`;

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
      userMovies
    } = this.props;
    return (
      <Container>
        <Movie>
          <div className="items">
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
          </div>
        </Movie>
      </Container>
    );
  }
};