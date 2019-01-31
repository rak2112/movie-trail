import React, { PureComponent } from 'react';

import { MenuBarProps } from './dashboard.container';
import { MenuItemsComponent } from './menu-items.components';
import { SearchBar } from './searchBar.component';


export class MenuBar extends PureComponent <MenuBarProps> {
  render() {
    return (
      <>
        <MenuItemsComponent {...this.props}/>
        {/* <SearchBar searchMovies={this.props.search}/> */}
      </>
    )
  }
};
