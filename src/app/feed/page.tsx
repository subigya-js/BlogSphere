"use client"

import Link from 'next/link';
import AddBlog from '@/components/FeedComponents/AddBlog';
import NewsFeed from '@/components/FeedComponents/NewsFeed';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

interface Author {
    name: string;
    email: string;
    _id: string;
}

interface BlogPost {
    _id: string;
    author: Author;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const Page = () => {
    const { mode } = useTheme();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                toast.error('Failed to fetch blogs. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleBlogAdded = (newBlog: BlogPost) => {
        setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
        toast.success('Blog post created successfully!');
    };

    return (
        <div className={`min-h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} overflow-x-hidden`}>
            {/* Blog Post  */}
            <div className='flex flex-col gap-4 p-2 w-full max-w-7xl mx-auto'>
                <div className='w-full flex justify-end gap-4'>
                    <Link href="/profile" className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${mode === 'light'
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                        }`}>Visit your Profile</Link>
                    <AddBlog onBlogAdded={handleBlogAdded} />
                </div>

                <div className='w-full'>
                    {isLoading ? (
                        <p>Loading blogs...</p>
                    ) : (
                        <NewsFeed blogs={blogs} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
