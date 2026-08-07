import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
    <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            <Link to="/">
                <h1>Recipes</h1>
            </Link>
            <div className="flex gap-x-4">
                <Link to="/favorites">
                    <button className="cursor-pointer">Favorites</button>
                </Link>

                <Link to="/login">
                    <button className="cursor-pointer">Login</button>
                </Link>

                <Link to="/register">
                    <button className="cursor-pointer">Register</button>
                </Link>  
            </div>
        </div>
    </nav>
    )
}

export default Navbar