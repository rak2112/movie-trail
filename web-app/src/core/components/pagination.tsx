import React, { PureComponent } from 'react';
// import { Pager, Pagination } from 'react-bootstrap';
import Pagination from "react-js-pagination";

import styled from 'react-emotion';
import '../styles/pagination.scss';

const Footer = styled('footer')`
  background: #222;
  color: #ccc;
  border-radius: 4px;
  height: 50px;
  position: fixed;
  bottom: -1px;
  min-width: 100%;
  ul {
    margin: 5px 0;
  }
  li {
    float: left;
    margin: 4px;
    list-style: none;
  }
  li a, li span {
    background: #222;
    background-color: none;
    border: none;
  }
  a {
    color: #ff5c00 !important;
    /* background-color: #ff5c00 !important;
    border-color: #ff5c00 !important; */
  }
`;

export interface Pagination {
  pageNo: number;
  totalPages: number;
  loadMovies: (pageNo: number) => void;
};

export const MoviesPagination: React.SFC<Pagination> = ({pageNo, totalPages, loadMovies}: Pagination) => (
  <Footer>
    <Pagination
      activePage={+pageNo}
      itemsCountPerPage={20}
      totalItemsCount={totalPages}
      pageRangeDisplayed={5}
      onChange={loadMovies}
    />
  </Footer>
);

MoviesPagination.displayName = `MoviesPagination`;