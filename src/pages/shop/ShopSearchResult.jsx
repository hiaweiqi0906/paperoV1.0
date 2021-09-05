import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookRow from "./BookRow";
import "../../css/styles.css";
import LoadingSkeletonBookRow from "./LoadingSkeletonBookRow";


function ShopIndex() {
  const { query } = useParams();
  console.log(query);

  const [books, setBooks] = useState([]);
  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/search=" + query).then((res) => {
      setBooks(res.data); //.slice(0, 10)
      if (books.length == 0) setNoResult(true);
      else setNoResult(false);
    });
  });


  /**
   * 
   * const obj = {
   * woidth: '8px',
   * height: '10px"
   * }    backgroundColor
  */
  return (
    <div>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">

              <div className="row">
                {/* <div className="col-lg-2 mb-4">
                  <div className="card text-black" style={{ borderRadius:"25px" }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="p-3">
                          <div className="mb-4">
                            <form>
                              <p class="h4 fw-bold">Categories</p> <br />
                              <input type="checkbox" /><span>&emsp;Sci-Fi</span> <br />
                              <input type="checkbox" /><span>&emsp;Fantasy</span> <br />
                              <input type="checkbox" /><span>&emsp;Mystery</span> <br />
                              <input type="checkbox" /><span>&emsp;Romance</span> <br /> <br /> <br />

                              <p class="h4 fw-bold">Price</p> <br />
                              <input type="checkbox" /><span>&emsp;RM0 - RM10</span> <br />
                              <input type="checkbox" /><span>&emsp;RM10 - RM20</span> <br />
                              <input type="checkbox" /><span>&emsp;RM20 - RM30</span> <br />
                              <input type="checkbox" /><span>&emsp;RM30 - RM40</span> <br />
                              <input type="checkbox" /><span>&emsp;RM40 and above</span> <br /> <br /> <br />
                              <button type="submit">Apply</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="col-lg-12">
                  <div className="card text-black" style={{ borderRadius: "25px" }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="content-sidebar">
                          <div className="col">
                            <div className="card-body p-md-5">
                              <div className="row justify-content-center">
                                <div className="p-3">
                                  <div className="mb-5">
                                    <br /> <br /> 
                                    <div
                                    className="container-fluid"
                                    style={{
                                      backgroundColor: " lightgrey",
                                      borderRadius: "5px",
                                      marginBottom: "10px",
                                    }}
                                    >
                                      <div className="p-3">
                                        <form>
                                          <p class="h4 fw-bold">Categories</p> <br />
                                          <input type="checkbox" /><span>&emsp;Sci-Fi</span> <br />
                                          <input type="checkbox" /><span>&emsp;Fantasy</span> <br />
                                          <input type="checkbox" /><span>&emsp;Mystery</span> <br />
                                          <input type="checkbox" /><span>&emsp;Romance</span> <br /> <br /> <br />

                                          <p class="h4 fw-bold">Price</p> <br />
                                          <input type="checkbox" /><span>&emsp;RM0 - RM10</span> <br />
                                          <input type="checkbox" /><span>&emsp;RM10 - RM20</span> <br />
                                          <input type="checkbox" /><span>&emsp;RM20 - RM30</span> <br />
                                          <input type="checkbox" /><span>&emsp;RM30 - RM40</span> <br />
                                          <input type="checkbox" /><span>&emsp;RM40 and above</span> <br /> <br /> <br />
                                          <div className="text-center">
                                            <button type="submit">Apply</button>
                                          </div>
                                        </form>
                                      </div>  
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                          <div className="">
                          <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Search Result:
                          </p>  
                          {books.length > 0 &&
                            books.map((book) => {
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

                          {/* <%for(let i=0; i<books.length ; i++ ){%> */}

                          {/* <%}%>   */}
                        </div>
                          </div>
                        </div>
                        
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
                      </div>
                    </div>
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
