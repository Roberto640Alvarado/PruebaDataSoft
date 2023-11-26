import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import EditBook from "../pages/Books/EditBook";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/EditBook/:id" element={<EditBook />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;