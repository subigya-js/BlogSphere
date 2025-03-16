"use client"
import Link from 'next/link';
import { MdLightMode, MdLightbulb } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

const Navbar = () => {  
    const { mode, toggleMode } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className={`[font-family:var(--font-geist-sans)] h-[10vh] ${mode === 'light' ? 'bg-gray-300 border-b border-gray-700' : 'border-b border-gray-300 bg-gray-800'} flex items-center px-6 justify-between`}>
            <Link href="/" className={`text-lg font-semibold ${mode === 'light' ? 'text-black' : 'text-white'}`}>BlogSphere</Link>

            <div className="flex items-center space-x-4">
                {isLoggedIn && (
                    <Link href="/profile">
                        <FaRegUserCircle size={24} className={`cursor-pointer ${mode === 'light' ? 'text-black' : 'text-white'}`} />
                    </Link>
                )}
                <button onClick={toggleMode} className='cursor-pointer'>
                    {mode === 'light' ? <MdLightMode size={24} /> : <MdLightbulb size={24} color='white' />}
                </button>
            </div>
        </div>
    )
}

export default Navbar
