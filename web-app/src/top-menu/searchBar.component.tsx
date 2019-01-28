import React, { createRef, FormEvent, PureComponent, ReactChild } from 'react';
// import { Link } from 'react-router-dom';

const styles = {
  background: '#fff',
  height: '45px',
  borderRaidus: 0
}

// type HTMLElementEvent<T extends HTMLElement> = Event & {
//   target: T;
// }
// interface Props {
//   textInput: ReactChild
// }
export class SearchBar extends PureComponent<any, any> {
  state = {
    textInput: ''
  };

  handleChange = (evt: any): void => {
    evt.preventDefault();
    this.setState({ textInput: evt.target.value }, () => this.props.searchMovies(this.state.textInput));
  }

  handleFocus = (evt: any): void => {
    evt.preventDefault();
    this.setState({ textInput: ''});
  }
  render() {
    return (
      <input 
        style={styles}
        className='form-control'
        type='text'
        placeholder='Search Movies'
        value={this.state.textInput}
        onChange={this.handleChange}
        onMouseLeave={this.handleFocus}/>
    )
  }
}