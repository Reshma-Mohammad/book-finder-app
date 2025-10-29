import React from "react";

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p className="no-results">Start searching to see results!</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150x200?text=No+Cover";

        return (
          <div key={book.key} className="book-card">
            <img src={coverUrl} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>
            <p className="book-year">
              {book.first_publish_year
                ? `Published: ${book.first_publish_year}`
                : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
