import context from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';
const Home = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        context.logout();
        navigate('/');
    }

    return (
        <div>
            <h1>Estoy en Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;