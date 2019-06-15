import styled from 'react-emotion';

export const TabContainer = styled('div')`
  border: 4px solid;
  clear: both;
  width: 100%;
  ul.nav-tabs {
    background: #000;
    border: none;
  }
  .nav>li>a:focus, .nav>li>a:hover {
    background: #333;
  }
  .nav-tabs>li.active>a, 
  .nav-tabs>li.active>a:focus, 
  .nav-tabs>li.active>a:hover {
    background: #333;
    border: none;
    color: #cc0;
  }
  .nav-tabs > li {
    margin-bottom: 0;
    a {
      border-radius: 0;
      border: none;
      color: #cc0000;
      font-size: 1.8rem;
      
      span {
        top: 3px;
        font-size: 2.0rem;
        padding-right: 8px;
      }
    }
  }
  div.tab-content {
    height: 600px;
    overflow-y: scroll;
    h3.no-records {
      background: #ccc;
      padding: 40px;
    }
  }
  div.tab-content>.tab-pane.active {
    display: flex;
    flex-wrap: wrap;
  }
`;