import axios from "axios"; 

const BASE_URL = "http://localhost:8080/user";

const API = axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
);

const authService = {

    login: async (identifier, password) => {
        let payload = { identifier: identifier, password: password };
        try {

            let response = await API.post('/login', payload);
            if (response.status === 200) {
                return response.data;
                console.log(response.data);
            } else {
                throw new Error(response.status);
            }

        } catch (error) {
            console.log(error);
            return {
                hasError: true,
            };
        }

    }

}

export default authService;