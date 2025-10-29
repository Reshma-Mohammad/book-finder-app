import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./style.css";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async (title: string) => {
    if (!title.trim()) {
      setError("Please enter a book title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${title}`
      );
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch {
      setError("Network error. Please try again later.");
      setBooks([]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="title">📚 Book Finder</h1>
      <SearchBar onSearch={searchBooks} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <BookList books={books} />}
    </div>
  );
};

export default App;
