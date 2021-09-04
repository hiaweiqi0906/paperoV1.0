import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

export default function TestScroll() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevValue) => { console.log(prevValue); return prevValue + 1});
          console.log(pageNumber)
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        value={query}
        className="text"
      />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book._id}>
              {book.bookTitle}
            </div>
          );
        }
        return <div key={book._id}>{book.bookTitle}</div>;
      })}
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
    </div>
  );
}
