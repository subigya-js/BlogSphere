"use client";
import AddBlog from "@/components/FeedComponents/AddBlog";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBlogAdded = (newBlog: BlogPost) => {
    setUserBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    toast.success('Blog post created successfully!');
  };

  const deleteBlog = async (blogId: string) => {
    setIsDeleting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      toast('User not authenticated');
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted blog from the local state
      setUserBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
      toast('Blog deleted successfully');
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error('Failed to delete blog. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

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
          toast.error('User not authenticated');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3001/api/blogs/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status !== 200) {
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
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="text-3xl font-bold">Your Blogs</h1>

          <div className="flex gap-3">
            <AddBlog onBlogAdded={handleBlogAdded} />

            <Link href="/feed" className={`px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${mode === 'light'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}>Visit Feed</Link>
          </div>
        </div>
        {isLoading ? (
          <p>Loading your blogs...</p>
        ) : userBlogs.length > 0 ? (
          <div className="space-y-6">
            {userBlogs.map((blog) => (
              <div key={blog._id} className={`p-4 rounded-lg ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'} flex justify-between`}>
                <div className="">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-sm mb-2">Author: {blog.author.name}</p>
                  <p className="text-sm mb-4">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                  <p className="mb-4">{blog.content}</p>
                </div>

                <div className="mr-5">
                  <button
                    className="cursor-pointer"
                    onClick={() => deleteBlog(blog._id)}
                    disabled={isDeleting}
                  >
                    <MdDelete size={23} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="mb-4">You haven't created any blogs yet.</p>
            <AddBlog onBlogAdded={handleBlogAdded} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page;
