"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Books = () => {
  const [books, setBooks] = useState([]);
  const token = Cookies.get("token");
  const router = useRouter();
  if (!token) {
    router.push("/Login")
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:1111/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const newBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A classic novel set in the Roaring Twenties.",
    };
    try {
      const response = await axios.post("http://localhost:1111/books", newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;
    if (!token) {
      alert("Token not found");
      return;
    }
    try {
      await axios.delete(`http://localhost:1111/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          const response = await axios.post("http://localhost:1111/refresh", {}, {
            withCredentials: true,
          });
          Cookies.set("token", response.data.accessToken);
          await axios.delete(`http://localhost:1111/books/${id}`, {
            headers: { Authorization: `Bearer ${response.data.accessToken}` },
          });
          setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
          if (error.response && error.response.status === 403) {
            alert("Your session has expired. Please log in again.")
            router.push("/Login")
          }else if (error.response && error.response.status === 401) {
            alert("Not allowed")
          }{
            alert("Error deleting book");
          }
        }
      } 
    }
  };
  
  

  return (
    <section>
      <div className="max-w-4xl mx-auto p-8 mt-8 bg-gray-50 shadow-lg rounded-lg">
        
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-teal-600">Books</h1>
        <button
          className="bg-gradient-to-r from-sky-400 to-sky-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-xl hover:from-sky-500 hover:to-sky-700 transition duration-300"
          onClick={addBook}
        >
          Add Book
        </button>
      </div>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-teal-700">{book.title}</h3>
              <p className="text-gray-600">By: {book.author}</p>
              <p className="text-gray-500 mt-1">{book.description}</p>
            </div>
            <button
              onClick={() => deleteBook(book._id)}
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>  
    </section>
    
  );
};

export default Books;
