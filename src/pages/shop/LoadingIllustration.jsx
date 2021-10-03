import React from "react";

function LoadingIllustration(props) {
  return (
    <>
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-6">
          <img
            src="https://res.cloudinary.com/papero/image/upload/v1633231005/searching_any7cs.svg"
            className="img-register"
            style={{ height: "200px", marginRight: "-100px" }}
            alt=""
          />
        </div>
        <div className="col-6">
          <h1 style={{ marginTop: "70px" }}>Loading...</h1>
        </div>
      </div>
    </>
  );
}

export default LoadingIllustration;
