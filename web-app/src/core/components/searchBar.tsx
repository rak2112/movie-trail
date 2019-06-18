import React, { useRef, useState } from 'react';
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
// export class SearchBar extends PureComponent<any, any> {
//   state = {
//     textInput: ''
//   };

//   handleChange = (evt: any): void => {
//     evt.preventDefault();
//     this.setState({ textInput: evt.target.value }, () => this.props.searchMovies(this.state.textInput));
//   }

//   handleFocus = (evt: any): void => {
//     evt.preventDefault();
//     this.setState({ textInput: ''});
//   }
//   render() {
//     return (
//       <input 
//         style={styles}
//         className='form-control'
//         type='text'
//         placeholder='Search Movies'
//         value={this.state.textInput}
//         onChange={this.handleChange}
//         onMouseLeave={this.handleFocus}/>
//     )
//   }
// }

export const SearchBar = ({ onSearch }: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (evt: any): void => {
    evt.preventDefault();
    setSearchTerm(evt.target.value);
    onSearch(evt.target.value);
  }

  const handleFocus = (evt: any): void => {
    evt.preventDefault();
    setSearchTerm('');
  }

  return (
    <input 
      style={styles}
      className='form-control'
      type='text'
      placeholder='Search Movies'
      value={searchTerm}
      onChange={handleChange}
      onMouseLeave={handleFocus}/>
  )
}
