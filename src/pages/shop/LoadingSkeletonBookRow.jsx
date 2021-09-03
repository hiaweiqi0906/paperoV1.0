import React, { useState } from "react";

function LoadingSkeletonBookRow(props) {
  
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
                <div className="text-center skeleton">
                  <img
                    style={{
                      width: "100px",
                      height: "140px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="mb-2 pb-6">
              <div className="p-4">
                <div className="text">
                  <div className="skeleton">
                    <p className="h3 fw-bold mb-3 mx-1 mx-md-4 mt-6 transparent">
                      Title
                    </p>
                  </div>
                  <div className="form-group skeleton">
                    <p className="h6 mb-4 mx-1 mx-md-4 mt-6 transparent">
                      Location
                    </p>
                  </div>
                  <div className="form-group skeleton">
                    <p className="h4 fw-bold mb-4 mx-1 mx-md-4 mt-6 transparent">
                      {" "}
                      MYR 12.99
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
                    <form action="/view/book" method="get">
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

export default LoadingSkeletonBookRow;
