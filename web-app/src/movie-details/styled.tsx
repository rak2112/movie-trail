import styled from 'react-emotion';

export const ContainerLeft = styled('div')`
  float: left;
  padding: 20px;
  width: 56%;
  .user-actions {
    margin-top: 20px;
    padding: 10px 0;
  }
  .main-img {
    img {
      width: 100%;
    }
     position: relative;
     width: 100%;
     z-index: 1;
   }
 .movie-details {
   border: 2px solid #ccc;
   margin: 0 22px;
   opacity:0.6;
   width: 710px;
   position: absolute;
   top: 170px;
   z-index: 5;
   background-color: #000;

   a {
     color: #ff5c00;
     font-size: 1.8rem;
     text-decoration: underline;
   }
   .overview {
     padding: 50px;
     p {
       color: #ccc;
     }
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
  .glyphicon {
    color: #ccc;
    font-size: 18px;
    padding-right: 5px;
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
    color: #ff5c00;
    height: 45px;
    background: #fff;
    font-size: 18px;
    padding: 9px;
    span {
      margin: 0 1px;
    }
    .glyphicon {
      color: #ff5c00;
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