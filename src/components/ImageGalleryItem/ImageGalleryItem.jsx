import React from 'react';

export const ImageGalleryItem = ({ image, showModal }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => showModal(image.largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.pageURL}
      />
    </li>
  );
};
