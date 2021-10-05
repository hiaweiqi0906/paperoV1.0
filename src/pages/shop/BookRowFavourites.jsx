import axios from "axios";
import React from "react";

function BookRowFavourites(props) {
  const authToken = localStorage.getItem("authToken") || "empty";

  function handleOnRemove(e) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .post(
        "https://papero-dev.herokuapp.com/users/removeFavourites&id=" +
          props.bookId,
        {},
        config
      )
      .then((res) => {
        if (res.data.statusCode === "200") {
        } else if (res.data.statusCode === "401") {
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
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
              <p className="uhp-slot-title">{props.books.bookTitle}</p>
              <div className="row">
                <div className="col-9">
                  <p className="uhp-price">RM {props.books.price}</p>
                </div>
                <div className="col-3">
                  <form onSubmit={handleOnRemove}>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "transparent",
                        backgroundRepeat: "no-repeat",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      <i
                        style={{ borderRadius: "2px", color: "#91091e" }}
                        className="fas fa-trash"
                      ></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default BookRowFavourites;
