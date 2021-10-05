import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookRow from "./BookRow";
import "../../css/styles.css";
import LoadingIllustration from "./LoadingIllustration";
import NoResultIllustration from "./NoResultIllustration";
import FinishedIllustration from "./FinishedIllustration";
import ErrorIllustration from "./ErrorIllustration";
import useBookSearch from "../../components/useBookSearch";
import FilterSection from "../../components/FilterSection";

function MultipleType(props) {
  let { query } = useParams();
  query = query ? query : props.type;

  const allFilter = query ? query.split("&") : [];
  const filterObj = {};
  allFilter.map((filter) => {
    if (filter != "") {
      var objPair = filter.split("=");
      filterObj[objPair[0]] = objPair[1];
    }
  });
  query += "@@@@" + props.type;
  const [pageNumber, setPageNumber] = useState(1);

  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  let noResult = false;
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

  return (
    <>
      <FilterSection type={props.type} filter={filterObj} />
      <section id="other-books">
        <div className="other-books-from-this-seller">
          <div className="section-label">
            <h3 className="uf-h3 uf-section-title">
              {props.type === "uploadedRecently"
                ? "Uploaded Recently"
                : "Preferred Books"}
              :{" "}
            </h3>
          </div>
          <div className="">
            <div className="row gx-2 margin-top-30">
              {books.length > 0 &&
                books.map((book, index) => {
                  if (books.length === index + 1) {
                    return (
                      <React.Fragment key={book._id}>
                        <BookRow bookId={book._id} books={book} />

                        <div ref={lastBookElementRef}></div>
                      </React.Fragment>
                    );
                  }
                  return (
                    <BookRow bookId={book._id} books={book} key={book._id} />
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

export default MultipleType;
