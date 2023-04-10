import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const per_page = 4;

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const [isModal, setIsModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (search !== '') {
      setImages([]);
      setPage(1);
      loadImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (page !== 1) {
      loadImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async (search, page) => {
    try {
      const response = await axios.get(
        `?key=33188868-874ed4f4ba7cc47db513adf3f&q=${search}&per_page=${per_page}&page=${page}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const loadImages = () => {
    setIsLoading(true);

    setTimeout(() => {
      fetchImages(search, page)
        .then(response=> {
          setImages([...images, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }, 1000);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = event.target.input.value;
    form.reset();
    setSearch(input);
  };

  const showModal = event => {
    setIsModal(true);
    setModalImage(event)
  };

  const hideModal = event => {
    setIsModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <div>
        <ImageGallery images={images} showModal={showModal} />
        {isLoading && <Loader />}
        {images.length > 0 &&
          images.length < totalHits &&
          isLoading === false && (
            <Button handleLoadMore={handleLoadMore} />
          )}
      </div>
               {isModal && (
          <div className='Modal'>
          <Modal
            isModal={isModal}
            modalImage={modalImage}
            hideModal={hideModal}
          />
          </div>
        )} 
    </div>
  );
};
