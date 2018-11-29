import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
// import round from './../utils/roundingNumber';
// import './../styles/styles.scss';

import { Genre, Movie } from '../interfaces';
import { colors } from '../styles';
import { paths } from '../utils/util-service';

interface Props {
  genres: Genre[];
  movie: Movie;
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
    font-size: 1.8rem;
    font-weight: normal;
  }
  p {
    color: #ccc;
  }
  span {
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

export class MovieComponent extends PureComponent <Props>{
  render() {
    const { movie: {id, backdrop_path: moviePoster, genre_ids: movieGenres, vote_average: rating, title }, genres} = this.props;
    console.log('genres');
    return (
      <Container>
        <Movie>
          <div className="items">
            {
              moviePoster ? (
                <Link to={{pathname: '/movieDetails/' + id }}>
                  <img src={`${paths.imgPath500}${moviePoster} `} alt="" />
                </Link>
              ) :
              (
                <NoPoster>No Image Available</NoPoster>
              )
            }
            <Detail>
              <h3>{title}</h3>
              {
                movieGenres.map((genre: number) => (<span className="genre" key={`genre-${Math.random()}`}>{ genres && genres[genre].name }</span>))
              }
              <p>Rating: {rating}<span className="fa fa-star"/></p>
              <Link to={{pathname: '/movie-details/'+ id }}>View Details</Link>
            </Detail>
          </div>
        </Movie>
      </Container>
    );
  }
};

// export const MovieComponent: React.SFC<Props> = ({genres, movie}) => {
//   console.log('genressss');
//   const { backdrop_path: moviePoster} = movie;
//   return (
//     <Container>
//      <Movie>
//         <div className="items">
//           {
//             moviePoster ? (
//               <Link to={{pathname: '/movieDetails/' + movie.id }}>
//                 <img src={`${paths.imgPath500}${moviePoster} `} alt="" />
//               </Link>
//             ) :
//             (
//               <div className="no-poster">No Image Available</div>
//             )
//           }
//           <div className="detail">
//           <h3>{movie.title}</h3>
//           {/* {
//             movieGenres.map((genre) =>
//               {
//                 return <span className="genre" key={genre}>{ genres[genre] }</span>;
//             })
//           } */}
//           {/* <p>Rating: {round(movie.vote_average, 1)}<span className="fa fa-star"/></p> */}
//           <Link to={{pathname: '/movieDetails/'+movie.id }}>View Details</Link>
//         </div>
//         </div>
//       </Movie>
//     </Container>
//  );
// };



// Movie.propTypes = {
//   movie: PropTypes.object.isRequired,
//   genres: PropTypes.array.isRequired
// };

{/* <Link to={{pathname: '/movieDetails/'+movie.id }}>View Details</Link> */}

// moviePoster ? (
//   <Link to={{pathname: '/movieDetails/'+movie.id }}>
//     <img src={paths.imgPath500 + movie.backdrop_path} alt="" />
//   </Link>
// ) :
// (
//   <div className="no-poster">No Image Available</div>
// )