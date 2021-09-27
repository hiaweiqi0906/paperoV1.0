import axios from "axios";
import React from "react";

function BookRowEditable(props) {
  const authToken = localStorage.getItem("authToken") || "empty";
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  function detectClick(){
    
    return false; // add this line
}

  function handleOnRemove(e) {
    // e.preventDefault()

    axios
      .post(
        "http://localhost:5000/users/removeFavourites&id=" + props.bookId,
        {},
        config
      )
      .then((res) => {
        if (res.data.statusCode === "200") {
          console.log("res.data");
        } else if (res.data.statusCode === "401") {
          // window.location.pathname = "/"
        }
      })
      .catch((err) => console.log(err));
    // axios.post('http://localhost:5000/removeFavourites&id='+props.bookId, {  })
    // console.log(props.bookId)
  }
  return (
    // <div
    //   className="container-fluid"
    //   style={{
    //     backgroundColor: " lightgrey",
    //     borderRadius: "5px",
    //     marginBottom: "10px",
    //   }}
    // >
    //   <div className="row">
    //     <div className="col-lg-2">
    //       <div className="mb-0 pb-6">
    //         <div className="p-4">
    //           <div className="text-center">
    //             <img
    //               style={{ width: "100px", height: "140px" }}
    //               src={props.books.coverImgUri}
    //               alt={props.books.bookTitle}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-8">
    //       <div className="mb-2 pb-6">
    //         <div className="p-4">
    //           <div className="text">
    //             <p className="h3 fw-bold mb-3 mx-1 mx-md-4 mt-6">
    //               {props.books.bookTitle}
    //             </p>
    //             <div className="form-group">
    //               <p className="h6 mb-4 mx-1 mx-md-4 mt-6">
    //                 {props.books.states}, {props.books.location}
    //               </p>
    //             </div>
    //             <div className="form-group">
    //               <p className="h4 fw-bold mb-4 mx-1 mx-md-4 mt-6">
    //                 {" "}
    //                 RM {props.books.price}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-2">
    //       <div className="mb-0 pb-6">
    //         <div className="p-5">
    //           <div className="text-center">
    //             <div className="mb-3 mx-1 mx-md-4 mt-6">
    //               <form action={"/view/" + props.books._id} method="get">
    //                 <button type="submit"> Open </button>
    //               </form>
    //               <form action={"/user/edit/" + props.books._id}>
    //                 <button type="submit"> Edit </button>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="col-2">
      <a
        href={"/view/" + props.books._id}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <div className="uhp-book-slot first-col">
          <div className="uhp-slot-img">
            <img
              className="uhp-img"
              src={props.books.coverImgUri}
              alt={props.books.bookTitle}
            />
          </div>
          <div className="uhp-item-title-and-uhp-price">
            <p className="uhp-slot-title">
              {props.books.bookTitle}aaa aaaa aaaaaaaaa aaaaaaaaa aaaaaa
              {props.books.bookTitle}
            </p>
            <div className="row">
              <div className="col-9">
                <p className="uhp-price">RM {props.books.price}</p>
              </div>
              <div className="col-3">
                <form action={"/user/edit/" + props.books._id}>
                <button type="submit" >
                  <i
                    style={{ borderRadius: "2px", color: "#91091e", zIndex: '3' }}
                    className="fas fa-pencil-alt"
                  ></i>
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default BookRowEditable;
