import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import OtherBooksFromSeller from "../../components/OtherBooksFromSeller";
import PreferredBookRow from "../../components/PreferredBookRow";
import UploadedRecentlyBookRow from "../../components/UploadedRecentlyBookRow";
import VerticalAds from "../../components/VerticalAds";
import HorizontalAds from "../../components/HorizontalAds";
import "../../css/finalCss.css";
function ShopItemInfo(props) {
  const [book, setBook] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const authToken = localStorage.getItem("authToken") || "empty";
  const { id } = useParams();
  const [reportShow, setReportShow] = useState({ display: "none" });
  const [reportSelection1, setReportSelection1] = useState("");
  const [reportSelection2, setReportSelection2] = useState("");

  const [blurStyle, setBlurStyle] = useState({});

  useEffect(() => {
    axios.get("https://papero-dev.herokuapp.com/view/" + id).then((res) => {
      setBook(res.data.book);
      setUserInfo(res.data.user);
    });
  }, [book.bookTitle]);

  function handleOnUnblur() {
    setBlurStyle({
      WebkitFilter: "blur(0px)",
      MozFilter: "blur(0px)",
      OFilter: "blur(0px)",
      MsFilter: "blur(0px)",
      filter: "blur(0px)",
      backgroundColor: " #fff",
      pointerEvents: "auto",
    });
  }

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
        "https://papero-dev.herokuapp.com/reportBook&id=" + book._id,
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

  function handleOnSubmitFavouriteList(e) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        "https://papero-dev.herokuapp.com/users/addFavourites&id=" + book._id,
        config
      )
      .then((res) => {
        if (res.data.statusCode === "200") {
        } else if (res.data.statusCode === "401") {
          // window.location.pathname = "/"
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container">
        <section id="ii-main-info">
          <div className="ii-main-info">
            <div className="row ii-border ii-pd-10">
              <div
                id="carouselExampleControls"
                className="col-md-5 carousel slide ii-carousel-img"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="3500">
                    <img
                      className="ii-img-carousel"
                      src={book.coverImgUri ? book.coverImgUri : "#"}
                      alt="..."
                    />
                  </div>

                  {book.imageUri
                    ? book.imageUri.map((image, index) => {
                        return (
                          <div
                            className="carousel-item"
                            data-bs-interval="3500"
                            key={index}
                          >
                            <img
                              className="ii-img-carousel"
                              src={image}
                              alt="..."
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <button
                  className="carousel-control-prev ii-carousel-control-prev "
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className=" carousel-control-next ii-carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="all-info col-md-7">
                <div className="title ii-mg-top">
                  <p className="ii-small-p ">ISBN: 1111-111-1111</p>
                  <h2 className="ii-h2 ">{book.bookTitle}</h2>
                </div>
                <div className="ii-price">
                  <h1 className="ii-h1">MYR {book.price}</h1>
                </div>
                <div
                  className="info ii-mg-top row"
                  style={{ margin: "30px 0px" }}
                >
                  <div className="col-md-6">
                    <h3 className="ii-h3">
                      Location : {book.location}, {book.states}
                    </h3>
                    <h3 className="ii-h3">Year Published: {book.year}</h3>
                    <h3 className="ii-h3">Categories: {book.category}</h3>
                    <h3 className="ii-h3">Language: {book.bookLanguage}</h3>
                  </div>
                  <div className="col-md-6">
                    <h3 className="ii-h3">Contact Num: </h3>
                    <div className="ii-blurred-contact-info" style={blurStyle}>
                      <div
                        className="ii-all-contact"
                        style={{ padding: "0px", border: "none" }}
                      >
                        <h3 className="ii-h3">
                          H/P Num: 0{book.contactNumber}
                        </h3>
                        <div className="row">
                          {book.instagramLink != "" ? (
                            <div className="col-md-2 col-3 dropup">
                              <a href={book.instagramLink} target="_blank">
                                <i className="fab fa-instagram dropbtn"></i>
                              </a>
                            </div>
                          ) : (
                            <div
                              className="col-md-2 col-3 dropup"
                              style={{ pointerEvents: "none" }}
                            >
                              <a>
                                <i className="fab fa-instagram dropbtn"></i>
                              </a>
                            </div>
                          )}
                          {book.wechatLink != "" ? (
                            <div className="col-md-2 col-3 dropup">
                              <a href={book.wechatLink} target="_blank">
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

                          {book.whatsappLink != "" ? (
                            <div className="col-md-2 col-3 dropup">
                              <a href={book.whatsappLink} target="_blank">
                                <i className="fab fa-whatsapp dropbtn"></i>
                              </a>
                            </div>
                          ) : (
                            <div
                              className="col-md-2 col-3 dropup"
                              style={{ pointerEvents: "none" }}
                            >
                              <a>
                                <i className="fab fa-whatsapp dropbtn"></i>
                              </a>
                            </div>
                          )}

                          {book.messengerLink != "" ? (
                            <div className="col-md-2 col-3 dropup">
                              <a href={book.messengerLink} target="_blank">
                                <i className="fab fa-facebook-messenger dropbtn"></i>
                              </a>
                            </div>
                          ) : (
                            <div
                              className="col-md-2 col-3 dropup"
                              style={{ pointerEvents: "none" }}
                            >
                              <a>
                                <i className="fab fa-facebook-messenger dropbtn"></i>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ii-two-button ii-mg-top">
                  <button
                    onClick={handleOnSubmitFavouriteList}
                    className="ii-secondary-btn"
                  >
                    {" "}
                    Add to Wishlist!
                  </button>
                  <button
                    className="ii-primary-btn"
                    onClick={handleOnUnblur}
                    id="btn-show-contact"
                  >
                    Contact Me!{" "}
                  </button>
                </div>
                <hr />
                <div className="share-on"></div>
                <div className="share-on row" style={{ position: "relative" }}>
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-5"></div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <button
                      className="ii-secondary-btn"
                      style={{ width: "100%" }}
                      onClick={handleOnShowReportSection}
                    >
                      Report Inappropriate Ads
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
                  <strong>Report Inappropriate Ads</strong>
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
                    <option value="">Misleading</option>
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
        <section id="ii-description-seller-ads">
          <div className="ii-description-seller-ads">
            <div className="row gx-2">
              <div className="col-md-9">
                <div
                  className="ii-description ii-border"
                  style={{ height: "400px", paddingTop: "0px" }}
                >
                  <div
                    className="sticky-ii-description"
                    style={{ padding: "15px 10px" }}
                  >
                    <h3 className="ii-h3">Description: </h3>
                  </div>
                  <p className="ii-small-p " style={{ whiteSpace: "pre-line" }}>
                    {book.description}
                  </p>
                </div>
                <div className="row ii-seller-info" style={{ padding: "15px" }}>
                  <div className="col-md-2 center-vertical">
                    <div>
                      <img
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        className="ii-userAvatar"
                        src={
                          userInfo.avatarUri != ""
                            ? userInfo.avatarUri
                            : "https://res.cloudinary.com/papero/image/upload/v1633250954/user_tbyq9p.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-7 center-vertical">
                    <div className="info-spacing">
                      <h3 className="ii-h3">
                        {userInfo.firstName} {userInfo.lastName}
                      </h3>
                    </div>
                    <div className="info-spacing">
                      <h3 className="ii-h3">
                        Location:{" "}
                        {userInfo.location && userInfo.states
                          ? `${userInfo.location}, ${userInfo.states}`
                          : "Malaysia"}
                      </h3>
                    </div>
                    <div className="info-spacing">
                      <h3 className="ii-h3">Joined: one month ago...</h3>
                    </div>
                  </div>
                  <div className="col-md-3 center-vertical">
                    <form
                      action={`/otherUser/${userInfo._id}`}
                      style={{ marginTop: "30px" }}
                    >
                      <button
                        className="ii-primary-btn"
                        style={{
                          width: "100%",
                          display: "block",
                          margin: "auto",
                        }}
                        type="submit"
                      >
                        {" "}
                        Seller Info{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <VerticalAds />
            </div>
          </div>
        </section>
        <section id="other-books-from-seller">
          <OtherBooksFromSeller email={book.uploadedBy} />
        </section>
        <section id="preferred-book">
          <PreferredBookRow />
        </section>
        <section id="uploaded-recently">
          <UploadedRecentlyBookRow />
        </section>
        <section id="ii-horizontal-ads">
          <HorizontalAds />
        </section>
      </div>
    </>
  );
}

export default ShopItemInfo;
