import express, {Router} from 'express';
import Recipe from '../models/Recipe';

const recipeRouter = Router();

recipeRouter.post('/', async(req,res) => {
    const {title, ingredients, instructions, category, photoUrl, cookingTime} = req.body;

    try {
        if(!title || !ingredients || !instructions || !category || !photoUrl || !cookingTime){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }
        const recipe = await Recipe.create({
            title, 
            ingredients, 
            instructions, 
            category, 
            photoUrl, 
            cookingTime
        })

        res.status(201).json({
            success: true,
            data: recipe
        })
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
});

recipeRouter.get('/', async (req, res) => {
    const {category} = req.query;
    try{
        const query = category ? {category} : {};
        const recipe = await Recipe.find(query);
        res.status(200).json({success: true, data: recipe})
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})