import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import bookService from '../../services/BookService';
import context from '../../Context/UserContext';
import '../../index.css';

const BookDetailsModal = ({ bookId, isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const token = context.getToken();

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        const bookData = await bookService.getById(token, bookId);
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    if (isOpen && bookId) {
      fetchBookById();
    }
  }, [isOpen, bookId, token]);

  const handleGoBack = () => {
    onRequestClose();
    navigate('/Home');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex justify-center items-center h-full">
        <div className="max-w-2xl w-full p-4 border border-gray-300 shadow-lg rounded-lg bg-white">
          <div className="flex">
            <div className="w-1/3 pr-4">
              <img
                className="w-full h-auto object-cover rounded"
                src={book?.image || 'fuente_de_la_imagen.jpg'}
                alt={book?.name || 'Nombre del Libro'}
              />
            </div>

            <div className="w-2/3">
              <h2 className="text-2xl font-bold mb-4">Nombre del Libro: {book?.name || ''}</h2>
              <p className="text-gray-800 mb-4">Resumen: {book?.summary || ''}</p>
              <p className="text-gray-800 mb-4">Precio: ${book?.price || 0}</p>
              <p className="text-gray-800 mb-4">Estado: {book?.state ? 'Disponible' : 'No disponible'}</p>
              <p className="text-gray-800 mb-4">Genero: {book?.generes.name}</p>  

              <button
                onClick={handleGoBack}
                className="bg-blue text-white py-2 px-4 rounded"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookDetailsModal;


