import authService from "../services/AuthServices";

const context = {
    login: (identifier, password) => {
        if (identifier.length === 0 && password === 0) return false;
    
        const asyncFetchUser = async (identifier, password) => {
        let response = await authService.login(identifier, password);
        console.log(response.token);

        if (response.hasError) return false; 
    
        if (localStorage.getItem("content")) {
            localStorage.removeItem("content");
            localStorage.removeItem("hasLoggedIn", false);
        }
    
        localStorage.setItem("content", response.token);
        localStorage.setItem("hasLoggedIn", "true");
    
            return { status: response.status};//"Logueado";
        }
        
        return asyncFetchUser(identifier, password);
    },
    logout: function() {
        localStorage.removeItem("content");
        localStorage.removeItem("hasLoggedIn");
    },
    getToken: function() {
        return localStorage.getItem("content");
    },
    isUserLogged: () => {
        return !!localStorage.getItem("hasLoggedIn")
    }
}
export default context;