"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Books from "./components/Books";
import Header from "./components/Header";
export default function Home() {
  const token = Cookies.get("token");
  const router = useRouter();
  if (!token) {
    router.push("/Login")
  }
  return (
    <div className="bg-gray-100">
      <Header />
      <Books />
    </div>
  );
}
