import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Searchbar from "../SearchBar/SearchBar";
import {ToastContainer} from 'react-toastify';
import getImages from "components/Servise/Api";
import Button from "../Button/Button";
import Loader from "components/Loader/Loader";

function App() {  

  const [query, setQuery] = useState('');
  const [modalImg, setModalImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    if(!query) return;
    setLoading(true); 
      getImages(query, page)
      .then(({totalHits, hits}) => {
        setImages(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits/12));
      })
      .catch (error => setError(error.message))
      .finally (setLoading(false));
  }, [query, page]);

 const handleSubmit = handleValue => {
  setQuery(handleValue);
  setPage(1);
  setImages([]);
  setShowBtn(false);
  }

 const toggleModal = () => {
    setShowModal(!showModal);
  }

 const getLargeImg = url => {
    setModalImg(url);
    toggleModal();
  }

 const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  }
      return (
        <>
         <Searchbar query={query} onSubmit={handleSubmit}/>
        <ToastContainer autoClose={3000} />  
        <ImageGallery images={images} onClick={getLargeImg} />
        {showModal && <Modal url={modalImg} onClose={toggleModal} />}
        {loading && <Loader />}
        {showBtn && <Button onClick={loadMoreBtn}/> }
        {error && <h1> {error.message} </h1>}
        </>
      )
}

export default App;
