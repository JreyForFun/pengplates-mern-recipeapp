import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



export const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null)
    const {user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await axios.get(`/api/recipes/${id}`)
            setRecipe(res.data.recipe)
        }
        fetchRecipe();
    }, [id])

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/recipes/${id}`)
            navigate('/')
        } catch (e) {
            console.error('Error deleting', e)
        }
    }

    if(!recipe) return <div>Loading...</div>
    return ( 
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            {recipe.photoUrl && (
                <img 
                    src={recipe.photoUrl} 
                    alt={recipe.title}
                    className="w-full h-96 object-cover rounded-lg mb-4" />
            )}
            <h1 className="text-3xl capitalize font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-600 mb-4">Category: {recipe.category}</p>
            <p className="text-gray-600 mb-4">Cooking Time: {recipe.cookingTime}</p>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="pl-6 mb-4 list-disc">
                {recipe.ingredients.map((ingrediets, index) => (
                    <li key={index}>{ingrediets}</li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2">Instruction</h2>
            <p className="text-gray-700 mb-4">{recipe.instructions}</p>
            {user && user._id  === recipe.createdBy && (
                <div className="flex space-x-4 ">
                    <Link to={`/edit-recipe/${id}`}>
                    <button className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 cursor-pointer">Edit</button>
                    </Link>
                    
                    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer">Delete</button>
                </div>
            )}
            {user && user._id !== recipe.createdBy && (
                <p>Created by {recipe.createdBy}</p>
            )}
        </div>
    )
};
