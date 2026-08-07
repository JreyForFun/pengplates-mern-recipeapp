import mongoose from "mongoose";
import bcrype from 'bcryptjs';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unque: true,
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrype.hash(this.password, salt);
    next()
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;