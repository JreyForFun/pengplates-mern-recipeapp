import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true,
    },
    ingredients: {
        type: string,
        required: true,
    },
    instructions: {
        type: string,
        required: true
    },
    category: {
        type: string,
        required: true,
    },
    photoUrl: {
        type: string,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe