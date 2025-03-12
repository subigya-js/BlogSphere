"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

const page = () => {
    const { mode } = useTheme();

    const [error, setError] = useState<string | null>(null);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.status === 200) {
                setLoginData({ email: '', password: '' });
                alert("Login successful");
                // You might want to redirect to dashboard here
                // window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.');
        };
    }

    return (
        <div className={`h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
            <main className="p-8 flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-4">Login to BlogSphere</h1>

                <form onSubmit={handleSubmit} className={`flex flex-col gap-4 p-4 rounded-md lg:w-[30%] md:w-[40%] w-full ${mode === 'light' ? 'bg-gray-100 border border-gray-300' : 'bg-gray-800 border border-gray-700'}`}>
                    <div className="flex flex-col gap-2">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="email@youremail.com"
                            className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            onChange={handleChange}
                            value={loginData.email}
                            name="email"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="**********"
                            className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            onChange={handleChange}
                            value={loginData.password}
                            name="password"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                    <div className="w-full flex justify-between items-center">
                        <button
                            type="submit"
                            className={`cursor-pointer  p-2 rounded-md ${mode === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800'} text-white px-6`}
                        >
                            Submit
                        </button>
                        <Link href="/signup" className="text-sm text-blue-500 hover:underline">Don't have an account?</Link>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default page