"use client"
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function Home() {
  const { mode } = useTheme();

  return (
    <div className={`h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <main className="p-8 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to BlogSphere</h1>
        
        <p className="text-lg mb-6 text-center max-w-2xl">
          Discover a world of ideas, stories, and insights. BlogSphere is your platform to read, write, and connect with passionate writers from around the globe.
        </p>

        <Link href="/login" className={`px-6 py-2 rounded-full ${mode === 'light' ? 'bg-blue-500 text-white' : 'bg-blue-400 text-gray-900'} hover:opacity-90 transition-opacity`}>
          Get Started
        </Link>
      </main>
    </div>
  );
}
