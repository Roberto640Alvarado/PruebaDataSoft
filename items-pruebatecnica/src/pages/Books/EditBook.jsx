import Navbar from "../../components/Nabvar/Navbar"
import { useState, useEffect } from "react";
import context from "../../Context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../../services/BookService";

const EditBook = () => {
    const navigate = useNavigate();
  const [imagenUrl, setImagenUrl] = useState('');
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [imagenUrl1, setImagenUrl1] = useState('');

  const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = context.getToken();
                const bookData = await bookService.getById(token, id);
                setImagenUrl(bookData.image);
                setName(bookData.name);
                setSummary(bookData.summary);
                setPrice(bookData.price);
                setState(bookData.state);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setImagenUrl(imagenUrl1);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImagenUrl1(url);
    setImagenUrl(url);
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    
    try {
      const token = context.getToken();
      const newData = {
        name,
        summary,
        price,
        image: imagenUrl,
      };

      const updatedBook = await bookService.updateBook(token, id, newData);

      // Manejar la respuesta del servidor (updatedBook)
      console.log("Libro actualizado:", updatedBook);

      // Redirigir a la página de inicio después de la actualización
      navigate('/Home');
    } catch (error) {
      // Manejar errores
      console.error("Error al actualizar el libro:", error);
    }
  };

  const handleCancel = () => {
    navigate('/Home');
  };


    return (
        <div>
            <Navbar/>
            <section className='bg-white dark:bg-gray-900'>
                <div className='container px-6 py-10 mx-auto'>
                    <h1 className='text-base md:text-2xl font-bold text-black capitalize lg:text-4xl dark:text-white text-center'>
                        Editar Libro
                    </h1>

                    <div className='mt-3 lg:mt-8 flex flex-col items-center lg:flex lg:flex-row lg:items-start'>
                        {imagenUrl ? (
                            <img
                                src={imagenUrl}
                                alt='Preview'
                                className='w-2/3 lg:mx-6 xl:w-1/3 h-5/6 lg:h-1/2 lg:w-1/2 xl:h-full rounded-xl object-cover'
                            />
                        ) : (
                            <form onSubmit={handleUrlSubmit} className="flex justify-center items-center">
                                <label
                                    className='cursor-pointer flex flex-col p-10 lg:p-24 lg:mt-24 xl:mt-24 items-center rounded-xl border-2 border-dashed border-blue-400 bg-white xl:p-32 text-center'
                                >
                                    <div className='text-center'>
                                        <input
                                            id='image-url'
                                            type='text'
                                            className='h-20 w-80 lg:w-96 p-4 text-2xl font-bold bg-gray-100 rounded-xl'
                                            placeholder='Pega la URL de la imagen aquí'
                                            value={imagenUrl1}
                                            onChange={handleImageUrlChange}
                                        />
                                    </div>

                                    <button type='submit' className='mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg'>
                                        Mostrar imagen
                                    </button>
                                </label>
                            </form>
                        )}

                        <div className='mt-6 lg:w-1/2 lg:mt-0 lg:mx-6'>
                            <div className='mb-6 pl-2 lg:pl-0'>
                                <label className='text-base block lg:ml-0 mb-2 font-extrabold lg:text-lg' for="">Titulo del libro</label>
                                <input className='inline-block w-80 lg:w-5/6 p-2 leading-6 text-lg font-normal bg-white shadow border-2 border-gray rounded' type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-6 pl-2 lg:p-0'>
                                <label className='block text-base mb-2 font-extrabold lg:text-lg' for="">Resumen</label>
                                <textarea className='inline-block lg:ml-0 w-80 lg:w-5/6 p-2 leading-6 text-lg font-normal bg-white shadow border-2 border-gray rounded' type="text"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)} />
                            </div>
                            <div className='-mx-3 flex lg:flex-nowrap lg:flex-row flex-col' >
                                <div className='w-full px-3 sm:w-auto'>
                                    <div className='mb-5 pl-2 lg:pl-0'>
                                        <label
                                            for="date" pt-20 pr-20 bg-blue
                                            className='mb-3 block text-base font-extrabold text-black'>Precio:</label>
                                        <input
                                            type="number"
                                            name="number"
                                            id="number"
                                            value={price}
                                            onChange={(e) => (setPrice.target.value)}
                                            className='lg:w-xl rounded-md border-gray bg-white shadow border-2 py-2 px-2 lg:py-3 lg:px-6 text-base font-normal 
                                        text-black outline-none focus:border-black focus:shadow-md' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-start  lg:mx-0 gap-5 lg:flex-col '>
                                <button  type="submit" onClick={handleEditBook}  className='lg:ml-0 lg:hidden py-4 px-4  lg:px-5 lg:py-3 bg-orange rounded-2xl
                            font-extrabold text-white capitalize
                            focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base  lg:w-24' >Guardar Cambios</p>
                                </button>

                                <button  type="submit" onClick={handleCancel}  className='lg:ml-0 py-4 px-4 lg:hidden lg:px-5 lg:py-3 bg-blue rounded-2xl
                            font-extrabold text-white capitalize
                            focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base  lg:w-24' >Cancelar</p>
                                </button>
                            </div>
                            <div className='lg:flex hidden lg:flex-row justify-center  gap-2 lg:gap-5 lg:pt-3 lg:mr-52 '>
                                <button onClick={handleEditBook} type="submit" className='ml-14 px-3 lg:px-5 mt-5 lg:py-3 lg:w-32 bg-orange rounded-2xl
                    font-extrabold text-black capitalize
                    focus:outline-none hover:shadow-none'>
                                    <p className='lg:w-auto text-xs lg:text-base'>Guardar Cambios</p>
                                </button>
                                <button  type="submit" onClick={handleCancel} className='py-3 px-5 lg:px-5 mt-5 lg:py-3 lg:w-32 bg-blue rounded-2xl
                    font-extrabold text-white capitalize
                    focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base'>Cancelar</p>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditBook;