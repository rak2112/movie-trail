import React from 'react';
import { Genre, Language, Movie } from '../../core/interfaces';
import { paths } from '../../core/utils';

export const Details = ({
  backdrop_path,
  homepage,
  genres,
  overview,
  poster_path,
  runtime,
  release_date,
  status,
  spoken_languages,
  title,
  vote_average
}: Movie ) => {
  return (
      <>
        <div className="main-img">
          <img src={`${paths.imgPath500}${poster_path}`} alt="Main Movie Image"/>
        </div>
        <div className="movie-details">
          <div className="genres">
          <span className="glyphicon glyphicon-film"/>
            {
              genres.map((genre: Genre, index: number) => <span key={index}> {genre.name} |</span>)
            }
          </div>
          <div className="overview">
            <h3>{ title }</h3>
            <p>{ overview }</p>
            <div className="attributes">
              <div>
              <span className="glyphicon glyphicon-star"/>
                <span className="attr">
                  {vote_average}
                </span>
              </div>
              <div><span className="glyphicon glyphicon-film" /><span className="attr">{status}</span></div>
              <div><span className="glyphicon glyphicon-time" /><span className="attr">{runtime} mins</span></div>
              <div><span className="glyphicon glyphicon-calendar" /><span className="attr">{release_date}</span></div>
            </div>
            <div>
              <div className="attributes">
                <span className="glyphicon glyphicon-subtitles" />
                {
                  spoken_languages.map((lang: Language, index: number) => 
                    <span key={index} className="attr">{lang.name}</span>)
                }
              </div>

              { 
               homepage &&
                <div>
                  <span className="glyphicon glyphicon-home" />
                  <a href={homepage} target="_blank">{title}</a>
                </div>
              }
            </div>
          </div>
          
        </div>
      </>
  );
}
