import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BookRow from "./BookRow";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./LoadingSkeletonBookRow";

function ShopIndex() {
  const [books, setBooks] = useState([]);
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  useEffect(() => {
    axios.get("http://localhost:5000/allBooks").then((res) => {
      setBooks(res.data);//.slice(0, 10)
    });
  });
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
                        Book Recommended
                      </p>
                      {books.length > 0 ? (
                        books.map((book) => {
                          return <BookRow books={book} key={book._id} />;
                        })
                      ) : (
                        <React.Fragment>
                          {num.map((number, index) => {
                            return <LoadingSkeletonBookRow key={index} />;
                          })}
                        </React.Fragment>
                      )}

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
