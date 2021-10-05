import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BannerComponent() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/getBanner").then((res) => {
      setAds(res.data);
    });
  }, [ads.length]);
  return (
    <>
      {ads.length === 0 ? (
        <div
          className="sid-banner"
          style={{
            backgroundColor: "#efefef",
            width: "calc(100% + 18vw)",
            margin: "0 -9vw 0",
          }}
        >
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
                  borderRadius: "50%",
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
                  borderRadius: "50%",
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
                  src="https://res.cloudinary.com/papero/image/upload/v1633251943/banner1_g6vjen.png"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="3500">
                <img
                  className="sid-img-carousel"
                  src="https://res.cloudinary.com/papero/image/upload/v1633251943/banner1_g6vjen.png"
                  alt="..."
                />
              </div>
              <div className="carousel-item" data-bs-interval="3500">
                <img
                  className="sid-img-carousel"
                  src="https://res.cloudinary.com/papero/image/upload/v1633251943/banner1_g6vjen.png"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="sid-banner"
          style={{
            backgroundColor: "#efefef",
            width: "calc(100% + 18vw)",
            margin: "0 -9vw 0",
          }}
        >
          <div
            id="carouselExampleControls"
            className="sid-index-carousel slide carousel"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {ads.map((ads, index) => {
                if (index === 0) {
                  return (
                    <button
                      type="button"
                      key={index}
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
                      aria-label="Slide 0"
                    ></button>
                  );
                } else {
                  return (
                    <button
                      key={index}
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
                      data-bs-slide-to={index}
                      aria-label={`Slide ${index}`}
                    ></button>
                  );
                }
              })}
            </div>
            <div className="carousel-inner">
              {ads.map((ads, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={index}
                      className="carousel-item active"
                      data-bs-interval="3500"
                    >
                      <img
                        className="sid-img-carousel"
                        src={ads.imgUri}
                        alt="..."
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="carousel-item"
                      data-bs-interval="3500"
                    >
                      <img
                        className="sid-img-carousel"
                        src={ads.imgUri}
                        alt="..."
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
