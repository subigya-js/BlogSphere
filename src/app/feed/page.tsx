"use client"

import AddBlog from '@/components/FeedComponents/AddBlog';
import NewsFeed from '@/components/FeedComponents/NewsFeed';
import { useTheme } from '@/context/ThemeContext';

const Page = () => {
    const { mode } = useTheme();
    return (
        <div className={`min-h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} overflow-x-hidden`}>
            {/* Blog Post  */}
            <div className='flex flex-col gap-4 p-2 w-full max-w-7xl mx-auto'>
                <div className='w-full flex justify-end'>
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
