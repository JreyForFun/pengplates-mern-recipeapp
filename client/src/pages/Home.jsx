import React, { useEffect, useState } from "react";

export const Home = () => {
    const [recipes, setRecipe] = useState([]);
    const [category, setCategory] = useState('All');

    const categories = [
        "All",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack"
    ];

    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await axios.get(
                `/api/recipes${category && category !== "All" ? `?category=${category}` : ""}`
              );
            if(res.data)
            setRecipes(res.data.recipe)              
        };
        fetchRecipe();
    }, [category])

    return <div className="max-w-7xl mx-auto p-4">
        <div>
            {categories.map((cat) => {
                <button className={`px-4 py-2 rounded-full text-sm font-medium ${
                    category === cat ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover: bg-gray-300"
                }`} key={cat}>
                    {cat}
                </button>
            })}
        </div>
    </div>
}