import React from 'react';

export const Button = ( {handleLoadMore} ) => {

  return (
    <div className='Button-more'>
      <button className="Button" onClick={handleLoadMore}>Load More</button>
    </div>
  );
}
