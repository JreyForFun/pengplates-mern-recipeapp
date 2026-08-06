import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
   <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/favorites" element={ <Favorites /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> }/>
    </Routes>
    <h1>Mern Recipe App</h1>
    </AuthProvider>
  )
}

export default App
