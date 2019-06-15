import React, { memo } from 'react';

export interface AddRemoveProps {
  favorite?: boolean;
  inWatch?: boolean;
  onClick: ()=> void;
}

export const AddRemoveFavorite = memo(({favorite, onClick}: AddRemoveProps) => {

  return (
    <a title="Add remove From Favorites"
      className="remove-from-favorites"
      onClick={onClick}>
      <span className={`glyphicon glyphicon-heart ${(favorite) ? '' : 'add-to-list'} `}/>
    </a>
  );
});