import express, {Router} from 'express';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import { protect } from '../middlewares/auth.middleware.js';

const recipeRouter = Router();

// CREATE RECIPE

recipeRouter.post('/', protect, async(req,res) => {
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
            cookingTime,
            createdBy: req.user._id
        })

        res.status(201).json({
            success: true,
            recipe
        })
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
});


// GET ALL RECIPE

recipeRouter.get('/', async (req, res) => {
    const {category} = req.query;
    try{
        const query = category ? {category} : {};
        const recipe = await Recipe.find(query);
        res.status(200).json({success: true, recipe})
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

// SEARCH RECIPE

recipeRouter.get('/:id', async (req,res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            })
        }
        res.status(200).json({
            success: true,
            recipe
        })
    } catch (e) {
        res.status(500).json({
            success: false, 
            message: "Server error"
        })
    }
})

// UPDATE RECIPE

recipeRouter.put('/:id', protect, async (req,res) => {
    const {title, ingredients, instructions, category, photoUrl, cookingTime} = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({
                success:false,
                message: "Recipe not found"
            })
        }

        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.category = category || recipe.category;
        recipe.photoUrl = photoUrl || recipe.photoUrl;
        recipe.cookingTime = cookingTime || recipe.cookingTime;

        const updatedRecipe = await recipe.save();
        res.status(201).json({
            success: true,
            updatedRecipe
        })
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

// DELETE RECIPE

recipeRouter.delete('/:id', protect, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if(!recipe){
            return res.status(404).json({
                success:false,
                message: "Recipe not found"
            })
        }

        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({success: false, message: "Not authorized"})
        }

        await recipe.deleteOne();
        res.status(200).json({
            success: true, message: "Recipe deleted"
        })
    } catch (e) {
        res.status(500).json({ success: false, message: "Server error" });

    }
}) 


// ADD AND DELETE FAVOURITES RECIPE

recipeRouter.post('/:id/favorite', protect, async(req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
        // Prevent duplicates
        if (user.favorites.includes(recipeId)) {
          return res.status(400).json({ success: false, message: "Recipe already in favorites" });
        }
    
        user.favorites.push(recipeId);
        await user.save();
    
        res.status(200).json({ success: true, message: "Recipe added to favorites", favorites: user.favorites });
      } catch (e) {
        res.status(500).json({ success: false, message: "Server error" });
      }
})

recipeRouter.delete("/:id/favorite", protect, async (req, res) => {
    try {
      const recipeId = req.params.id;
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      const index = user.favorites.indexOf(recipeId);
      if (index === -1) {
        return res.status(400).json({ success: false, message: "Recipe not in favorites" });
      }
  
      user.favorites.splice(index, 1);
      await user.save();
  
      res.status(200).json({ success: true, message: "Recipe removed from favorites", favorites: user.favorites });
    } catch (e) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

export default recipeRouter;