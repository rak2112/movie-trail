import styled from 'react-emotion';
import { colors } from './../../styles';

export const Container = styled('div')`
   width: 31%;
   margin: 1%;
`;
export const MovieContainer = styled('div')`
  box-shadow: 3px 6px 11px #191919;
  padding: 4px 4px 8px;
  text-align: center;

  &:nth-of-type(3n) {
    margin-right: 0;
  }

  &:nth-of-type(3n+1) {
    margin-left: 0; 
  }

  div {
    box-shadow: 3px 6px 11px #191919;
    padding: 4px 4px 8px;
    text-align: center;
  }
  img {
    padding: 0;
    height: 300px;
    width: 100%;
    vertical-align: middle;
  }
`;

export const NoPoster = styled('div')`
  height: 300px;
  font-size: 18px;
  text-align: center;
  background: $black;
  color: ${colors.$orange};
`;

export const Detail = styled('div')`
  background: #262626;
  padding: 0 10px;
  height: 160px;
  overflow: hidden;
  a {
    color: #cc3300;
    font-size: 1.6rem;
    text-decoration: none;
  }
  h3 {
    color: #ccc;
    font-size: 2.4rem;
    margin-bottom: 20px;
  }
  p {
    color: #ccc;
    padding-top: 10px;
  }
  span.genre {
    margin: 0px 2px 6px;
    display: inline-block;
    background: #cc3300;
    border-radius: 3px;
    color: #fff;
    font-size: 1.4rem;
    padding: 2px 6px;
    margin: 0 3px;
  }
`;