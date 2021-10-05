import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import "../../css/finalCss.css";
import useBookSearch from "../../components/useBookSearch";
import PreferredBookRow from "../../components/PreferredBookRow";
import UploadedRecentlyBookRow from "../../components/UploadedRecentlyBookRow";
import BannerComponent from "../../components/BannerComponent";

function ShopIndex() {
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [categorySectionTitle, setCategorySectionTitle] =
    useState("Categories");
  const [seeAllOrClose, setSeeAllOrClose] = useState("See More");
  const authToken = localStorage.getItem("authToken") || "empty";
  const [triggerDisplay, setTriggerDisplay] = useState({ display: "none" });
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
            return prevValue + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleOnCheckLogin() {
    if (authToken) {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      axios
        .get("http://localhost:5000/users/checkIsLoggedIn", config)
        .then((res) => {
          if (res.status === 200) {
          } else if (res.status === 400) {
            localStorage.clear();
            window.location.pathname = "/";
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSeeAllCategories() {
    if (categorySectionTitle != "All Categories") {
      setCategorySectionTitle("All Categories");
      setTriggerDisplay({});
      setSeeAllOrClose("Close");
    } else {
      setCategorySectionTitle("Categories");
      setTriggerDisplay({ display: "none" });
      setSeeAllOrClose("See More");
    }
  }
  return (
    <>
      <section id="sid-banner-and-categories">
        <BannerComponent />
      </section>
      <div className="container">
        <section id="all-categories">
          <div className="sid-mt-80">
            <div className="section-label">
              <div className="row">
                <div className="col">
                  <h3 className="sid-h3 sid-section-title">
                    {categorySectionTitle}
                  </h3>
                </div>
                <div className="col">
                  <a
                    href="#all-categories"
                    onClick={handleSeeAllCategories}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <h3
                      className="sid-h3 sid-section-title"
                      style={{ textAlign: "right" }}
                    >
                      {seeAllOrClose}
                    </h3>
                  </a>
                </div>
              </div>
            </div>
            <div className="">
              <div className="row g-2 margin-top-30">
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Arts %26 Music"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i
                          class="fas fa-palette fa-3x"
                          style={{ width: "auto", margin: "0 auto" }}
                        ></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Arts & Music</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Biography"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-atlas fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Biography</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Business"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-briefcase fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Business</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Comics"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-bolt fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Comics</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Computers %26 Tech"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-tv fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Computers & Tech</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Cooking"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-cookie-bite fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Cooking</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Edu %26 Reference"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-university fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Edu & Reference</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Entertainment"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-gamepad fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Entertainment</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Health %26 Fitness"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-clinic-medical fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Health & Fitness</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=History"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-hourglass-half fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">History</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Hobbies %26 Crafts"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-mitten fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Hobbies & Crafts</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Home %26 Garden"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-seedling fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Home & Garden</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row g-2 margin-top-30">
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Horror"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-ghost fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Horror</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Kids"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-baby fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Kids</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Literature %26 Fiction"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-broom fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">
                          Literature & Fiction
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Medical"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-pills fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Medical</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Mysteries"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-binoculars fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Mysteries</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Parenting"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-chalkboard-teacher fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Parenting</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Religion"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-star-and-crescent fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Religion</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Romance"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-hand-holding-heart fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Romance</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Sci-Fi %26 Fantasy"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-helicopter fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Sci-Fi & Fantasy</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Science %26 Math"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-drafting-compass fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Science & Math</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Self Help %26 Improments"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-hands-helping fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">
                          Self Help & Improments
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Social Sciences"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-user-friends fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Social Sciences</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row g-2 margin-top-30" style={triggerDisplay}>
                <div className="col-md-1 col-3 disappear-mobile"></div>
                <div className="col-md-1 col-3 disappear-mobile"></div>
                <div className="col-md-1 col-3 disappear-mobile"></div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Sports"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-basketball-ball fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Sports</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Teen"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-child fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Teen</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Travel"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-suitcase-rolling fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Travel</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=True Crime"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-user-secret fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">True Crime</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-1 col-3">
                  <a
                    href="/search/search=&category=Westerns"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="sid-categories-slot first-col">
                      <div className="sid-slot-img-category">
                        <i class="fas fa-hat-cowboy fa-3x"></i>
                      </div>
                      <div className="sid-item-title-and-sid-price">
                        <p className="sid-categories-text">Westerns</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="preferred-book">
          <PreferredBookRow />
        </section>
        <section id="uploaded-recently">
          <UploadedRecentlyBookRow />
        </section>
      </div>
    </>
  );
}

export default ShopIndex;
