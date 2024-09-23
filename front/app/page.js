"use client"
import Books from "./components/Books";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Books />
    </div>
  );
}
