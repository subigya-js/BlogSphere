"use client"

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface Author {
    name: string;
    email: string;
    _id: string;
}

interface Blog {
    _id: string;
    author: Author;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface NewsFeedProps {
    blogs: Blog[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ blogs }) => {
    const { mode } = useTheme();
    const [toggleState, setToggleState] = useState<Record<string, boolean>>({});

    const handleToggle = (id: string) => {
        setToggleState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (blogs.length === 0) return <div className="text-center p-4">No blogs available.</div>;
    return (
        <div className='bg-amber-00 min-h-[80vh] py-4'>
            {blogs.map((blog) => (
                <div key={blog._id} className={`min-h-[100px] border ${mode === 'light' ? 'border-gray-300 bg-gray-100' : 'border-gray-700 bg-gray-800'} rounded-md py-3 px-6 justify-between items-center max-w-[70%] mx-auto mb-4 transition-colors duration-300`}>
                    <div className='flex flex-col gap-1 pb-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl font-bold'>{blog.title}</h1>
                            <button
                                className={`cursor-pointer transition-transform duration-300 ease-in-out ${mode === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => handleToggle(blog._id)}
                            >
                                {!toggleState[blog._id] ? <FaAngleDown /> : <FaAngleUp />}
                            </button>
                        </div>
                        <p className={`text-sm italic ${mode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Author: {blog.author.name}</p>
                        <p className={`text-sm italic ${mode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Date Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <p className={`text-sm italic ${mode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Blog Content */}
                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${toggleState[blog._id] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                        <p className={`mt-2 border-t ${mode === 'light' ? 'border-gray-300 pt-2' : 'border-gray-700 pt-2'}`}>{blog.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NewsFeed
