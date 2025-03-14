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

const NewsFeed = () => {
    const { mode } = useTheme();
    const [toggleState, setToggleState] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string | null>(null);
    const [blogData, setBlogData] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/blogs/');
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                const data = await response.json();
                setBlogData(data.blogs);
            } catch (error) {
                console.error("Error fetching blog data:", error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogData();
    }, [blogData]);

    const handleToggle = (id: string) => {
        setToggleState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    return (
        <div className='bg-amber-00 min-h-[80vh] py-4'>
            {blogData.map((blog) => (
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