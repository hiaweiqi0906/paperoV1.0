import axios from "axios";
import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { Redirect } from "react-router-dom";
import TestLogin from "./../index/TestLogin";
import StatesSelect from "../../components/StatesSelect";
import AreaSelect from "../../components/AreaSelect";

function UploadBook(props) {
  const [isNotPosted, setIsNotPosted] = useState(true);
  let statesChoice=-1;
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState({
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
    location: "",
    contactNumber: "",
    whatsappLink: "",
    messengerLink: "",
    wechatLink: "",
    instagramLink: "",
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

  function handleChangeSelect(name, value, statesChoices){
    
    if (name==='states') statesChoice = statesChoices
console.log(statesChoice)
    setData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  // useEffect(()=>{
  //     console.log('updated')
  // })

  function checkNoEmpty(){
    if(!data.coverImg || !data.title || !data.price || !data.description || !data.categories || !data.language || !data.states || !data.location || !data.contactNumber){
      setErrorMsg('Please Enter All Required Fields! ')
      console.log(data)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(checkNoEmpty()){
      try {
        let formData = new FormData();
        formData.append("coverImg", data.coverImg);
        formData.append("img1", data.img1);
        formData.append("img2", data.img2);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("categories", data.categories);
        formData.append("states", data.states);
        formData.append("year", data.year);
        formData.append("location", data.location);
        formData.append("contactNumber", data.contactNumber);
        formData.append("whatsappLink", data.whatsappLink);
        formData.append("instagramLink", data.instagramLink);
        formData.append("messengerLink", data.messengerLink);
        formData.append("wechatLink", data.wechatLink);
        formData.append("language", data.language);
        console.log(data);
  
        const res = await fetch(`http://localhost:5000/sellers/upload`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
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
            location: "",
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
    }else{

    }
    
    
  };
  //   const res = await fetch(`http://localhost:5000/tryupload`, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (res.ok) {
  //       console.log('ok')
  //     // setData({ name: "", image: "" });
  //     // history.replace("/");
  //   }
  // const config = {
  //     withCredentials: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  // axios
  // .post("http://localhost:5000/tryupload", data, config)
  // .then((res) => {
  //   if (res.status === 200) {
  //       console.log('ok', res.data)
  //   }else{
  //     console.log('not ok', res.data)

  //   }
  // })
  // .catch((err) => console.log(err));

  return (
    <section
      className="h-100 h-custom gradient-custom-2"
      style={{ backgroundColor: "#eee" }}
    >
      {errorMsg!='' && <p>{errorMsg}</p>}
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
                        <h3 className="fw-normal mb-5">Upload Book</h3>
                        <div className="row">
                          <div className="col-md-6 mb-2 pb-2">
                            <div className="custom-file mb-3">
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
                              <label
                                htmlFor="file"
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
                              <label
                                htmlFor="file"
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
                                id="title"
                                value={data.title}
                                onChange={handleOnChange}
                                name="title"
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
                              <label htmlFor="categories">Categories: </label>
                              <select
                                name="categories"
                                id="categories"
                                className="form-control"
                                onChange={handleOnChange}
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
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4 mb-2 pb-2">
                            <div className="form-group">
                              <label htmlFor="language">Language: </label>
                              <select
                                name="language"
                                onChange={handleOnChange}
                                id="language"
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
                            <StatesSelect onChange={handleChangeSelect}/>
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
                          <AreaSelect onChange={handleChangeSelect}/>
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
                              value={data.contactNumber}
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

export default UploadBook;
