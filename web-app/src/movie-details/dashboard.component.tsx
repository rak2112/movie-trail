import React, { PureComponent } from 'react';


import { Carousel, Toaster, UserActions } from '../core/components';
import { DetailProps } from './dashboard.container';
import { Details } from './details';
import { Container } from './styled';


export class MovieDetailsComponent extends PureComponent<DetailProps> {

  // static getDerivedStateFromProps(nextProps: any, state: any) {
  //   return {details: nextProps.details}
  // }

  // state = {
  //   details: this.props.details
  // }
  
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
        <Container>
          <Toaster duration={2000}/>
          <Details {...details} key={details.id}/>
          <UserActions 
            addMovie={addCollection} 
            deleteMovie={deleteMovie}
            movie={details} 
            userMovies={userMovies}
          />
        </Container>
        <Carousel images={images} key={details.id}/>
        
      </>
    )
  }
};
