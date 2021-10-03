import React, {useState, useEffect} from "react";
import axios from 'axios'
export default function VerticalAds() {
  const [adsUri, setAdsUri] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/getVerticalAds").then((res) => {
      setAdsUri(res.data.uri);
    });
  }, [adsUri]);
  return (
    <>
      {adsUri === "" ? (
        <div className="col-3 ">
          <div className="ii-ads ii-border" style={{padding: '0px'}}>
          <img className="ii-ads ii-border" style={{objectFit: 'contain', background: 'none', padding: '0px'}} src='https://res.cloudinary.com/papero/image/upload/v1633252390/verticalAds1_zzd8j2.png' alt="Papero Vertical Ads" />
          </div>
        </div>
      ) : (
        <div className="col-3 " style={{padding: '0px'}}>
          <div className="ii-ads ii-border" style={{padding: '0px'}}>
            <img className="ii-ads ii-border"style={{objectFit: 'contain', background: 'none', padding: '0px'}}  src={adsUri} alt="Papero Vertical Ads" />
          </div>
        </div>
      )}
    </>
  );
}
