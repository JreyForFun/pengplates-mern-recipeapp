import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            axios.get('/api/auth/me').then((res) => {
                setUser(res.data.user)
            })
            console.log(user)
        }
    }, [])

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', {
            email,
            password
        })

        localStorage.setItem("token", res.data.user.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.user.token}`
        setUser(res.data.user)
    }

    const register = async (username, email, password) => {
        const res = await axios.post('/api/auth/register', {
            username, email, password
        })
        localStorage.setItem("token", res.data.user.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.user.token}`
        setUser(res.data.user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,login,register,logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}