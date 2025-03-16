"use client"
import Link from 'next/link';
import { MdLightMode, MdLightbulb } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {  
    const { mode, toggleMode } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!token);
        if (user) {
            const userData = JSON.parse(user);
            setUserName(userData.name || 'User');
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setShowModal(false);
        router.push('/login');
    };

    return (
        <div className={`[font-family:var(--font-geist-sans)] h-[10vh] ${mode === 'light' ? 'bg-gray-300 border-b border-gray-700' : 'border-b border-gray-300 bg-gray-800'} flex items-center px-6 justify-between`}>
            <Link href="/" className={`text-lg font-semibold ${mode === 'light' ? 'text-black' : 'text-white'}`}>BlogSphere</Link>

            <div className="flex items-center gap-4">
                {isLoggedIn && (
                    <div className="relative top-1">
                        <button onClick={() => setShowModal(!showModal)}>
                            <FaRegUserCircle size={24} className={`cursor-pointer ${mode === 'light' ? 'text-black' : 'text-white'}`} />
                        </button>
                        {showModal && (
                            <div className={`absolute right-0 top-5 mt-2 w-40 rounded-md shadow-lg ${mode === 'light' ? 'bg-gray-600' : 'bg-gray-200'} flex justify-center items-center flex-col`}>
                                <div className="py-1">
                                    <p className={`block px-4 py-2 text-sm ${mode === 'light' ? 'text-gray-100' : 'text-gray-800'}`}>
                                        {userName}
                                    </p>
                                    <button
                                        onClick={handleSignOut}
                                        className={`block cursor-pointer w-full bg-red-500  text-left px-4 py-2 text-sm ${mode === 'light' ? 'text-gray-200 hover:bg-red-600' : 'text-gray-200 hover:bg-red-700'} duration-200 rounded-md`}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button onClick={toggleMode} className='cursor-pointer'>
                    {mode === 'light' ? <MdLightMode size={24} /> : <MdLightbulb size={24} color='white' />}
                </button>
            </div>
        </div>
    )
}

export default Navbar
