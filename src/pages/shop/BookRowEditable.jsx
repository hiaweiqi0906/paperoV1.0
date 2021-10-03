import axios from "axios";
import React from "react";

function BookRowEditable(props) {
  const authToken = localStorage.getItem("authToken") || "empty";
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  return (
  
    <div className="col-md-2 col-6">
      <a
        href={"/view/" + props.books._id}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <div className="uhp-book-slot first-col">
          <div className="uhp-slot-img">
            <img
              className="uhp-img"
              src={props.books.coverImgUri}
              alt={props.books.bookTitle}
            />
          </div>
          <div className="uhp-item-title-and-uhp-price">
            <p className="uhp-slot-title">
              {props.books.bookTitle}aaa aaaa aaaaaaaaa aaaaaaaaa aaaaaa
              {props.books.bookTitle}
            </p>
            <div className="row">
              <div className="col-md-9 col-8">
                <p className="uhp-price">RM {props.books.price}</p>
              </div>
              <div className="col-md-3 col-4">
                <form action={"/user/edit/" + props.books._id}>
                <button type="submit" >
                  <i
                    style={{ borderRadius: "2px", color: "#91091e", zIndex: '3' }}
                    className="fas fa-pencil-alt"
                  ></i>
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default BookRowEditable;
