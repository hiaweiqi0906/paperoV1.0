import React from "react";

function FinishedIllustration(props) {
  return (
    <>
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-6">
          <img
            src="https://res.cloudinary.com/papero/image/upload/v1633233446/finish_d0vne7.svg"
            className="img-register"
            style={{ height: "200px", marginRight: "-10px" }}
            alt=""
          />
        </div>
        <div className="col-6">
          <h1 style={{ marginTop: "70px" }}>No More Result...</h1>
        </div>
      </div>
    </>
  );
}

export default FinishedIllustration;
