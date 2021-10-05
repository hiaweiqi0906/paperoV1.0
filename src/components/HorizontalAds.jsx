import React, { useState, useEffect } from "react";
import axios from "axios";
export default function HorizontalAds() {
  const [adsUri, setAdsUri] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/getHorizontalAds").then((res) => {
      setAdsUri(res.data.uri);
    });
  }, [adsUri]);
  return (
    <>
      {adsUri === "" ? (
        <div className="ii-horizontal-ads" style={{ marginTop: "40px" }}>
          <img
            className="ii-horizontal-ads"
            style={{ objectFit: "contain", background: "none" }}
            src="https://res.cloudinary.com/papero/image/upload/v1633252390/horizontalAds1_bfif4h.png"
            alt="Papero Horizontal Ads"
          />
        </div>
      ) : (
        <div className="ii-horizontal-ads" style={{ marginTop: "40px" }}>
          <img
            className="ii-horizontal-ads"
            style={{ objectFit: "contain", background: "none" }}
            src={adsUri}
            alt="Papero Horizontal Ads"
          />
        </div>
      )}
    </>
  );
}
