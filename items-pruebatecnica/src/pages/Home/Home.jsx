import React, { useState, useEffect } from "react";
import Navbar from "../../components/Nabvar/Navbar";
import genereService from "../../services/GenereService";
import bookService from "../../services/BookService";
import context from "../../Context/UserContext";
import CardHome from "../../components/Card/CardHome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../index.css'

const Home = () => {
  const [generes, setGeneres] = useState([]);
  const [selectedGenere, setSelectedGenere] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = context.getToken();
        const generesData = await genereService.getAll(token);

        console.log("Generes Data:", generesData);
        setGeneres(generesData);

        if (selectedGenere == null) {
            const allBooksData = await bookService.getAll(token,"");
            console.log("All Books Data:", allBooksData);
            setBooks(allBooksData);
          } else {
            const booksData = await bookService.getAll(token, selectedGenere);
            console.log("Books Data:", booksData);
            setBooks(booksData);
          }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedGenere]); 

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleViewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenereClick = async (genereName) => {
    try {
      const token = context.getToken();

      // Actualizar libros para el nuevo género seleccionado
      const booksData = await bookService.getAll(token, genereName);
      console.log("Books Data:", booksData);
      setBooks(booksData);

      // Actualizar el estado del género seleccionado
      setSelectedGenere(genereName);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`flex ${isModalOpen ? 'modal-open' : ''}`}>
        {/* Parte Izquierda */}
        <div className="w-1/4 p-4 bg-blue-200 flex flex-col bg-green-200">
          <h2 className="text-lg font-bold mb-4">Selecciona un Genero</h2>
          {generes.map((genere) => (
            <button
              key={genere.id}
              className={`font-bold text-white py-2 px-4 mb-2 rounded ${
                genere.name === selectedGenere ? "bg-blue-500" : "bg-orange"
              }`}
              onClick={() => handleGenereClick(genere.name)}
            >
              {genere.name}
            </button>
          ))}
        </div>

        {/* Parte Derecha */}
        <div className="flex-1 p-4 ">

        <div className="flex items-center justify-center bg-gray-300 rounded-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64 md:w-96 sm:w-72 lg:w-[50vw] px-4 py-2 rounded-l-full bg-[#E9E8E6] focus:outline-none"
              placeholder="Buscar..."
            />
            <button className="p-2 w-12 rounded-r-full bg-[#D9D9D9]">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>


          <h2 className="text-lg font-bold mb-4">Todos los Libros</h2>
          <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center mt-10 mx-auto max-w-7xl px-4">

            {books.map((book) => (
                <CardHome
                    key={book.id}
                    id={book.id}
                    imagen={book.image}
                    name={book.name}
                    price={book.price}
                />
                ))}
            )

          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;



