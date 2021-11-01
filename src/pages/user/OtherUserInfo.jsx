import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/styles.css";
import useBookSearch from "../../components/useBookSearch";
import HorizontalAds from "../../components/HorizontalAds";
import BookRow from "../shop/BookRow";

export default function OtherUserInfo() {
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  const authToken = localStorage.getItem("authToken") || "empty";
  const [blurStyle, setBlurStyle] = useState({});
  const [reportShow, setReportShow] = useState({ display: "none" });
  const [reportSelection1, setReportSelection1] = useState("");
  const [reportSelection2, setReportSelection2] = useState("");

  const { id } = useParams();
  let query = id + "@@@@userOtherInfo";
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
  function handleOnShowReportSection() {
    if (reportShow.display === "none") setReportShow({ display: "block" });
    else setReportShow({ display: "none" });
  }

  function handleOnSubmitReports() {
    const reports = { details: reportSelection1 + ", " + reportSelection2 };
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "https://papero-dev.herokuapp.com/reportSeller&id=" + userInfo._id,
        reports,
        config
      )
      .then((res) => {
        if (res.status === "200") {
        } else if (res.status === "401") {
          // window.location.pathname = "/"
        }
      })
      .catch((err) => console.log(err));
  }

  function handleOnChangeReports(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "reportSelection1") setReportSelection1(value);
    else setReportSelection2(value);
  }

  function handleOnUnblur() {
    setBlurStyle({
      WebkitFilter: "blur(0px)",
      MozFilter: "blur(0px)",
      OFilter: "blur(0px)",
      msFilter: "blur(0px)",
      filter: "blur(0px)",
      backgroundColor: " #fff",
      pointerEvents: "auto",
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
      .get(
        "https://papero-dev.herokuapp.com/users/retrieveOthersInfo/" + id,
        config
      )
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
          <div className="si-seller-info-block si-border">
            <div className="row hundred-row">
              <div className="col-md-2 si-center-vertical">
                <div>
                  <img
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className="si-userAvatar"
                    src={
                      userInfo.avatarUri != ""
                        ? userInfo.avatarUri
                        : "https://res.cloudinary.com/papero/image/upload/v1633250954/user_tbyq9p.png"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-4 si-center-vertical">
                <div className="info-spacing">
                  <h3 className="si-h3">
                    {userInfo.firstName + " " + userInfo.lastName}
                  </h3>
                </div>
                <div className="info-spacing">
                  <h3 className="si-h3">
                    Location: {userInfo.location}, {userInfo.states}
                  </h3>
                </div>
                <div className="info-spacing">
                  <h3 className="si-h3">Joined: one month ago...</h3>
                </div>
              </div>
              <div className="col-md-3 si-center-vertical">
                <h3 className="si-h3">Contact Num: </h3>
                <div className="si-blurred-contact-info" style={blurStyle}>
                  <div className="si-all-contact">
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
                            <i className="fab fa-instagram dropbtn" style={{ color: "#9d9d9d " }}></i>
                          </a>
                        </div>
                      )}
                      {userInfo.wechatLink != "" ? (
                        <div className="col-md-2 col-3 dropup">
                          <a href={userInfo.wechatLink} target="_blank">
                            <i
                              className="fab fa-weixin dropbtn"
                            ></i>
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
                            <i
                              className="fab fa-whatsapp dropbtn"
                              style={{ color: "#9d9d9d " }}
                            ></i>
                          </a>
                        </div>
                      )}

                      {userInfo.messengerLink != "" ? (
                        <div className="col-md-2 col-3 dropup">
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
                            <i
                              className="fab fa-facebook-messenger dropbtn"
                              style={{ color: "#9d9d9d " }}
                            ></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 si-center-vertical si-btn-groups-parent">
                <div>
                  <div className="si-btn-groups">
                    <button
                      id="btn-show-contact"
                      onClick={handleOnUnblur}
                      className="si-primary-btn"
                    >
                      Show Contact info
                    </button>
                    <button
                      className="si-secondary-btn"
                      onClick={handleOnShowReportSection}
                    >
                      Report Inappropriate User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" ii-main-info ii-border ii-pd-10" style={reportShow}>
            <form onSubmit={handleOnSubmitReports}>
              <hr />
              <div className="row">
                <div className="col-md-6" style={{ marginBottom: "10px" }}>
                  <strong>Report Inappropriate Seller</strong>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">Reasons:</div>
                <div className="col-md-3">
                  <select
                    name="reportReasons"
                    id=""
                    value={reportSelection1}
                    onChange={handleOnChangeReports}
                    style={{ width: "100%" }}
                  >
                    <option defaultValue hidden>
                      Select an Option
                    </option>
                    <option value="Misleading">Misleading</option>
                    <option value="Spam">Spam</option>
                    <option value="Nudity or sexual activity">
                      Nudity or sexual activity
                    </option>
                    <option value="Hate speech or symbols">
                      Hate speech or symbols
                    </option>
                    <option value="Racist language or activity">
                      Racist language or activity
                    </option>
                    <option value="Violence or dangerous organizations">
                      Violence or dangerous organizations
                    </option>
                    <option value="Bullying or harassment">
                      Bullying or harassment
                    </option>
                    <option value="Selling illegal or regulated goods">
                      Selling illegal or regulated goods
                    </option>
                    <option value="Intellectual property violations">
                      Intellectual property violations
                    </option>
                    <option value="Suicide or self-injury">
                      Suicide or self-injury
                    </option>
                  </select>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">Other reasons:</div>
                <div className="col-md-4" style={{ marginBottom: "30px" }}>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={reportSelection2}
                    onChange={handleOnChangeReports}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-10"></div>
                <div className="col-md-2" style={{ textAlign: "right" }}>
                  <button
                    type="submit"
                    className="ii-primary-btn"
                    style={{ width: "100%" }}
                  >
                    Report
                  </button>
                </div>
              </div>
            </form>
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
