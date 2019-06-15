import React from 'react';

import { ApiQuery, Carousel, Toaster } from '../core/components';
import UserActions from '../core/containers/user-actions';
import { useGetDetails } from '../core/effects/details';
import { Api, MovieDetail } from '../core/interfaces';
import { State } from '../core/reducers';
import { TabDetatils } from '../movie-details/common/tabs';
import { ContainerLeft, ContainerRight } from '../movie-details/styled';

interface Props {
  api? : Api;
  match: {params: {id: number}}
}

export const MovieDetails = (props: Props) => {
  const { match: { params: { id }}} = props;
  const movieDetailProps: State = useGetDetails(id);

  return (
    <ApiQuery {...movieDetailProps}>
      {({ movieDetails: {details, images, persons}}:{movieDetails: MovieDetail}) => {

        return (
          <>
            <ContainerLeft>
              <Toaster duration={2000}/>
              <TabDetatils details = {details} persons={persons}/>
            </ContainerLeft>

            <ContainerRight>
              <UserActions 
                movie={details}
              />
              <Carousel images={images} key={details.id}/>
            </ContainerRight>
          </>
        )
      }}
    </ApiQuery>
  )
};
