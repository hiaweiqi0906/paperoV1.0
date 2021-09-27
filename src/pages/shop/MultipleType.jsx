import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookRow from "./BookRow";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./LoadingSkeletonBookRow";
import useBookSearch from "../../components/useBookSearch";
import FilterSection from "../../components/FilterSection";

function MultipleType(props) {
//   const { query } = useParams();
let { query } = useParams();
query = query ? query : props.type
// console.log(query)

  const allFilter = query ? query.split('&') : []
  const filterObj ={}
  allFilter.map((filter)=>{
    if(filter != ''){
      var objPair = filter.split('=')
      filterObj[objPair[0]] = objPair[1]
    }
  })
  // const query = '@@@@'+props.type
  query+='@@@@'+props.type
  console.log(query)
  const [pageNumber, setPageNumber] = useState(1);


  // const [books, setBooks] = useState([]);
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
    <><FilterSection type={props.type} filter={filterObj}/>
      <section id="other-books">
        <div className="other-books-from-this-seller">
          <div className="section-label">
            <h3 className="uf-h3 uf-section-title">{props.type === 'uploadedRecently' ? 'Uploaded Recently' : 'Preferred Books'}: </h3>
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
                    return <LoadingSkeletonBookRow key={index} />;
                  })}
                </React.Fragment>
              )}
            </div>
            {loading && <LoadingSkeletonBookRow />}
            {noResult && !loading && <p>No Results</p>}
            {error && <div>Error</div>}
            {!noResult && !hasMore && <div>Finished</div>}
          </div>
        </div>
      </section>
    </>
  );
}

export default MultipleType;
