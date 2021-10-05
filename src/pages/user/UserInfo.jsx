import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import "../../css/styles.css";
import BookRowEditable from "./../shop/BookRowEditable";
import HorizontalAds from "../../components/HorizontalAds";
import useBookSearch from "../../components/useBookSearch";

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
            return prevValue + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
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
        setUserInfo({ ...res.data });
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  return (
    <>
      <div className="container">
        <section id="seller-info">
          <HorizontalAds />
          <div className="uhp-seller-info-block border">
            <div className="row hundred-row">
              <div className="col-md-2 uhp-center-vertical">
                <div>
                  <img
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className="uhp-userAvatar"
                    src={
                      userInfo.avatarUri != ""
                        ? userInfo.avatarUri
                        : "https://res.cloudinary.com/papero/image/upload/v1633250954/user_tbyq9p.png"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-4 uhp-center-vertical">
                <div className="info-spacing">
                  <h3 className="uhp-h3">
                    {userInfo.firstName} {userInfo.lastName}
                  </h3>
                </div>
                <div className="info-spacing">
                  <h3 className="uhp-h3">
                    Location: {userInfo.location}, {userInfo.states}
                  </h3>
                </div>
                <div className="info-spacing">
                  <h3 className="uhp-h3">Joined: one month ago...</h3>
                </div>
              </div>
              <div className="col-md-3">
                <h3 className="uhp-h3">Contact Num: </h3>
                <div className="uhp-blurred-contact-info" style={blurStyle}>
                  <div className="uhp-all-contact">
                    <p style={{ marginBottom: "5px" }}>
                      H/P Num: 0{userInfo.noTel}
                    </p>
                    <div className="row">
                      {userInfo.instagramLink != "" ? (
                        <div className="col-md-2 col-3 dropup">
                          <a href={userInfo.instagramLink} target="_blank">
                            <i className="fab fa-instagram dropbtn"></i>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-md-2 col-3 dropup"
                          style={{ pointerEvents: "none" }}
                        >
                          <a href={userInfo.instagramLink} target="_blank">
                            <i className="fab fa-instagram dropbtn"></i>
                          </a>
                        </div>
                      )}
                      {userInfo.wechatLink != "" ? (
                        <div className="col-md-2 col-3 dropup">
                          <a href={userInfo.wechatLink} target="_blank">
                            <i className="fab fa-weixin dropbtn"></i>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-md-2 col-3 dropup"
                          style={{ pointerEvents: "none" }}
                        >
                          <a>
                            <i
                              className="fab fa-weixin dropbtn"
                              style={{ color: "#9d9d9d " }}
                            ></i>
                          </a>
                        </div>
                      )}

                      {userInfo.whatsappLink != "" ? (
                        <div className="col-md-2 col-3 dropup">
                          <a href={userInfo.whatsappLink} target="_blank">
                            <i className="fab fa-whatsapp dropbtn"></i>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-md-2 col-3 dropup"
                          style={{ pointerEvents: "none" }}
                        >
                          <a href={userInfo.whatsappLink} target="_blank">
                            <i className="fab fa-whatsapp dropbtn"></i>
                          </a>
                        </div>
                      )}

                      {userInfo.messengerLink != "" ? (
                        <div className="col-md-2 col-3  dropup">
                          <a href={userInfo.messengerLink} target="_blank">
                            <i className="fab fa-facebook-messenger dropbtn"></i>
                          </a>
                        </div>
                      ) : (
                        <div
                          className="col-md-2 col-3 dropup"
                          style={{ pointerEvents: "none" }}
                        >
                          <a href={userInfo.messengerLink} target="_blank">
                            <i className="fab fa-facebook-messenger dropbtn"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 si-btn-groups-parent uhp-center-vertical">
                <div>
                  <div className="si-btn-groups">
                    <button
                      id="btn-show-contact"
                      onClick={handleOnUnblur}
                      className="uhp-primary-btn"
                    >
                      Show Contact info
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
