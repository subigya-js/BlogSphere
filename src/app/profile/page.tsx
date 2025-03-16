"use client";
import AddBlog from "@/components/FeedComponents/AddBlog";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
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
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({});

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

  const updateBlog = async (blogId: string, updatedData: Partial<BlogPost>) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBlog = await response.json();
      setUserBlogs(prevBlogs => prevBlogs.map(blog =>
        blog._id === blogId ? { ...blog, ...updatedBlog } : blog
      ));
      setEditingBlog(null);
      toast.success('Blog updated successfully');
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error('Failed to update blog. Please try again.');
    }
  }

  const handleEditClick = (blog: BlogPost) => {
    setEditingBlog(blog);
  }

  const handleCancelEdit = () => {
    setEditingBlog(null);
  }

  const handleToggle = (id: string) => {
    setToggleState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBlog) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    };

    updateBlog(editingBlog._id, updatedData);
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
              <div key={blog._id} className={`p-4 rounded-lg ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                {editingBlog && editingBlog._id === blog._id ? (
                  <div className="fixed inset-0 bg-gray-500/80 flex justify-center items-center pt-4 z-50">
                    <div className={`bg-${mode === 'light' ? 'white' : 'gray-800'} p-6 rounded-lg w-[80%] max-w-4xl relative`}>
                      <button
                        onClick={handleCancelEdit}
                        className="absolute cursor-pointer top-5 right-5 text-gray-500 hover:text-gray-700"
                      >
                        <IoMdClose size={24} />
                      </button>
                      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>

                      <div className={`bg-${mode === 'light' ? 'white' : 'gray-800'} p-6 rounded-lg max-w-[100%]`}>
                        <form onSubmit={handleUpdateSubmit} >
                          <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium mb-1">Blog Title</label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              defaultValue={editingBlog.title}
                              className={`outline-none w-full p-2 rounded border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium mb-1">Blog Content</label>
                            <textarea
                              id="content"
                              name="content"
                              defaultValue={editingBlog.content}
                              className={`outline-none w-full p-2 rounded max-h-[300px] min-h-[50px] border ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'}`}
                              rows={4}
                              required
                            ></textarea>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="submit"
                              className={`cursor-pointer px-4 py-2 rounded ${mode === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}
                            >
                              Update Blog Post
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='flex justify-between items-center'>
                      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                      <div className="flex gap-4 items-center">
                        <div className="flex justify-end space-x-2 mt-2">
                          <button className="cursor-pointer" onClick={() => handleEditClick(blog)}>
                            <HiPencil size={20} />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() => deleteBlog(blog._id)}
                            disabled={isDeleting}
                          >
                            <MdDelete size={23} />
                          </button>
                        </div>

                        <button
                          className={`cursor-pointer transition-transform duration-300 ease-in-out ${mode === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-gray-200'}`}
                          onClick={() => handleToggle(blog._id)}
                        >
                          {!toggleState[blog._id] ? <FaAngleDown /> : <FaAngleUp />}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm mb-2">Author: {blog.author.name}</p>
                    <p className="text-sm mb-4">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>

                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${toggleState[blog._id] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                      <p className={`mt-2 border-t ${mode === 'light' ? 'border-gray-300 pt-2' : 'border-gray-700 pt-2'}`}>{blog.content}</p>
                    </div>


                  </div>
                )}
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
