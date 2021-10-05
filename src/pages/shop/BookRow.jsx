import React from "react";

function BookRow(props) {
  return (
    <div className="col-md-2 col-6">
      <a
        href={"/view/" + props.books._id}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <div className="sid-book-slot first-col">
          <div className="sid-slot-img">
            <img
              src={props.books.coverImgUri}
              alt={props.books.bookTitle}
              className="sid-img"
            />
          </div>
          <div className="sid-item-title-and-sid-price">
            <p className="sid-slot-title">
              {props.books.bookTitle}
            </p>
            <p className="sid-price">RM {props.books.price}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default BookRow;
