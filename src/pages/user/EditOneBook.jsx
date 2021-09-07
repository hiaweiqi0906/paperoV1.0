import axios from "axios";
import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { Redirect, useParams } from "react-router-dom";
import TestLogin from "../index/TestLogin";
import StatesSelect from "../../components/StatesSelect";
import AreaSelect from "../../components/AreaSelect";

function EditOneBook(props) {
  const { bookId } = useParams();
  console.log(bookId);
  const [isNotPosted, setIsNotPosted] = useState(true);
  let statesChoice = -1;
  let areaLocationsChoice;
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({
    _id: "",
    areaLocations: "",
    coverImg: "",
    img1: "",
    img2: "",
    imgUri: [],
  });

  function handleOnChange(e) {
    const name = e.target.name;
    const value =
      name === "coverImg" || name === "img1" || name === "img2"
        ? e.target.files[0]
        : e.target.value;

    setData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleChangeSelect(name, value, statesChoices) {
    if (name === "states") {
      statesChoice = statesChoices;
      data.areaLocations = "";
    } else if (name === "areaLocations") areaLocationsChoice = statesChoices;

    setData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/view/" + bookId, config)
      .then((res) => {
        setData({
          ...res.data,
          areaLocations: res.data.location,
          coverImg: "",
          img1: "",
          img2: "",
        });
      })
      .catch((err) => console.log(err));
  }, [data._id]);

  function checkNoEmpty() {
    if (
      !data.bookTitle ||
      !data.price ||
      !data.description ||
      !data.category ||
      !data.bookLanguage ||
      !data.states ||
      !data.areaLocations ||
      !data.contactNumber
    ) {
      setErrorMsg("Please Enter All Required Fields! ");
      console.log(data);
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.coverImg || data.img1 || data.img2) {
      if (checkNoEmpty()) {
        try {
          let formData = new FormData();
          // formData.append("coverImg", data.coverImg);
          data.coverImg && formData.append("coverImg", data.coverImg);
          data.img1 && formData.append("img1", data.img1);
          data.img2 && formData.append("img2", data.img2);
          formData.append("_id", data._id);
          formData.append("bookTitle", data.bookTitle);
          formData.append("imageUri", data.imageUri);
          formData.append("imageId", data.imageId);
          formData.append("description", data.description);
          formData.append("category", data.category);
          formData.append("states", data.states);
          formData.append("year", data.year);
          formData.append("price", data.price);
          formData.append("location", data.areaLocations);
          formData.append("noTel", data.contactNumber);
          formData.append("whatsappLink", data.whatsappLink);
          formData.append("instagramLink", data.instagramLink);
          formData.append("messengerLink", data.messengerLink);
          formData.append("wechatLink", data.wechatLink);
          formData.append("bookLanguage", data.bookLanguage);
          formData.append("coverImgUri", data.coverImgUri);
          formData.append("coverImgId", data.bookLanguage);
          formData.append("uploadedBy", data.uploadedBy);
          formData.append("isbn", data.isbn);
          formData.append("coverType:", data.coverType);
          formData.append("quantity", data.quantity);
          formData.append("publishingCompany", data.publishingCompany);
          console.log(data);

          const res = await fetch(
            `http://localhost:5000/sellers/edit/${bookId}`,
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );
          if (res.ok) {
            setData({
              coverImg: "",
              img1: "",
              img2: "",
              title: "",
              price: "",
              description: "",
              categories: "",
              uploadedBy: "",
              publishingCompany: "",
              language: "",
              isbn: 0,
              coverType: "",
              year: "",
              quantity: 1,
              states: "",
              areaLocations: "",
              contactNumber: "",
              whatsappLink: "",
              messengerLink: "",
              wechatLink: "",
              instagramLink: "",
            });
            setIsNotPosted(false);
            window.location.pathname = "/";
            console.log("ok");
          }
        } catch (error) {
          console.log(error);
        }
      } 
    } else {
      if (checkNoEmpty()) {

        data.location = data.areaLocations;
        console.log("data", data);
        const config = {
          withCredentials: true,
          headers: {
          "Content-Type": "application/json",
        },
      };
      axios
      .post("http://localhost:5000/sellers/edit/" + bookId, data, config)
      .then((res) => {
        console.log(res.data)
          if (res.data.msg === "Book Updated") {
            window.location.pathname = "/";
          } else if (res.data.statusCode === "401") {
            window.location.pathname = "/"
          }
        })
        .catch((err) => console.log(err));
      }
    }
  };
  
  return (
    <section
      className="h-100 h-custom gradient-custom-2"
      style={{ backgroundColor: "#eee" }}
    >
      {errorMsg != "" && <p>{errorMsg}</p>}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5">Edit Book</h3>
                        <div className="row">
                          <div className="col-md-6 mb-2 pb-2">
                            <div className="custom-file mb-3">
                              <img
                                src={data.coverImgUri}
                                style={{ height: "100px", width: "100px" }}
                              />
                              <label
                                htmlFor="file"
                                className="custom-file-label"
                              >
                                {" "}
                                Choose Cover Photo:
                              </label>
                              <input
                                type="file"
                                name="coverImg"
                                onChange={handleOnChange}
                                id="file"
                                className="custom-file-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-2 pb-2">
                            <div className="custom-file mb-3">
                              <img
                                src={data.imageUri ? data.imageUri[0] : ""}
                                style={{ height: "100px", width: "100px" }}
                              />
                              <label
                                htmlFor="img1"
                                className="custom-file-label"
                              >
                                {" "}
                                Choose Photo 1:
                              </label>
                              <input
                                type="file"
                                name="img1"
                                id="file"
                                onChange={handleOnChange}
                                className="custom-file-input"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-2 pb-2">
                            <div className="custom-file mb-3">
                              <img
                                src={data.imageUri ? data.imageUri[1] : ""}
                                style={{ height: "100px", width: "100px" }}
                              />
                              <label
                                htmlFor="img2"
                                className="custom-file-label"
                              >
                                {" "}
                                Choose Photo 2:
                              </label>

                              <input
                                type="file"
                                name="img2"
                                id="file"
                                onChange={handleOnChange}
                                className="custom-file-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                id="bookTitle"
                                value={data.bookTitle}
                                onChange={handleOnChange}
                                name="bookTitle"
                                className="form-control"
                                placeholder="Enter Title"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-group">
                              <label htmlFor="price">Price</label>
                              <input
                                type="text"
                                id="price"
                                value={data.price}
                                onChange={handleOnChange}
                                name="price"
                                className="form-control"
                                placeholder="Enter Price"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                              type="text"
                              id="description"
                              value={data.description}
                              onChange={handleOnChange}
                              name="description"
                              className="form-control"
                              placeholder="Enter Description"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 mb-2 pb-2">
                            <div className="form-group">
                              <label htmlFor="category">Categories: </label>
                              <select
                                name="category"
                                id="categories"
                                className="form-control"
                                onChange={handleOnChange}
                                value={data.category}
                              >
                                <option
                                  value="none"
                                  defaultValue
                                  disabled
                                  hidden
                                >
                                  Select a Categories
                                </option>
                                <option value="Art">Art</option>
                                <option value="Fiction">Fiction</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4 mb-2 pb-2">
                            <div className="form-group">
                              <label htmlFor="bookLanguage">Language: </label>
                              <select
                                name="bookLanguage"
                                onChange={handleOnChange}
                                id="bookLanguage"
                                value={data.bookLanguage}
                                className="form-control"
                              >
                                <option
                                  value="none"
                                  defaultValue
                                  disabled
                                  hidden
                                >
                                  Select a Language
                                </option>
                                <option value="Chinese">Chinese</option>
                                <option value="English">English</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4 mb-2 pb-2">
                            <div className="form-group">
                              <label htmlFor="year">Year Published: </label>
                              <input
                                type="text"
                                id="year"
                                name="year"
                                value={data.year}
                                onChange={handleOnChange}
                                className="form-control"
                                placeholder="Enter Year Published"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 bg-indigo text-black">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5">Personal Details</h3>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            {/* <StatesSelect onChange={handleChangeSelect} /> */}
                            <StatesSelect
                              onChange={handleChangeSelect}
                              states={data.states}
                            />
                            {/* <label htmlFor="states">States: </label>
                            <select
                              name="states"
                              id="states"
                              onChange={handleOnChange}
                              className="form-control"
                            >
                              {/* <%
                                    var options = [ "Penang", "Johor" ];
                                    htmlFor ( var i = 0; i < options.length; i++ )
                                    {
                                        var selected = ( user.states == options[i] ) ? "selected" : "";
                                        %><option value="<%=options[ i ]%>" <%=selected %>><%=options[ i ] %></option><%
                                    }
                                    %> 
                            </select> */}
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            {/* <AreaSelect onChange={handleChangeSelect} /> */}
                            <AreaSelect
                              states={data.states}
                              userAreaLocation={data.areaLocations}
                              onChange={handleChangeSelect}
                            />{" "}
                            {/* <label htmlFor="location">Area Location</label>
                            <select
                              name="location"
                              onChange={handleOnChange}
                              id="location"
                              className="form-control"
                            >
                              {/* <%var options = [ "Simpang Ampat", "Butterworth" ];
                                        htmlFor ( var i = 0; i < options.length; i++ )
                                        {
                                            var selected = ( user.location == options[i]) ? "selected" : "";
                                            %><option value="<%=options[ i ]%>" <%=selected %>><%=options[ i ] %></option><%
                                        }
                                        %> 
                            </select> */}
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            <label htmlFor="contactNumber">
                              Contact Number:{" "}
                            </label>
                            <input
                              type="text"
                              id="contactNumber"
                              name="contactNumber"
                              value={"0" + data.contactNumber}
                              onChange={handleOnChange}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            <label htmlFor="whatsappLink">
                              Whatsapp Link:{" "}
                            </label>
                            <input
                              type="text"
                              id="whatsappLink"
                              name="whatsappLink"
                              value={data.whatsappLink}
                              onChange={handleOnChange}
                              className="form-control"
                              placeholder="Enter if you have one!"
                            />
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            <label htmlFor="instagramLink">
                              Instagram Link:{" "}
                            </label>
                            <input
                              type="text"
                              id="instagramLink"
                              name="instagramLink"
                              value={data.instagramLink}
                              onChange={handleOnChange}
                              className="form-control"
                              placeholder="Enter link if you have one!"
                            />
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            <label htmlFor="messengerLink">
                              Messenger Link:{" "}
                            </label>
                            <input
                              type="text"
                              id="messengerLink"
                              name="messengerLink"
                              value={data.messengerLink}
                              onChange={handleOnChange}
                              className="form-control"
                              placeholder="Enter if you have one!"
                            />
                          </div>
                        </div>

                        <div className="mb-4 pb-2">
                          <div className="form-outline form-white">
                            <label htmlFor="wechatLink">WeChat Link: </label>
                            <input
                              type="text"
                              id="wechatLink"
                              name="wechatLink"
                              value={data.wechatLink}
                              onChange={handleOnChange}
                              className="form-control"
                              placeholder="Enter if you have one!"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditOneBook;
