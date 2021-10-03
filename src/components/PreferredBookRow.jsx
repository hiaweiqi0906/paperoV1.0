import React, { useState, useEffect } from "react";
import BookRow from "../pages/shop/BookRow";
import axios from "axios";

export default function PreferredBookRow() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/preferredBook").then((res) => {
      setBooks(res.data);
    });
  }, [books.length]);

  return (
    <div className="sid-mt-80">
      <div className="section-label">
        <div className="row">
          <div className="col">
            <h3 className="sid-h3 sid-section-title">Preferred Book</h3>
          </div>
          <div className="col">
            <a href="/preferredBooks" style={{ textDecoration: "inherit", color: "inherit" }}>
              <h3
                className="sid-h3 sid-section-title"
                style={{ textAlign: "right" }}
              >
                See More
              </h3>
            </a>
          </div>
        </div>
      </div>
      <div className="">
        <div className="row gx-2 margin-top-30">
          {books.length > 0
            ? books.map((book, index) => {
                return <BookRow books={book} key={book._id} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
}
