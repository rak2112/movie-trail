import styled from 'react-emotion';
import bg from '../../images/login.jpg';

export const StyledComponent = styled('div')`
  background: no-repeat center/100% url(${bg});
  height: 800px;
  width: 100%;
  form {
    background: #000;
    color: #ccc;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    top: 50px;
    width: 30%;
  }
  h3 {
      text-align: center;
      margin-bottom: 0.7em;
    }
    .container {
      margin-top: 40px;
      padding: 20px;
    }
    a, a.btn, button.btn {
      color: #fff;
      height: 60px;
      width: 100%;
      margin-top: 10px;
      padding-top: 15px;
    }
    input.form-control {
      background: #ccc;
      height: 60px;
    }
    input.error {
      background: #f2dede;
      border-color: #cc0000;
    }
    em {
      color: #cc0000;
      display: inline-block;
      padding: 5px;
    }
    a.nav-link {
      color: #cc0000;
      cursor: pointer;
      display: inline-block;
      padding-top: 25px;
      text-align: right;
      text-decoration: none;
      width: 150px;
    }
`;