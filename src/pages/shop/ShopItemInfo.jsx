import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import OtherBooksFromSeller from "../../components/OtherBooksFromSeller";
import PreferredBookRow from "../../components/PreferredBookRow";
import UploadedRecentlyBookRow from "../../components/UploadedRecentlyBookRow";
import "../../css/finalCss.css";
function ShopItemInfo(props) {
  const [book, setBook] = useState([]);
  const authToken = localStorage.getItem("authToken") || "empty";
  const { id } = useParams();

  const [blurStyle, setBlurStyle] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/view/" + id).then((res) => {
      setBook(res.data);
      console.log(book);
    });
  }, [book.bookTitle]);

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

  function handleOnSubmitFavouriteList(e) {
    console.log("clicked");
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("http://localhost:5000/users/addFavourites&id=" + book._id, config)
      .then((res) => {
        if (res.data.statusCode === "200") {
          console.log("res.data");
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
                className="col-5 carousel slide ii-carousel-img"
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
              <div className="all-info col-7">
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
                  <div className="col-6">
                    <h3 className="ii-h3">
                      Location : {book.location}, {book.states}
                    </h3>
                    <h3 className="ii-h3">Year Published: {book.year}</h3>
                    <h3 className="ii-h3">Categories: {book.category}</h3>
                    <h3 className="ii-h3">Language: {book.bookLanguage}</h3>
                  </div>
                  <div className="col-6">
                    <h3 className="ii-h3">Contact Num: </h3>
                    <div className="ii-blurred-contact-info" style={blurStyle}>
                      <div
                        className="ii-all-contact"
                        style={{ padding: "0px", border: "none" }}
                      >
                        H/P Num: 0{book.contactNumber}
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
                  <div className="col-7">
                    <div className="row">
                      <div className="col-5"></div>
                    </div>
                  </div>

                  <div className="col-5">
                    <button
                      className="ii-secondary-btn"
                      style={{ width: "100%" }}
                    >
                      Report Inappropriate Ads
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="ii-description-seller-ads">
          <div className="ii-description-seller-ads">
            <div className="row gx-2">
              <div className="col-9">
                <div
                  className="ii-description ii-border"
                  style={{ height: "400px", paddingTop: "0px" }}
                >
                  <div
                    className="sticky-ii-description"
                    style={{ padding: "15px 10px" }}
                  >
                    <h3 className="ii-h3">ii-description: </h3>
                  </div>
                  <p className="ii-small-p " style={{ whiteSpace: "pre-line" }}>
                    {book.description}
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    hoc ultimum bonorum, quod nunc a me defenditur; Quae cum
                    praeponunt, ut sit aliqua rerum selectio, quod nunc a me
                    defenditur; Quae cum praeponunt, ut sit aliqua rerum
                    selectio, naturam videntur sequi; In quibus doctissimi illi
                    veteres inesse quiddam caeleste et
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    hoc ultimum bonorum, quod nunc a me defenditur; Quae cum
                    praeponunt, ut sit aliqua rerum selectio, quod nunc a me
                    defenditur; Quae cum praeponunt, ut sit aliqua rerum
                    selectio, naturam videntur sequi; In quibus doctissimi illi
                    veteres inesse quiddam caeleste et
                    <br />
                    <br />
                    quod nunc a me defenditur; Quae cum praeponunt, ut sit
                    aliqua rerum selectio, quod nunc a me defenditur; Quae cum
                    praeponunt, ut sit aliqua rerum selectio, Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Sit hoc ultimum
                    bonorum, quod nunc a me defenditur; Quae cum praeponunt, ut
                    sit aliqua rerum selectio, naturam videntur sequi; In quibus
                    doctissimi illi veteres inesse quiddam caeleste et
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    hoc ultimum bonorum, quod nunc a me defenditur; Quae cum
                    praeponunt, ut sit aliqua rerum selectio, quod nunc a me
                    defenditur; Quae cum praeponunt, ut sit aliqua rerum
                    selectio, naturam videntur sequi; In quibus doctissimi illi
                    veteres inesse quiddam caeleste et
                  </p>
                </div>
                <div className="row ii-seller-info" style={{ padding: "15px" }}>
                  <div className="col-2 center-vertical">
                    <div>
                      <img
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        className="ii-userAvatar"
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/JaketheDog.png/220px-JaketheDog.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-7 center-vertical">
                    <div className="info-spacing">
                      <h3 className="ii-h3">Wei Qi Hia</h3>
                    </div>
                    <div className="info-spacing">
                      <h3 className="ii-h3">
                        Location: Simpang Ampat, P. Pinang
                      </h3>
                    </div>
                    <div className="info-spacing">
                      <h3 className="ii-h3">Joined: one month ago...</h3>
                    </div>
                  </div>
                  <div className="col-3 center-vertical">
                    <form action={`/user/${book.uploadedBy}`}>
                      <button type="submit"> Seller Info </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-3 ">
                <div className="ii-ads ii-border">
                  <h1 className="ii-h1">ads</h1>
                </div>
              </div>
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
          <div className="ii-horizontal-ads" style={{ marginTop: "40px" }}>
            ii-horizontal-ads
          </div>
        </section>
      </div>
    </>
  );
}

export default ShopItemInfo;
