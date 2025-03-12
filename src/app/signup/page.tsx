"use client"
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function Home() {
    const { mode } = useTheme();

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Form submitted:', registerData);
    };

    return (
        <div className={`h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
            <main className="p-8 flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-4">Register to BlogSphere</h1>

                <form onSubmit={handleSubmit} className={`flex flex-col gap-4 p-4 rounded-md lg:w-[30%] md:w-[40%] w-full ${mode === 'light' ? 'bg-gray-100 border border-gray-300' : 'bg-gray-800 border border-gray-700'}`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={registerData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={registerData.email}
                            onChange={handleChange}
                            placeholder="email@youremail.com"
                            className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="**********"
                            className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
                            required
                        />
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <button
                            type="submit"
                            className={`cursor-pointer p-2 rounded-md ${mode === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800'} text-white px-6`}
                        >
                            Submit
                        </button>
                        <Link href="/login" className="text-sm text-blue-500 hover:underline">Already have an account?</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}
