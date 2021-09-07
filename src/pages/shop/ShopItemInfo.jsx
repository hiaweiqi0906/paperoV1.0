import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ShopItemInfo(props) {
  const [book, setBook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:5000/view/" + id).then((res) => {
      setBook(res.data);
      console.log(book)
    });
  }, [book.bookTitle]);

  function handleOnSubmitFavouriteList(e){
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post('http://localhost:5000/users/addFavourites&id='+book._id, {}, config)
      .then((res) => {
        if (res.data.statusCode === '200') {

          console.log('res.data')

        } else if(res.data.statusCode === '401'){

          // window.location.pathname = "/"

        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {book.bookTitle ? (
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
          <div className="container-fluid py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div
                  className="card card-registration my-4"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row g-0">
                      <form action={`/user/${book.uploadedBy}`}>
                        <button type="submit"> Seller Info </button>
                      </form>
                      <form onSubmit={handleOnSubmitFavouriteList}>
                        <button type="submit"> Add to Wishlist </button>
                      </form>
                      <div className="col-lg-4">
                        <div className="p-5">
                          <div className="text-center circle-img img-circle mb-4 pb-6">
                            <img
                              src={book.coverImgUri}
                              style={{ width: "250px", height: "350px" }}
                            />
                          </div>
                          {/* <%for(var i=1; i<4; i++){%>
                            <%if(files[i]){%> */}
                            
                          <div className="custom-file mb-3">
                            {book.imageUri.map((img, index) => {
                              return <img
                              key={index}
                              style={{ width: "100px", height: "140px", marginRight: '15px' }}
                              src={img}
                              alt=""
                            />
                            })}
                            
                          </div>
                          {/* <%}%>
                        <%}%> */}
                        </div>
                      </div>
                      <div className="col-lg-8 bg-indigo text-black">
                        <div className="p-5">
                          <div className="form-group">
                            <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                              {book.bookTitle}
                            </p>
                          </div>

                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h6 mb-2 mx-1 mx-md-4 mt-4">
                                {book.states}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h5 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                                {book.location}
                              </p>
                            </div>
                          </div>
                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h3 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                                RM {book.price}
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "lightgray",
                                padding: "20px 135px",
                              }}
                            >
                              <a style={{ color: "floralwhite" }}>
                                Add To Wishlist
                              </a>
                            </button>
                            <p></p>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "black",
                                padding: "20px 145px",
                              }}
                            >
                              <a style={{ color: "floralwhite" }}>
                                Contact : {book.contactNumber}
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <div
                      className="container-fluid"
                      style={{
                        backgroundColor: "lightgrey",
                        borderRadius: "25px",
                      }}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className=" mb-4 pb-6">
                            <div className="p-5">
                              <p className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-6">
                                Description
                              </p>
                              <p className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                {book.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-4 pb-6">
                            <div className="p-5">
                              <p className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-6">
                                Specification
                              </p>
                              <p className="h6 mb-4 mx-1 mx-md-4 mt-6"></p>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Category : {book.category}
                                </li>
                              </div>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Language : {book.bookLanguage}
                                </li>
                              </div>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Year Published : {book.year}
                                </li>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
          <div className="container-fluid py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div
                  className="card card-registration my-4"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row g-0">
                      <form>
                        <button type="submit"> Seller Info </button>
                      </form>
                      <form>
                        <button type="submit"> Add to Wishlist </button>
                      </form>
                      <div className="col-lg-4">
                        <div className="p-5">
                          <div className="text-center circle-img img-circle mb-4 pb-6">
                            <img
                              src="<%= files[0]%>"
                              style={{ width: "250px", height: "350px" }}
                            />
                          </div>
                          {/* <%for(var i=1; i<4; i++){%>
                            <%if(files[i]){%> */}
                          <div className="custom-file mb-3">
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="<%= files[i]%>"
                              alt=""
                            />
                          </div>
                          {/* <%}%>
                        <%}%> */}
                        </div>
                      </div>
                      <div className="col-lg-8 bg-indigo text-black">
                        <div className="p-5">
                          <div className="form-group">
                            <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                              Title
                            </p>
                          </div>

                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h6 mb-2 mx-1 mx-md-4 mt-4">
                                State
                              </p>
                            </div>
                          </div>

                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h5 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                                Location
                              </p>
                            </div>
                          </div>
                          <div className="mb-4 pb-2">
                            <div className="form-group">
                              <p className="text-center h3 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                                RM 12.99{" "}
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "lightgray",
                                padding: "20px 135px",
                              }}
                            >
                              <a style={{ color: "floralwhite" }}>
                                Add To Wishlist
                              </a>
                            </button>
                            <p></p>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "black",
                                padding: "20px 145px",
                              }}
                            >
                              <a style={{ color: "floralwhite" }}>
                                Contact : 0123456789
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <div
                      className="container-fluid"
                      style={{
                        backgroundColor: "lightgrey",
                        borderRadius: "25px",
                      }}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className=" mb-4 pb-6">
                            <div className="p-5">
                              <p className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-6">
                                Description
                              </p>
                              <p className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                This is a book
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-4 pb-6">
                            <div className="p-5">
                              <p className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-6">
                                Specification
                              </p>
                              <p className="h6 mb-4 mx-1 mx-md-4 mt-6"></p>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Category : Art
                                </li>
                              </div>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Language : English
                                </li>
                              </div>
                              <div className="form-group">
                                <li className="h6 mb-4 mx-1 mx-md-4 mt-6">
                                  Year Published : 2021
                                </li>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>
  );
}

export default ShopItemInfo;
