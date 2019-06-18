import React from 'react';
import styled from 'react-emotion';


const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  height: 660px;
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 100px;
  h3{
    text-align: center;
    width: 100%;
  }
`;

export const MovieList: React.SFC<any> = ({children}) => {
  return (
    <Container>
      {children()}
    </Container>
  )
};

MovieList.displayName = 'MovieList';
