import React, { useContext, useState } from "react";
import {AuthContext} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password)
            navigate('/')
        } catch (e){
            console.error('Login failed', e)
        }
    }

    return <div className=" max-w-md mx-auto p-4">
        <h1 className=" text-2xl font-bold mb-4">Login</h1>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="" className="block text-gray-700">Email</label>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
                />

                <label htmlFor="" className="block text-gray-700">Password</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
    </div>
}