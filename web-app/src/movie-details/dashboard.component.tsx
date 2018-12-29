import React, { PureComponent } from 'react';
import { Carousel } from '../core/components';
import { MovieDetail } from '../core/interfaces';
import { Details } from './details';

export class MovieDetailsComponent extends PureComponent<MovieDetail> {
  render() {
    return (
      <>
        <Details {...this.props.details} />
        <Carousel images={this.props.images} />
      </>
    )
  }
};
