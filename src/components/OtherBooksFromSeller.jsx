import React, { useState, useEffect } from "react";
import BookRow from "../pages/shop/BookRow";
import axios from "axios";

export default function OtherBooksFromSeller(props) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`https://papero-dev.herokuapp.com/othersFromSeller-${props.email}`)
      .then((res) => {
        setBooks(res.data);
      });
  }, [props.email]);

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
              <a href={`/otherUser/${props._id}`}
              style={{ textDecoration: "inherit", color: "inherit" }}>
              <h3
                className="ii-h3 ii-section-title"
                style={{ textAlign: "right" }}
              >
                See More
              </h3></a>
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
