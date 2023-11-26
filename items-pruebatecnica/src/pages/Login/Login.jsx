import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../Context/UserContext';


const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    let response = await context.login(username, password);
    
    navigate('/Home');


  };


  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#232528] to-blue-200">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <div>
            <h2 className="text-[#062343] font-poppins font-medium text-3xl md:text-4xl text-center mb-4">Bienvenidos/as</h2>
          </div>
          <div className="flex justify-center mt-8">
          </div>
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center">
              <div className="flex-grow border-b border-gray-300 w-2/5" />
              <p className="mx-2 text-gray-500 font-poppins">or</p>
              <div className="flex-grow border-b border-gray-300 w-2/5" />
            </div>
          </div>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-gray bg-clip-padding py-2 pr-3 pl-10 mt-2 text-gray-900 placeholder-gray-500 text-md focus:outline-none"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-3 text-neutral-500 text-lg"
            />
          </div>
          <div className="relative mt-4 rounded shadow-sm">
            <input
              type="password"
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-gray bg-clip-padding py-2 pr-3 pl-10 mt-2 text-gray-900 placeholder-gray-500 text-md focus:outline-none"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faKey}
              className="absolute left-3 top-3 text-neutral-500 text-lg"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-[#A5BFF7] to-[#536bcc] w-full py-3 rounded text-white text-xl font-semibold focus:outline-none"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
