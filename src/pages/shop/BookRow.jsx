import React from "react";

function BookRow(props) {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: " lightgrey",
        borderRadius: "5px",
        marginBottom: "10px",
      }}
    >
      <div className="row">
        <div className="col-lg-2">
          <div className="mb-0 pb-6">
            <div className="p-4">
              <div className="text-center">
                <img
                  style={{ width: "100px", height: "140px" }}
                  src={props.books.coverImgUri}
                  alt={props.books.bookTitle}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="mb-2 pb-6">
            <div className="p-4">
              <div className="text">
                <p className="h3 fw-bold mb-3 mx-1 mx-md-4 mt-6">
                  {props.books.bookTitle}
                </p>
                <div className="form-group">
                  <p className="h6 mb-4 mx-1 mx-md-4 mt-6">
                    {props.books.states}, {props.books.location}
                  </p>
                </div>
                <div className="form-group">
                  <p className="h4 fw-bold mb-4 mx-1 mx-md-4 mt-6">
                    {" "}
                    RM {props.books.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="mb-0 pb-6">
            <div className="p-5">
              <div className="text-center">
                <div className="mb-3 mx-1 mx-md-4 mt-6">
                  <form action={"/view/"+props.books._id} method="get">
                    <button type="submit"> Open </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default BookRow;
