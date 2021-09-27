import React, { useState, useEffect } from "react";
import BookRow from "../pages/shop/BookRow";
import axios from "axios";

export default function UploadedRecentlyBookRow(props) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/othersFromSeller-${props.email}`)
      .then((res) => {
        setBooks(res.data);
      });
  },books.length);

  return (
    <>
      <div className="other-books-from-this-seller ii-mt-80">
        <div className="section-label">
          <div className="row">
            <div className="col">
              <h3 className="ii-h3 ii-section-title">
                Other Books from This Seller
              </h3>
            </div>
            <div className="col">
              <h3
                className="ii-h3 ii-section-title"
                style={{ textAlign: "right" }}
              >
                See More
              </h3>
            </div>
          </div>
        </div>
        <div className="">
          <div className="row gx-2 margin-top-30">
            {books.length > 0
              ? books.map((book, index) => {
                  return <BookRow books={book} key={book._id} />;
                })
              : null}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
