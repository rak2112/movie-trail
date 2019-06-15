import React, { memo } from 'react';
import { AddRemoveProps } from './addRemoveFavs';

export const AddRemoveWatchList = memo(({inWatch, onClick}: AddRemoveProps) => {

  return (
    <a title="Add remove From watch list"
      className="remove-from-watchlist"
      onClick={onClick}>
      <span className={`glyphicon glyphicon-bookmark ${(inWatch) ? '' : 'add-to-list'} `}/>
    </a>
  );
});
