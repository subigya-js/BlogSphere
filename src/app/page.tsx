"use client"
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function Home() {
  const { mode } = useTheme();

  return (
    <div className={`min-h-screen ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <Navbar />
      <main className="p-8 flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-3xl font-bold mb-4">Welcome to BlogSphere</h1>

        <form className={`flex flex-col gap-4 p-4 rounded-md lg:w-[30%] md:w-[40%] w-full ${mode === 'light' ? 'bg-gray-100 border border-gray-300' : 'bg-gray-800 border border-gray-700'}`}>
          <div className="flex flex-col gap-2">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Your Name"
              className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Email:</label>
            <input
              type="email"
              placeholder="email@youremail.com"
              className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Password:</label>
            <input
              type="password"
              placeholder="**********"
              className={`p-2 rounded-md outline-none ${mode === 'light' ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'} border`}
            />
          </div>

          <div className="w-full flex justify-between items-center">
            <button
              type="submit"
              className={`cursor-pointer  p-2 rounded-md ${mode === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800'} text-white px-6`}
            >
              Submit
            </button>
            <Link href="/login" className="text-sm text-blue-500 hover:underline">Already have an account?</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
