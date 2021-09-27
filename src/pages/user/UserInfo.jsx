import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import BookRowFavourites from "./../shop/BookRowFavourites";
import "../../css/styles.css";
import BookRowEditable from "./../shop/BookRowEditable";
import LoadingSkeletonBookRow from "./../shop/LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";
import EditOneBook from "./EditOneBook";

export default function UserInfo() {
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  let noResult = false;
  const authToken = localStorage.getItem("authToken") || "empty";

  const [blurStyle, setBlurStyle] = useState({});
  const [userInfo, setUserInfo] = useState({
    _id: "",
    firstName: "",
    coverImg: "",
    lastName: "",
    email: "",
    gender: "",
    noTel: "",
    states: "",
    whatsappLink: "",
    messengerLink: "",
    wechatLink: "",
    instagramLink: "",
  });
  let query = "@@@@userInfo";
  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber);
  if (books.length === 0) noResult = true;

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevValue) => {
            console.log(prevValue);
            return prevValue + 1;
          });
          console.log(pageNumber);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  function handleOnUnblur() {
    setBlurStyle({
      "-webkit-filter": "blur(0px)",
      "-moz-filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-ms-filter": "blur(0px)",
      filter: "blur(0px)",
      "background-color": " #fff",
    });
  }

  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("http://localhost:5000/users/retrieveInfo", config)
      .then((res) => {
        console.log("here", res.data);
        setUserInfo({ ...res.data });
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  return (
    <>
      <div className="container">
        <section id="seller-info">
          <div className="uhp-horizontal-ads">uhp-horizontal-ads</div>
          <div className="uhp-seller-info-block border">
            <div className="row hundred-row">
              <div className="col-2 uhp-center-vertical">
                <div>
                  <img
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className="uhp-userAvatar"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/JaketheDog.png/220px-JaketheDog.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4 uhp-center-vertical">
                <div className="info-spacing">
                  <h3 className="uhp-h3">Wei Qi Hia</h3>
                </div>
                <div className="info-spacing">
                  <h3 className="uhp-h3">Location: Simpang Ampat, P. Pinang</h3>
                </div>
                <div className="info-spacing">
                  <h3 className="uhp-h3">Joined: one month ago...</h3>
                </div>
              </div>
              <div className="col-3">
                <h3 className="uhp-h3">Contact Num: </h3>
                <div className="uhp-blurred-contact-info" style={blurStyle}>
                  <div className="uhp-all-contact">
                    <p>H/P Num: 012-3456 789</p>
                    <p>H/P Num: 012-3456 789</p>
                  </div>
                </div>
              </div>

              <div
                className="col-3 uhp-center-vertical"
                style={{ height: "100%", position: "relative" }}
              >
                <div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "30px",
                    }}
                  >
                    <button
                      id="btn-show-contact"
                      onClick={handleOnUnblur}
                      className="uhp-primary-btn"
                    >
                      Show Contact info
                    </button>
                    <button className="uhp-secondary-btn">
                      Report Inappropriate User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="other-books">
          <div className="uhp-other-books-from-this-seller">
            <div className="section-label">
              <h3 className="uhp-h3 uhp-section-title">
                Other Books from This Seller
              </h3>
            </div>
            <div className="">
              <div className="row gx-2 margin-top-30">
                {books.length > 0 &&
                  books.map((book, index) => {
                    if (books.length === index + 1) {
                      return (
                        <BookRowEditable
                          ref={lastBookElementRef}
                          bookId={book._id}
                          books={book}
                          key={book._id}
                        />
                      );
                    }
                    return (
                      <BookRowEditable
                        bookId={book._id}
                        books={book}
                        key={book._id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
