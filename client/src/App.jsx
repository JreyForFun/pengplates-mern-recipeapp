import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { Home } from "./pages/Home"
import { Favorites } from "./pages/Favorites"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { AddRecipe } from "./pages/AddRecipe"
import { RecipeDetail } from "./pages/RecipeDetail"
import {EditRecipe} from "./pages/EditRecipe"

function App() {

  return (
   <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/favorites" element={ <Favorites /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> }/>
      <Route path="/add-recipe" element={ <AddRecipe /> }/>
      <Route path="/edit-recipe/:id" element={<EditRecipe />} />
    </Routes>
    <h1>Mern Recipe App</h1>
    </AuthProvider>
  )
}

export default App
