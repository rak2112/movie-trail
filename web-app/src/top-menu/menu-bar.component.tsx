import React, { PureComponent } from 'react';
// import { Link } from 'react-router';

// import { MenuItemComponent } from './menu-item';
import { MenuBarProps } from './dashboard.container';
import { MenuItemsComponent } from './menu-items.components';


export class MenuBar extends PureComponent <MenuBarProps, any> {

  render() {
    return (
      <MenuItemsComponent {...this.props}/>
    )
  }
};

 {/* const MenuBars = ({data, movieToFind, clickHandler, moviesFound, onFocusOut}) => {
//     const hasMovies = moviesFound;
//     return (
//     <div className="menu-Items">
//       <nav className="navbar navbar-inverse">
//         {
//           data.map((menu)=>{
//             return <MenuItem menu={menu} key={menu.id} />;
//           })
//         }
//       </nav>
//       <div className="container search-container">
//         <span className="fa fa-search"/>
//         <input
//           className="form-control"
//           placeholder="Search for movies"
//           type="text"
//           value={movieToFind}
//           onChange={clickHandler}/>
//       </div>
//       {
//         hasMovies.length > 0 &&
//         <div className="movies-found" onMouseLeave={onFocusOut}>
//           {
//             moviesFound.map((movie)=> {
//             return (
//               <div key={movie.id} className="details">
//                 <Link to={{pathname: '/movieDetails/'+ movie.id }}>
//                   <img src={'https://image.tmdb.org/t/p/w45_and_h67_bestv2'+movie.poster_path} alt="MP" />
//                   <div>
//                     <span>{movie.title}</span>
//                     <span>{movie.releaseYear}</span>
//                   </div>
//                 </Link>
//               </div>
//             );
//             })
//           }
//         </div>
//       }
//     </div>
//   );
// };
 */}
