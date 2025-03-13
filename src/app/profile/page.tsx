"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

const Page = () => {
  const { mode } = useTheme();
  const [userId, setUserId] = useState<string | null>(null);
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserId(parsedUserData._id);
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!userId) return;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`http://localhost:3001/api/blogs/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setIsLoading(false);
      }
    }

    fetchUserBlogs();
  }, [userId]);

  return (
    <div className={`min-h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Your Blogs</h1>
        {isLoading ? (
          <p>Loading your blogs...</p>
        ) : userBlogs.length > 0 ? (
          <div className="space-y-6">
            {userBlogs.map((blog) => (
              <div key={blog._id} className={`p-4 rounded-lg ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm mb-2">Author: {blog.author.name}</p>
                <p className="text-sm mb-4">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                <p className="mb-4">{blog.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't created any blogs yet.</p>
        )}
      </div>
    </div>
  )
}

export default Page;
