import React from 'react';
import styled from 'react-emotion';

import { User } from '../../core/interfaces';
import { initialsUpperCase } from '../../core/utils/util-service';

const Container = styled('div')`
  .container div {
    float: left;
    padding: 20px 0;
  }
  .logo span{
    padding: 39px;
    background: #000;
    border-radius: 22px;
    font-size: 2.5rem;
    color: #ff5c00;
    display: inline-block;
    width: 116px;
    text-align: center;
    margin-right: 4rem;
  }
  h3 {
    text-align: inherit;
    padding-top: 40px;
  }
`;
export const ProfileDetails = (user: User) => {
  return (
    <Container>
      <div className="container">
        <div className="logo">
          <span>{initialsUpperCase(user.displayName)}</span>
        </div>
        <h3>{user.displayName}</h3>
      </div>
    </Container>
  );
};
ProfileDetails.displayName = 'ProfileDetails';