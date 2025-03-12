"use client"
import React from 'react'
import { MdLightMode, MdLightbulb } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

const Navbar = () => {
    const { mode, toggleMode } = useTheme();

    return (
        <div className={`[font-family:var(--font-geist-sans)] h-[10vh] ${mode === 'light' ? 'bg-gray-300 border-b border-gray-700' : 'border-b border-gray-300 bg-gray-800'} flex items-center px-6 justify-between`}>
            <Link href="/" className={`text-lg font-semibold ${mode === 'light' ? 'text-black' : 'text-white'}`}>BlogSphere</Link>

            <button onClick={toggleMode} className='cursor-pointer'>
                {
                    mode === 'light' ? <MdLightMode size={24} /> : <MdLightbulb size={24} color='white' />
                }
            </button>
        </div>
    )
}

export default Navbar
