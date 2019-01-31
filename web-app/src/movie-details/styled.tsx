import styled from 'react-emotion';

export const ContainerLeft = styled('div')`
  float: left;
  padding: 20px;
  width: 56%;
  .user-actions {
    margin-top: 20px;
    padding: 10px 0;
  }
 .movie-details {
   padding: 15px;
   a {
     color: #ff5c00;
     font-size: 1.8rem;
     text-decoration: underline;
   }
  .btn-warning {
    color: $orange;
    background-color: $white;
    margin-right: 1px;
  }
  .attributes {
    padding: 20px 0;
    div {
      float: left;
      width: 50%;
      padding-bottom: 10px;
    }
  }
  h3 {
    color: #ff5c00;;
    text-align:center;
    font-size: 30px;
  }
  .attr-name {
    font-weight: bold;
    color: #cc3300;
    margin-right: 5px;
    display: inline;
  }
  .attr {
    color: #ff5c00;
    font-size: 1.6rem;
  }
  .genres {
    margin-bottom: 20px;
    span {
      margin: 0 1px;
    }
  }
}
`;

export const ContainerRight = styled('div')`
  float: right;
  margin-top: 20px;
  width: 44%;
  .user-actions {
    margin-left: 30px;
    width: 550px;
    height: 45px;
    padding-top: 8px;
  }
`;