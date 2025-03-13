"use client"

import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

const AddBlog = () => {
    const { mode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [content, setContent] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Blog submitted:', { title, authorName, authorEmail, content });
        // Add your logic here to handle the blog submission

        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        if (title.trim() === '' || authorName.trim() === '' || authorEmail.trim() === '' || content.trim() === '') {
            alert('Please fill out all fields');
            return;
        }

        const blogData = {
            author: {
                name: authorName,
                email: authorEmail
            },
            title,
            content
        };

        try {
            const response = await fetch('http://localhost:3001/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })

            if (response.status !== 201) {
                throw new Error('Failed to create blog post');
            }

            const result = await response.json();
            console.log('Blog post created:', result);
        }
        catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post');
        }

        closeModal();
        setTitle('');
        setAuthorName('');
        setAuthorEmail('');
        setContent('');
    };

    return (
        <>
            <button
                onClick={openModal}
                className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${mode === 'light'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
            >
                + Add Blog
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500/80 flex justify-center items-center pt-4">
                    <div className={`bg-${mode === 'light' ? 'white' : 'gray-800'} p-6 rounded-lg max-w-[45%]`}>
                        <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
                        <p className="mb-4">Fill out the form below to create a new blog post. Click submit when you're done.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium mb-1">Blog Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`outline-none w-full p-2 rounded border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-sm font-medium mb-1">Author Name</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className={`outline-none w-full p-2 rounded border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-sm font-medium mb-1">Author Email</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={authorEmail}
                                    onChange={(e) => setAuthorEmail(e.target.value)}
                                    className={`outline-none w-full p-2 rounded border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium mb-1">Blog Content</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className={`outline-none w-full p-2 rounded border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className={` cursor-pointer px-4 py-2 rounded ${mode === 'light' ? 'bg-gray-200 hover:bg-gray-300 duration-200 text-black' : 'bg-gray-700 hover:bg-gray-800 duration-200 text-white'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={` cursor-pointer px-4 py-2 rounded ${mode === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}
                                >
                                    Publish Blog Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddBlog;
