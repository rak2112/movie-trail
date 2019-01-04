import React, { ReactNode } from 'react';
import styled from 'react-emotion';
import { Movies } from '../../core/interfaces';
import { paths } from '../../core/utils/util-service'; 

export interface Poster {
  movies: Movies,
  loadPosters: (pageNo: number) => void;
};

const Container = styled('div')`
  display: flex;
  flex-flow: row wrap;
  height: 750px;
  margin: 5px auto;
  max-width: 1200px;
  overflow: hidden;
  padding: 0;
  width: 1200px;
  h3 {
    text-align: center;
    width: 100%;
  }
  header {
    display: block
  }
  div {
    flex: 1;
    height: 175px;
    width: 33%;
  }
`;

export const Posters: React.SFC<Poster> = ({movies: {results}}) => {
  return (
    <Container>
      {
        results.slice(0,9).map( (movie, index): ReactNode | void => {
          return <div  key={index}><img src={paths.imgPath500 + movie.backdrop_path} alt="" /></div>;
        })
      }
    </Container> 
  );
};