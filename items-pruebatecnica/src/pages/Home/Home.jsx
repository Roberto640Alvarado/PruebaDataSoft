import React, { useState, useEffect } from "react";
import Navbar from "../../components/Nabvar/Navbar";
import genereService from "../../services/GenereService";
import bookService from "../../services/BookService";
import context from "../../Context/UserContext";
import CardHome from "../../components/Card/CardHome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../index.css';

const Home = () => {
  const [generes, setGeneres] = useState([]);
  const [selectedGenere, setSelectedGenere] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = context.getToken();
        const generesData = await genereService.getAll(token);
        setGeneres(generesData);

        if (selectedGenere == null) {
          const allBooksData = await bookService.getAll(token, "");
          setBooks(allBooksData);
        } else {
          const booksData = await bookService.getAll(token, selectedGenere);
          setBooks(booksData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedGenere]);

  const handleSearch = async () => {
    try {
      console.log(searchTerm);
      const token = context.getToken();
      const result = await bookService.searchByName(token, searchTerm);

      console.log(result);

      if (result) {
        setSearchResult(result);
        console.log(result);
      } else {
        setSearchResult(null);
        console.log(searchResult);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResult(null);
    }
  };

  const handleGenereClick = async (genereName) => {
    try {
      const token = context.getToken();
      const booksData = await bookService.getAll(token, genereName);
      setBooks(booksData);
      setSelectedGenere(genereName);
      setSearchResult(null);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Navbar />
      <div className={`flex ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="w-1/4 p-4 bg-blue-200 flex flex-col bg-green-200">
          <h2 className="text-lg font-bold mb-4">Selecciona un Género</h2>
          {generes.map((genere) => (
            <button
              key={genere.id}
              className={`font-bold text-white py-2 px-4 mb-2 rounded ${genere.name === selectedGenere ? "bg-blue-500" : "bg-orange"
                }`}
              onClick={() => handleGenereClick(genere.name)}
            >
              {genere.name}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 ">
          <div className="flex items-center justify-center bg-gray-300 rounded-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 md:w-96 sm:w-72 lg:w-[50vw] px-4 py-2 rounded-l-full bg-[#E9E8E6] focus:outline-none"
              placeholder="Buscar..."
            />
            <button
              onClick={handleSearch}
              className="p-2 w-12 rounded-r-full bg-[#D9D9D9]"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              onClick={handleClear}
              className="p-2 ml-2 rounded-r-full bg-[#D9D9D9]"
            >
              Limpiar
            </button>
          </div>

          <h2 className="text-lg font-bold mb-4">Resultados de la Búsqueda</h2>

          {searchTerm.trim() === "" ? (
            <p className="text-lg font-bold mb-4">Realiza una búsqueda para ver resultados</p>
          ) : searchResult !== null && !searchResult.hasError ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center mt-10 mx-auto max-w-7xl px-4">
              <CardHome
                key={searchResult.id}
                id={searchResult.id}
                imagen={searchResult.image}
                name={searchResult.name}
                price={searchResult.price}
              />
            </div>
          ) : (
            <p className="text-lg font-bold mb-4">Libro no encontrado</p>
          )}

          <h2 className="text-2xl font-bold mb-4 text-center">Todos los Libros</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center mt-10 mx-auto max-w-7xl px-4">
            {books.map((book) => (
              <CardHome
                key={book.id}
                id={book.id}
                imagen={book.image}
                name={book.name}
                price={book.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




