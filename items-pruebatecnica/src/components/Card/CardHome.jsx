import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const CardHome = (props) => {
    const navigate = useNavigate();


    const handleViewEvent = () => {
        //navigate(`/admin/graphEvent/${props.id}`);

    }

    return (
        <>
            <div onClick={handleViewEvent} className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2">
                <img
                    className="w-full h-32 object-cover object-center rounded-t-lg"
                    src={props.imagen}
                    alt="Artista"
                />

                <div className="bg-blue h-15 flex flex-col justify-center items-center">
                    <h2 className="text-white font-bold text-2xl">{props.name}</h2>
                    <h2 className="text-white font-bold text-xl">{props.price}</h2>

                    <div className="mt-4">
                        <button className="bg-green-500 text-white py-1 px-4 mr-2 rounded">Ver</button>
                        <button className="bg-green-500 text-white py-1 px-4 rounded">Editar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardHome;