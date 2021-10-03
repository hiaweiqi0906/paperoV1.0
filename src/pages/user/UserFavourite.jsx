import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import BookRowFavourites from "./../shop/BookRowFavourites";
import "../../css/styles.css";
import LoadingIllustration from "../shop/LoadingIllustration";
import NoResultIllustration from "../shop/NoResultIllustration";
import FinishedIllustration from "../shop/FinishedIllustration";
import ErrorIllustration from "../shop/ErrorIllustration";
import useBookSearch from "../../components/useBookSearch";
import HorizontalAds from "../../components/HorizontalAds";

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
      <section id="other-books">
      <HorizontalAds />
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
                      <BookRowFavourites
                        ref={lastBookElementRef}
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
                    return <LoadingIllustration key={index} />;
                  })}
                </React.Fragment>
              )}
            </div>
            {loading && <LoadingIllustration />}
            {noResult && !loading  && !error && <NoResultIllustration />}
            {error && <ErrorIllustration />}
            {!noResult && !hasMore && <FinishedIllustration />}
          </div>
        </div>
      </section>
    </>
  );
}
