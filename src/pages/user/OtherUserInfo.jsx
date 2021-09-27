import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookRowFavourites from "./../shop/BookRowFavourites";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./../shop/LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";
import BookRow from "../shop/BookRow";

export default function OtherUserInfo() {
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  const authToken = localStorage.getItem("authToken") || "empty";
  const [blurStyle, setBlurStyle] = useState({});

  const { email } = useParams();
  let noResult = false;
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

  let query = "@@@@userOtherInfo" + email;
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
      "WebkitFilter": "blur(0px)",
      "MozFilter": "blur(0px)",
      "OFilter": "blur(0px)",
      "msFilter": "blur(0px)",
      filter: "blur(0px)",
      "backgroundColor": " #fff",
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
      .get("http://localhost:5000/users/retrieveOthersInfo/" + email, config)
      .then((res) => {
        setUserInfo({ ...res.data });
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  return (
    <>
      <div className="container">
        <section id="seller-info">
          <div className="si-horizontal-ads">si-horizontal-ads</div>
          <div className="si-seller-info-block si-border">
            <div className="row hundred-row">
              <div className="col-2 si-center-vertical">
                <div>
                  <img
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className="si-userAvatar"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/JaketheDog.png/220px-JaketheDog.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4 si-center-vertical">
                <div className="info-spacing">
                  <h3 className="si-h3">{userInfo.firstName+" "+userInfo.lastName}</h3>
                </div>
                <div className="info-spacing">
                  <h3 className="si-h3">Location: {userInfo.location}, {userInfo.states}</h3>
                </div>
                <div className="info-spacing">
                  <h3 className="si-h3">Joined: one month ago...</h3>
                </div>
              </div>
              <div className="col-3 si-center-vertical">
                <h3 className="si-h3">Contact Num: </h3>
                <div className="si-blurred-contact-info" style={blurStyle}>
                  <div className="si-all-contact">
                    <p>H/P Num: 012-3456 789</p>
                    <p>H/P Num: 012-3456 789</p>
                  </div>
                </div>
              </div>

              <div
                className="col-3 si-center-vertical"
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
                    <button id="btn-show-contact" onClick={handleOnUnblur} className="si-primary-btn">
                      Show Contact info
                    </button>
                    <button className="si-secondary-btn">
                      Report Inappropriate User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="other-books">
          <div className="si-other-books-from-this-seller">
            <div className="section-label">
              <h3 className="si-h3 si-section-title">
                Other Books from This Seller
              </h3>
            </div>
            <div className="">
              <div className="row gx-2 margin-top-30">
                {books.length > 0 &&
                  books.map((book, index) => {
                    if (books.length === index + 1) {
                      return (
                        <BookRow
                          ref={lastBookElementRef}
                          bookId={book._id}
                          books={book}
                          key={book._id}
                        />
                      );
                    }
                    return (
                      <BookRow bookId={book._id} books={book} key={book._id} />
                    );
                  })}{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
