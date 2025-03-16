"use client"
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { mode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/feed');
    }
  }, [router]);

  return (
    <div className={`h-[90vh] ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <main className="p-8 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to BlogSphere</h1>
        
        <p className="text-lg mb-6 text-center max-w-2xl">
          Discover a world of ideas, stories, and insights. BlogSphere is your platform to read, write, and connect with passionate writers from around the globe.
        </p>

        <Link href="/login" className={`cursor-pointer  p-2 rounded-md ${mode === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800'} text-white px-6`}>
          Get Started
        </Link>
      </main>
    </div>
  );
}
