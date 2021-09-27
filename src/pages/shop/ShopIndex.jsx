import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import BookRow from "./BookRow";
import "../../css/finalCss.css";
import LoadingSkeletonBookRow from "./LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";
import PreferredBookRow from "../../components/PreferredBookRow";
import UploadedRecentlyBookRow from "../../components/UploadedRecentlyBookRow";

function ShopIndex() {
  // const [books, setBooks] = useState([]);
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  const authToken = localStorage.getItem("authToken") || "empty";

  let query = "";
  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber);
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
  // useEffect(() => {
  //   axios.get("http://localhost:5000/allBooks").then((res) => {
  //     setBooks(res.data);//.slice(0, 10)
  //   });
  // });

  function handleOnCheckLogin() {
    if (authToken) {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      console.log("here");
      axios
        .get("http://localhost:5000/users/checkIsLoggedIn", config)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            // userInfos = (res.data.user)
            // if (!userInfo) setUserInfo(userInfos)
            console.log("200");
          } else if (res.status === 400) {
            console.log("400");
            localStorage.clear();
            window.location.pathname = "/";
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      {/* <div>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <button onClick={handleOnCheckLogin}>Check </button>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="">
                      <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Book Recommended
                      </p>
                      <div className="row gx-2 margin-top-30">
                        {books.length > 0 ? (
                        books.map((book, index) => {
                          if (books.length === index + 1) {
                            return (
                              <div ref={lastBookElementRef}>
                                <BookRow books={book} key={book._id} />
                              </div>
                            );
                          }
                          return <BookRow books={book} key={book._id} />;
                        })
                      ) : (
                        <React.Fragment>
                          {num.map((number, index) => {
                            return <LoadingSkeletonBookRow key={index} />;
                          })}
                        </React.Fragment>
                      )}
                      </div>
                      
                      {loading && <LoadingSkeletonBookRow />}
                      {error && <div>Error</div>}
                      {!hasMore && <div>Finished</div>}
                      {/* <%for(let i=0; i<books.length ; i++ ){%> */}

      {/* <%}%>   
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
   */}
      <section id="sid-banner-and-categories">
        <div className="sid-banner" style={{
        backgroundColor: "#efefef",
        width: "calc(100% + 18vw)",
        margin: "0 -9vw 0",
      }}>
          <div
            id="carouselExampleControls"
            className="sid-index-carousel slide carousel"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                style={{
                  margin: "0 5px",
                  background: "white",
                  width: "15px",
                  height: "15px",
                  padding: "0px",
                  border: "1px",
                  borderRadius: "50%",
                }}
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                style={{
                  margin: "0 5px",
                  background: "white",
                  width: "15px",
                  height: "15px",
                  padding: "0px",
                  border: "1px",
                  "border-radius": "50%",
                }}
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                style={{
                  margin: "0 5px",
                  background: "white",
                  width: "15px",
                  height: "15px",
                  padding: "0px",
                  border: "1px",
                  "border-radius": "50%",
                }}
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3500">
                <img
                  className="sid-img-carousel"
                  src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="3500">
                <img
                  className="sid-img-carousel"
                  src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="3500">
                <img
                  className="sid-img-carousel"
                  src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <section id="all-categories">
          <div className="sid-mt-80">
            <div className="section-label">
              <div className="row">
                <div className="col">
                  <h3 className="sid-h3 sid-section-title">Categories</h3>
                </div>
                <div className="col">
                  <h3
                    className="sid-h3 sid-section-title"
                    style={{ textAlign: "right" }}
                  >
                    See More
                  </h3>
                </div>
              </div>
            </div>
            <div className="">
              <div className="row g-2 margin-top-30">
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Arts & Music</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Biography</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Business</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Comics</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Computers & Tech</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Cooking</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Edu & Reference</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Entertainment</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Health & Fitness</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">History</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Hobbies & Crafts</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Home & Garden</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-2 margin-top-30">
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Horror</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Kids</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">
                        Literature & Fiction
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Medical</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Mysteries</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Parenting</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Religion</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Romance</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Sci-Fi & Fantasy</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Science & Math</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Self Help</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Social Sciences</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row g-2 margin-top-30"
                style={{ display: "none" }}
              >
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Sports</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Teen</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Travel</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">True Crime</p>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="sid-categories-slot first-col">
                    <div className="sid-slot-img" style={{ height: "auto" }}>
                      <img
                        src="https://cf.shopee.com.my/file/162a4fa24651d963e311b7065d587872"
                        className="sid-img"
                        alt=""
                      />
                    </div>
                    <div className="sid-item-title-and-sid-price">
                      <p className="sid-categories-text">Westerns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="preferred-book">
          <PreferredBookRow />
        </section>
        <section id="uploaded-recently">
          <UploadedRecentlyBookRow/>
        </section>
      </div>
    </>
  );
}

export default ShopIndex;
