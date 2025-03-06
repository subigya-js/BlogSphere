"use client"
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { mode } = useTheme();

  return (
    <div className={`min-h-screen ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to BlogSphere</h1>
        <p>This is a full-stack blog application with {mode} mode enabled.</p>
      </main>
    </div>
  );
}
