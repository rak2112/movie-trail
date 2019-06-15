import React from 'react';
import styled from 'react-emotion';

import { initialsUpperCase } from '../../core/utils/';

const Container = styled('div')`
  .profileDetails {
  border-radius: 40px;
  border: 3px solid #eaeaea;
  background: #ccc;
  display: inline-block;
  width: 100px;
  height: 100px;
}
  .cast {
    clear: both;
    padding-top: 1rem;
    .attr-name {
      padding-left: 3rem;
    }
    li {
      float: left;
      list-style: none;
      width: 155px;
      text-align:center;
    }
    .cast-detail {
      display: inline-block;
      height: 160px;
      width: 180px;
      img {
        border-radius: 40px;
        border: 3px solid #eaeaea;
        background: #ccc;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
      span {
        display: block;
        font-size: 1.2rem;
      }
      span:first-child {
        font-weight: bold;
      }
      .initials {
        color: #cc0000;
        font-size: 2.4rem;
        padding-top: 2.6rem;
        font-weight: bold;
        border-radius: 40px;
        border: 3px solid #eaeaea;
        background: #ccc;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    }
  }
`;

export const Cast = ({ persons }: any) => {
  return (
    <Container>
    <div className="cast clearfix">
      <ol>
        { 
          persons.slice(0, 12).map((actor: any, index: string) => { 
            return (
              <li key={index}>
                <div className="cast-detail">
                  <div className="profile">
                    {
                      actor.profile_path ? <img src={'https://image.tmdb.org/t/p/w264_and_h264_bestv2'+actor.profile_path} alt="PP" />
                      : <div className="initials">{initialsUpperCase(actor.name)}</div>
                    }
                  </div>
                  <p>
                    <span>{actor.name}</span>
                    <span>{ (actor.character) ? actor.character : actor.job }</span>
                  </p>
                </div>
              </li>
            )
          })
        }
        {
          (!persons.length) && <h2>No results found!</h2>
        }
      </ol>
    </div>
  </Container>
  ) 
}