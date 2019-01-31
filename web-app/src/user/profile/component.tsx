import React, { PureComponent } from 'react';
import {
  MovieList,
  Toaster 
} from '../../core/components';
import { Profile } from './container';
import { MovieTabs } from './tabs';
import { ProfileDetails } from './user-details.component';


export class ProfileComponent extends PureComponent <Profile, any> {
  static displayName = 'ProfileComponent';
  render() { 
    const { user } = this.props;
    return (
      <>
        <MovieList>
          {() => (
            <>
              <ProfileDetails {...user}/>
              <Toaster duration={2000}/>  
              <MovieTabs {...this.props}/>
            </>
          )}
        </MovieList>
      </>
    )
  }
}