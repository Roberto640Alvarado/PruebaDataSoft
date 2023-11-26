import axios from "axios"; 

const BASE_URL = "http://localhost:8080/books";

const API = axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
);

const bookService = {
    
    getAll: async (token, genre) => {
        try {
            const response = await API.get(`/all?genre=${genre}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
            return {
                hasError: true,
            };
        }
    },

    getById: async (token, id) => {
        try {
            const response = await API.get(`viewBook?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
            return {
                hasError: true,
            };
        }
    },
    updateBook: async (token, bookId, newData) => {
        try {
          const response = await API.put(`/update?id=${bookId}`,
            newData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 201) {
            console.log("Libro actualizado:", response.data);
            return response.data;
          } else {
            throw new Error(response.status);
          }
        } catch (error) {
          console.error("Error al actualizar el libro:", error);
          return {
            hasError: true,
          };
        }
      },
      searchByName: async (token, name) => {
        try {
          const response = await API.get(`/search?name=${encodeURIComponent(name)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 200) {
            console.log(response.data);
            return response.data;
          } else {
            throw new Error(response.status);
          }
        } catch (error) {
          console.error(error);
          return {
            hasError: true,
          };
        }
      },
}

export default bookService;