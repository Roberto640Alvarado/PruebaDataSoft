import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookDetailsModal from "../Modal/BookDetailsModal";

export const CardHome = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEvent = () => {
    setIsModalOpen(true);
  };

  const handleEditEvent = () => {
    navigate(`/EditBook/${props.id}`);
  };

  const closeModal = () => {
    // Cierra el modal
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2">
        <img
          className="w-full h-32 object-cover object-center rounded-t-lg"
          src={props.imagen}
          alt="Artista"
        />

        <div className="bg-blue h-15 flex flex-col justify-center items-center">
          <h2 className="text-white font-bold text-2xl">{props.name}</h2>
          <h2 className="text-white font-bold text-xl">${props.price}</h2>

          <div className="mt-4">
            <button
              onClick={handleViewEvent}
              className="bg-green-500 text-white py-1 px-4 mr-2 rounded"
            >
              Ver
            </button>
            <button
              onClick={handleEditEvent}
              className="bg-green-500 text-white py-1 px-4 rounded"
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      <BookDetailsModal
        bookId={props.id} 
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default CardHome;
