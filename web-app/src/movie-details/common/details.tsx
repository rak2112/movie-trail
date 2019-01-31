import React from 'react';
import { Genre, Language, Movie } from '../../core/interfaces';

export const Details = ({
  homepage,
  genres,
  overview,
  runtime,
  release_date,
  status,
  spoken_languages,
  title,
  vote_average
}: Movie ) => {
  return (
      <div className="movie-details">
        <h3>{ title }</h3>
        <p>{ overview }</p>
        <div className="attributes">
          <div>
            <span className="attr-name">Rating</span>
            <span className="attr">
              {vote_average}
              <span className="glyphicon glyphicon-star"/>
            </span>
          </div>
          <div><span className="attr-name">Status</span><span className="attr">{status}</span></div>
          <div><span className="attr-name">RunTime</span><span className="attr">{runtime} mins</span></div>
          <div><span className="attr-name">Release Date</span><span className="attr">{release_date}</span></div>
        </div>
        <div>
            <div className="attributes">
              <span className="attr-name">Language(s)</span>
              {
                spoken_languages.map((lang: Language, index: number) => 
                  <span key={index} className="attr">{lang.name}</span>)
              }
            </div>

            <div className="genres">
              {
                genres.map((genre: Genre, index: number) => <span key={index} className="btn btn-sm btn-warning"> {genre.name}</span>)
              }
            </div>
           { homepage && <div><a href={homepage} target="_blank">{title}</a></div> }
        </div>
      </div>
  );
}