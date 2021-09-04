import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookRow from "./BookRow";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";

function ShopIndex() {
  const { query } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  // const [books, setBooks] = useState([]);
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [noResult, setNoResult] = useState(false);

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
  //   axios.get("http://localhost:5000/search=" + query).then((res) => {
  //     setBooks(res.data); //.slice(0, 10)
  //     if (books.length == 0) setNoResult(true);
  //     else setNoResult(false);
  //   });
  // });

  return (
    <div>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="">
                      <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Search Result:
                      </p>
                      {books.length > 0 &&
                        books.map((book, index) => {
                          if (books.length === index + 1) {
                            return (
                              <div ref={lastBookElementRef}>
                                <BookRow books={book} key={book._id} />
                              </div>
                            );
                          }
                          return <BookRow books={book} key={book._id} />;
                        })}

                      {books.length == 0 && !noResult && (
                        <React.Fragment>
                          {num.map((number, index) => {
                            return <LoadingSkeletonBookRow key={index} />;
                          })}
                        </React.Fragment>
                      )}

                      {noResult && books.length == 0 && <p>No Results</p>}
                      {loading && <LoadingSkeletonBookRow />}
                      {error && <div>Error</div>}
                      {!hasMore && <div>Finished</div>}
                      {/* <%for(let i=0; i<books.length ; i++ ){%> */}

                      {/* <%}%>   */}
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
  );
}

export default ShopIndex;
