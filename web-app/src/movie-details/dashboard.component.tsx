import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import { Carousel, Toaster } from '../core/components';
import UserActions from '../core/containers/user-actions';
import { TabDetatils } from './common/tabs';
import { DetailProps } from './dashboard.container';
import { ContainerLeft, ContainerRight } from './styled';


export class MovieDetailsComponent extends PureComponent<DetailProps> {

  componentWillUnmount() {
    this.props.resetDetails();
  }

  render() {
    const {
      details,
      images,
    } = this.props;

    return (
      <>
        <ContainerLeft>
          <Toaster duration={2000}/>
          <TabDetatils {...this.props}/>
        </ContainerLeft>

        <ContainerRight>
          <UserActions 
            movie={details}
          />
          <Carousel images={images} key={details.id}/>
        </ContainerRight>
      </>
    )
  }
};
