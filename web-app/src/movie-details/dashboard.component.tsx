import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { Carousel, Toaster, UserActions } from '../core/components';
import { TabDetatils } from './common/tabs';
import { DetailProps } from './dashboard.container';
import { Details } from './details';
import { ContainerLeft, ContainerRight } from './styled';

const Actions = styled('div')`
  width: 50%;
  float: right;
`;

export class MovieDetailsComponent extends PureComponent<DetailProps> {

  componentWillUnmount() {
    this.props.resetDetails();
  }

  render() {
    const {
      addCollection,
      deleteMovie,
      details,
      images,
      userMovies
    } = this.props;

    return (
      <>
        <ContainerLeft>
          <Toaster duration={2000}/>
          <TabDetatils {...this.props}/>
          {/* <Details {...details} key={details.id}/> */}
        </ContainerLeft>

        <ContainerRight>
          <UserActions 
              addMovie={addCollection} 
              deleteMovie={deleteMovie}
              movie={details} 
              userMovies={userMovies}
            />
          <Carousel images={images} key={details.id}/>
        </ContainerRight>
        
      </>
    )
  }
};
