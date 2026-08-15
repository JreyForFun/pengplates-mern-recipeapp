import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext());
    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
    <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            <Link to="/">
                <h1>Recipes</h1>
            </Link>
            <div className="flex gap-x-4">
                {user ? (
                    <>
                    <Link to="/favorites">
                        <button className="cursor-pointer">Favorites</button>
                    </Link>
                    <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                <Link to="/login">
                    <button className="cursor-pointer">Login</button>
                </Link>
                <Link to="/register">
                    <button className="cursor-pointer">Register</button>
                </Link>
                </>
                )} 
            </div>
        </div>
    </nav>
    )
}

export default Navbar