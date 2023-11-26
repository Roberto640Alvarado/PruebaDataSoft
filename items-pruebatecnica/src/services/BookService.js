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
    }
}

export default bookService;