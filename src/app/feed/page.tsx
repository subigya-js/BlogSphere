"use client"

import Link from 'next/link';
import AddBlog from '@/components/FeedComponents/AddBlog';
import NewsFeed from '@/components/FeedComponents/NewsFeed';
import { useTheme } from '@/context/ThemeContext';

const Page = () => {
    const { mode } = useTheme();
    return (
        <div className={`min-h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} overflow-x-hidden`}>
            {/* Blog Post  */}
            <div className='flex flex-col gap-4 p-2 w-full max-w-7xl mx-auto'>
                <div className='w-full flex justify-end gap-4'>
                    <Link href="/profile" className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${mode === 'light'
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                        }`}>Visit your Profile</Link>
                    <AddBlog />
                </div>

                <div className='w-full'>
                    <NewsFeed />
                </div>
            </div>
        </div>
    )
}

export default Page
