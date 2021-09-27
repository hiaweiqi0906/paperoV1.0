import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import BookRowFavourites from "./../shop/BookRowFavourites";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./../shop/LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";

export default function UserFavourite() {
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [pageNumber, setPageNumber] = useState(1);
  let noResult = false;

  let query = "@@@@userFavourite";
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

  return (
    <>
      {/* <div>
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
          <div className="container-fluid py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="">
                        <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Favourite Books
                        </p>
                        <div className="row gx-2 margin-top-30">
                          {books.length > 0 &&
                            books.map((book, index) => {
                              if (books.length === index + 1) {
                                return (
                                  <div ref={lastBookElementRef}>
                                    <BookRowFavourites
                                      bookId={book._id}
                                      books={book}
                                      key={book._id}
                                    />
                                  </div>
                                );
                              }
                              return (
                                <BookRowFavourites
                                  bookId={book._id}
                                  books={book}
                                  key={book._id}
                                />
                              );
                            })}
                          {books.length == 0 && !noResult && (
                            <React.Fragment>
                              {num.map((number, index) => {
                                return <LoadingSkeletonBookRow key={index} />;
                              })}
                            </React.Fragment>
                          )}
                        </div>
                        {loading && <LoadingSkeletonBookRow />}
                        {noResult && !loading && <p>No Results</p>}
                        {error && <div>Error</div>}
                        {!noResult && !hasMore && <div>Finished</div>}
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
      </div> */}

      <section id="other-books">
        <div className="other-books-from-this-seller">
          <div className="section-label">
            <h3 className="uf-h3 uf-section-title">Your Favourite List</h3>
          </div>
          <div className="">
            <div className="row gx-2 margin-top-30">
              {books.length > 0 &&
                books.map((book, index) => {
                  if (books.length === index + 1) {
                    return (
                      
                        <BookRowFavourites ref={lastBookElementRef}
                          bookId={book._id}
                          books={book}
                          key={book._id}
                        />
                      
                    );
                  }
                  return (
                    <BookRowFavourites
                      bookId={book._id}
                      books={book}
                      key={book._id}
                    />
                  );
                })}
              {books.length == 0 && !noResult && (
                <React.Fragment>
                  {num.map((number, index) => {
                    return <LoadingSkeletonBookRow key={index} />;
                  })}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
