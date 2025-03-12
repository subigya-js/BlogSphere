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

const Page = () => {
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
    }, []);

    const handleToggle = (id: string) => {
        setToggleState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

    return (
        <div className={`min-h-[90vh] p-3 ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
            {blogData.map((blog) => (
                <div key={blog._id} className='min-h-[100px] border border-gray-400 rounded-md py-3 px-6 bg-green-200 justify-between items-center max-w-[70%] mx-auto mb-4'>
                    <div className='flex flex-col gap-1 pb-3'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl font-bold'>{blog.title}</h1>
                            <button
                                className='cursor-pointer transition-transform duration-300 ease-in-out'
                                onClick={() => handleToggle(blog._id)}
                            >
                                {!toggleState[blog._id] ? <FaAngleDown /> : <FaAngleUp />}
                            </button>
                        </div>
                        <p className='text-sm italic'>Author: {blog.author.name}</p>
                        <p className='text-sm italic'>Date Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <p className='text-sm italic'>Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Blog Content */}
                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${toggleState[blog._id] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                        <p className='mt-2 border-t pt-2'>{blog.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
