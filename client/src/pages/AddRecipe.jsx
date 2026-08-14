import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddRecipe = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: [''],
        instructions: '',
        category: '',
        photoUrl: '',
        cookingTime: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleIngredientsChange = (index, value) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index] = value;
        setFormData({ ...formData, ingredients: updatedIngredients });    };

    const addIngredients = () => {
        const lastIngredients = formData.ingredients[formData.ingredients.length - 1];
        if (lastIngredients.trim() !== '') {
            setError('');
            handleInputChange("ingredients", [...formData.ingredients,""]);        
        } else {
            setError('Please enter an ingredient');
        }
    }

    const removeIngredients = (index) => { 
        if(formData.ingredients.length > 1) {
            const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
            handleInputChange("ingredients", updatedIngredients)
            const lastIngredients = formData.ingredients[formData.ingredients.length - 1];
                if(error && lastIngredients.trim() !== ""){
                    setError("")
            }
        } 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true)

        try {
            await axios.post('/api/recipes', {
                title: formData.title,
                ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
                instructions: formData.instructions,
                category: formData.category,
                photoUrl: formData.photoUrl,
                cookingTime: formData.cookingTime ? Number(formData.cookingTime) : undefined
            })
            navigate('/')
        } catch (e) {
            setError('Failed to add recipe')
            console.error(e)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='max-w-2xl mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Add Recipe</h1>
            {error && <p className='text-red-500'>{error}</p>}
            {loading && <p className='text-green-500'>Loading...</p>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>

                {/*TITLE INPUT*/}
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='title' className='text-sm font-medium'>Title</label>
                    <input type='text' required id='title' name='title' value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} 
                    className="w-full p-2 border rounded" />
                </div>

                {/*INGREDIENTS INPUT*/}
                <div>
                    <label htmlFor='ingredients' className='text-sm font-medium'>Ingredients</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input type='text' required value={ingredient} onChange={(e) => handleIngredientsChange(index, e.target.value)} 
                            className="w-full p-2 border rounded" placeholder={`Ingredient ${index + 1}`} />
                            {formData.ingredients.length > 1 && (
                                <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeIngredients(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))} <br />
                    <button type='button' onClick={addIngredients} className='text-black p-2 hover:underline cursor-pointer'>Add Ingredient</button>
                </div>

                {/* INSTRUCTION INPUT*/}
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='instructions' className='text-sm font-medium'>Instructions</label>
                    <textarea type='text' 
                    id='instructions' 
                    name='instructions' 
                    value={formData.instructions} 
                    onChange={(e) => handleInputChange('instructions', e.target.value)} 
                    className="w-full p-2 border rounded" />
                </div>

                {/* CATEGORY INPUT*/}
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='category' className='text-sm font-medium'>Category</label>
                    <select onChange={(e) => handleInputChange("category", e.target.value)} 
                    value={formData.category}
                    className="w-full p-2 border rounded"
                    required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                {/* PHOTO INPUT*/}
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='photoUrl' className='text-sm font-medium'>Photo URL</label>
                    <input type='text' id='photoUrl' name='photoUrl' value={formData.photoUrl} onChange={(e) => handleInputChange('photoUrl', e.target.value)} 
                    className="w-full p-2 border rounded" placeholder='url' required/>
                </div>

                {/* COOKING TIME INPUT*/}
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='cookingTime' className='text-sm font-medium'>Cooking Time (minutes)</label>
                    <input type='number' id='cookingTime' name='cookingTime' value={formData.cookingTime} onChange={(e) => handleInputChange('cookingTime', e.target.value)} 
                    className="w-full p-2 border rounded" placeholder="e.g., 30" required min={0} />
                </div>


                {/* SUBMIT BUTTON */}
                <button disabled={loading} type='submit' className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed": ""}`}>
                    {loading ? "Adding..." : "Add Recipe"}
                </button>
            </form>
        </div>
    )
}

