import React, { useEffect, useState } from "react";
import axios from "axios";
import StatesSelect from "../../components/StatesSelect";
import AreaSelect from "../../components/AreaSelect";
import "../../css/finalCss.css";
function UserSetting(props) {
  const authToken = localStorage.getItem("authToken") || "empty";
  const [avatarUri, setAvatarUri] = useState("");
  const [states, setStates] = useState([
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ]);

  const [passwordError, setPasswordError] = useState("");
  const [areaLocations, setAreaLocations] = useState([
    [
      "Ayer Baloi",
      "Ayer Hitam",
      "Bakri",
      "Batu Anam",
      "Batu Pahat",
      "Bekok",
      "Benut",
      "Bukit Gambir",
      "Bukit Pasir",
      "Chaah",
      "Endau",
      "Gelang Patah",
      "Gerisek",
      "Gugusan Taib Andak",
      "Jementah",
      "Johor Bahru",
      "Kahang",
      "Kampung Kenangan Tun Dr Ismail",
      "Kluang",
      "Kota Tinggi",
      "Kukup",
      "Kulai",
      "Labis",
      "Layang Layang",
      "Masai",
      "Mersing",
      "Muar",
      "Iskandar Puteri",
      "Pagoh",
      "Paloh",
      "Panchor",
      "Parit Jawa",
      "Parit Raja",
      "Parit Sulong",
      "Pasir Gudang",
      "Pekan Nanas",
      "Pengerang",
      "Permas Jaya",
      "Plentong",
      "Pontian",
      "Rengam",
      "Rengit",
      "Segamat",
      "Semerah",
      "Senai",
      "Senggarang",
      "Senibong",
      "Seri Gading",
      "Setia Indah",
      "Setia Tropika",
      "Simpang Rengam",
      "Skudai",
      "Sungai Mati",
      "Tampoi",
      "Tangkak",
      "Ulu Tiram",
      "Yong Peng",
      "Others",
    ],
    [
      "Alor Setar",
      "Ayer Hitam",
      "Baling",
      "Bandar Baharu",
      "Bukit Kayu Hitam",
      "Changloon",
      "Guar Chempedak",
      "Gurun",
      "Jitra",
      "Karangan",
      "Kepala Batas",
      "Kodiang",
      "Kota Sarang Semut",
      "Kuala Kedah",
      "Kuala Ketil",
      "Kuala Muda",
      "Kuala Nerang",
      "Kubang Pasu",
      "Kulim",
      "Lunas",
      "Merbok",
      "Padang Serai",
      "Padang Terap",
      "Pendang",
      "Pokok Sena",
      "Pulau Langkawi",
      "Serdang",
      "Sik",
      "Simpang Empat",
      "Sungai Petani",
      "University Utara",
      "Yan",
      "Bedong",
      "Langgar",
    ],
    [
      "Ayer Lanas",
      "Bachok",
      "Cherang Ruku",
      "Dabong",
      "Gua Musang",
      "Jeli",
      "Kem Desa Pahwalan",
      "Ketereh",
      "Kok Lanas",
      "Kota Bharu",
      "Kuala Balah",
      "Kuala Kerai",
      "Kubang Kerian",
      "Machang",
      "Melor",
      "Pasir Mas",
      "Pasir Puteh",
      "Pulai Chondong",
      "Rantau Panjang",
      "Selising",
      "Tanah Merah",
      "Tawang",
      "Temangan",
      "Tumpat",
      "Wakaf Baru",
    ],
    [
      "Ampang Hilir",
      "Bandar Damai Perdana",
      "Bandar Menjalara",
      "Bandar Tasik Selatan",
      "Bangsar",
      "Bangsar South",
      "Batu",
      "Brickfields",
      "Bukit Bintang",
      "Bukit Jalil",
      "Bukit Ledang",
      "Bukit Persekutuan",
      "Bukit Tunku",
      "Cheras",
      "City Centre",
      "Country Heights",
      "Country Heights Damansara",
      "Damansara",
      "Damansara Heights",
      "Desa Pandan",
      "Desa ParkCity",
      "Desa Petaling",
      "Gombak",
      "Jalan Ampang",
      "Jalan Ipoh",
      "Jalan Kuching",
      "Jalan Sultan Ismail",
      "Jinjang",
      "Kenny Hills",
      "Kepong",
      "Keramat",
      "KL City",
      "KL Sentral",
      "KLCC",
      "Kuchai Lama",
      "Mid Valley City",
      "Mont Kiara",
      "Old Klang Road",
      "OUG",
      "Pandan Indah",
      "Pandan Jaya",
      "Pandan Perdana",
      "Pantai",
      "Pekan Batu",
      "Puchong",
      "Salak Selatan",
      "Segambut",
      "Sentul",
      "Seputeh",
      "Serdang",
      "Setapak",
      "Setia Eco Park",
      "Setiawangsa",
      "Solaris Dutamas",
      "Sri Damansara",
      "Sri Hartamas",
      "Sri Petaling",
      "Sungai Besi",
      "Sungai Penchala",
      "Taman Desa",
      "Taman Duta",
      "Taman Melawati",
      "Taman Tun Dr Ismail",
      "Taman Permata",
      "Titiwangsa",
      "TPM",
      "Wangsa Maju",
    ],
    [
      "Batu Arang",
      "Batu Manikar",
      "Bebuloh",
      "Belukut",
      "Bukit Kalam",
      "Bukit Kuda",
      "Durian Tunjung",
      "Ganggarak / Merinding",
      "Gersik / Saguking / Jawa / Parit",
      "Kilan / Kilan Pulau Akar",
      "Lajau",
      "Layang-Layangan",
      "Lubok Temiang",
      "Nagalang / Kerupang",
      "Pantai",
      "Patau-Patau 1",
      "Patau-Patau 2",
      "Pohon Batu",
      "Rancha-Rancha",
      "Sungai Bedaun",
      "Sungai Bangat",
      "Sungai Buton",
      "Sungai Keling",
      "Sungai Lada",
      "Sungai Labu",
      "Sungai Miri / Pagar",
      "Tanjung Aru",
    ],
    [
      "Alor Gajah",
      "Asahan",
      "Ayer Keroh",
      "Bandar Hilir",
      "Batu Berendam",
      "Bemban",
      "Bukit Beruang",
      "Durian Tunggal",
      "Jasin",
      "Kuala Linggi",
      "Kuala Sungai Baru",
      "Lubok China",
      "Masjid Tanah",
      "Melaka Tengah",
      "Merlimau",
      "Selandar",
      "Sungai Rambai",
      "Sungai Udang",
      "Tanjong Kling",
      "Ujong Pasir",
    ],
    [
      "Bahau",
      "Bandar Baru Serting",
      "Batang Melaka",
      "Batu Kikir",
      "Gemas",
      "Gemencheh",
      "Jelebu",
      "Jempol",
      "Johol",
      "Juasseh",
      "Kota",
      "Kuala Klawang",
      "Kuala Pilah",
      "Labu",
      "Lenggeng",
      "Linggi",
      "Mantin",
      "Nilai",
      "Pasir Panjang",
      "Pedas",
      "Port Dickson",
      "Rantau",
      "Rembau",
      "Rompin",
      "Senawang",
      "Seremban",
      "Siliau",
      "Simpang Durian",
      "Simpang Pertang",
      "Sri Menanti",
      "Si Rusa",
      "Tampin",
      "Tanjong Ipoh",
    ],
    [
      "Balok",
      "Bandar Pusat Jengka",
      "Bandar Tun Abdul Razak",
      "Benta",
      "Bentong",
      "Bera",
      "Brinchang",
      "Bukit Fraser",
      "Cameron Highlands",
      "Chenor",
      "Daerah Rompin",
      "Damak",
      "Dong",
      "Genting Highlands",
      "Jerantut",
      "Karak",
      "Kuala Lipis",
      "Kuala Rompin",
      "Kuantan",
      "Lanchang",
      "Lurah Bilut",
      "Maran",
      "Mengkarak",
      "Mentakab",
      "Muadzam Shah",
      "Padang Tengku",
      "Pekan",
      "Raub",
      "Ringlet",
      "Rompin",
      "Sega",
      "Sungai Koyan",
      "Sungai Lembing",
      "Sungai Ruan",
      "Tanah Rata",
      "Temerloh",
      "Triang",
    ],
    [
      "Air Tawar",
      "Alma",
      "Ayer Itam",
      "Bagan Ajam",
      "Bagan Jermal",
      "Bagan Lalang",
      "Balik Pulau",
      "Bandar Perda",
      "Batu Ferringhi",
      "Batu Kawan",
      "Batu Maung",
      "Batu Uban",
      "Bayan Baru",
      "Bayan Lepas",
      "Berapit",
      "Bertam",
      "Bukit Dumbar",
      "Bukit Jambul",
      "Bukit Mertajam",
      "Bukit Minyak",
      "Bukit Tambun",
      "Bukit Tengah",
      "Butterworth",
      "Gelugor",
      "Georgetown",
      "Gertak Sangul",
      "Greenlane",
      "Jawi",
      "Jelutong",
      "Juru",
      "Kepala Batas",
      "Kubang Semang",
      "Mak Mandin",
      "Minden Heights",
      "Nibong Tebal",
      "Pauh Jaya",
      "Paya Terubong",
      "Penaga",
      "Penang Hill",
      "Penanti",
      "Perai",
      "Permatang Kuching",
      "Permatang Pauh",
      "Permatang Tinggi",
      "Persiaran Gurney",
      "Prai",
      "Pulau Betong",
      "Pulau Tikus",
      "Raja Uda",
      "Relau",
      "Scotland",
      "Seberang Jaya",
      "Seberang Perai",
      "Simpang Ampat",
      "Sungai Ara",
      "Sungai Bakap",
      "Sungai Dua",
      "Sungai Jawi",
      "Sungai Nibong",
      "Sungai Pinang",
      "Tanjong Tokong",
      "Tanjung Bungah",
      "Tasek Gelugor",
      "Teluk Bahang",
      "Teluk Kumbar",
      "USM",
      "Valdor",
    ],
    [
      "Ayer Tawar",
      "Bagan Datoh",
      "Bagan Serai",
      "Batu Gajah",
      "Batu Kuraugit ",
      "Behrang Stesen",
      "Beruas",
      "Bidor",
      "Bota",
      "Changkat Jering",
      "Changkat Keruing",
      "Chemor",
      "Chenderiang",
      "Chenderong Balai",
      "Chikus",
      "Enggor",
      "Gerik",
      "Gopeng",
      "Hutan Melintang",
      "Intan",
      "Ipoh",
      "Jeram",
      "Kampar",
      "Kampong Gajah",
      "Kampong Kepayang",
      "Kamunting",
      "Kuala Kangsar",
      "Kuala Kurau",
      "Kuala Sepatang",
      "Lahat",
      "Lambor Kanan",
      "Langkap",
      "Lenggong",
      "Lumut",
      "Malim Nawar",
      "Mambang Diawan",
      "Manong",
      "Matang",
      "Menglembu",
      "Padang Rengas",
      "Pangkor",
      "Pantai Remis",
      "Parit",
      "Parit Buntar",
      "Pengkalan Hulu",
      "Pusing",
      "Rantau Panjang",
      "Sauk",
      "Selama",
      "Selekoh",
      "Selinsing",
      "Semanggol",
      "Seri Manjong",
      "Seri Iskandar",
      "Simpang",
      "Sitiawan",
      "Slim River",
      "Sungai Siput",
      "Sungai Sumun",
      "Sungkai",
      "Taiping",
      "Tanjong Piandang",
      "Tanjong Rambutan",
      "Tanjong Tualang",
      "Tanjung Malim",
      "Tapah",
      "Teluk Intan",
      "Temoh",
      "TLDM Lumut",
      "Trolak",
      "Trong",
      "Tronoh",
      "Ulu Bernam",
      "Ulu Kinta",
    ],
    [
      "Arau",
      "Kaki Bukit",
      "Kangar",
      "Kuala Perlis",
      "Padang Besar",
      "Pauh",
      "Simpang Ampat",
    ],
    ["Putrajaya"],
    [
      "Beaufort",
      "Beluran",
      "Bongawan",
      "Keningau",
      "Kota Belud",
      "Kota Kinabalu",
      "Kota Kinabatangan",
      "Kota Marudu",
      "Kuala Penyu",
      "Kudat",
      "Kunak",
      "Lahad Datu",
      "Likas",
      "Membakut",
      "Menumbok",
      "Nabawan",
      "Pamol",
      "Papar",
      "Penampang",
      "Pitas",
      "Putatan",
      "Ranau",
      "Sandakan",
      "Semporna",
      "Sipitang",
      "Tambunan",
      "Tamparuli",
      "Tawau",
      "Tenom",
      "Tuaran",
      "Telupid",
    ],
    [
      "Asajaya",
      "Balingian",
      "Baram",
      "Bau",
      "Bekenu",
      "Belaga",
      "Belawai",
      "Betong",
      "Bintangor",
      "Bintulu",
      "Dalat",
      "Daro",
      "Debak",
      "Engkilili",
      "Julau",
      "Kabong",
      "Kanowit",
      "Kapit",
      "Kota Samarahan",
      "Kuching",
      "Lawas",
      "Limbang",
      "Lingga",
      "Long Lama",
      "Lubok Antu",
      "Lundu",
      "Lutong",
      "Maradong",
      "Marudi",
      "Matu",
      "Miri",
      "Mukah",
      "Nanga Medamit",
      "Niah",
      "Pusa",
      "Roban",
      "Saratok",
      "Sarikei",
      "Sebauh",
      "Sebuyau",
      "Serian",
      "Sibu",
      "Simunjan",
      "Song",
      "Spaoh",
      "Sri Aman",
      "Sundar",
      "Tanjung Kidurong",
      "Tatau",
    ],
    [
      "Alam Impian",
      "Aman Perdana",
      "Ampang",
      "Ambang Botanic",
      "Ara Damansara",
      "Balakong",
      "Bandar Botanic",
      "Bandar Bukit Raja",
      "Bandar Bukit Tinggi",
      "Bandar Kinrara",
      "Bandar Puteri Klang",
      "Bandar Puteri Puchong",
      "Bandar Saujana Putra",
      "Bandar Sungai Long",
      "Bandar Sunway",
      "Bandar Utama",
      "Bangi",
      "Banting",
      "Batang Berjuntai",
      "Batang Kali",
      "Batu Arang",
      "Batu Caves",
      "Beranang",
      "Bukit Antarabangsa",
      "Bukit Beruntung",
      "Bukit Jelutong",
      "Bukit Rahman Putra",
      "Bukit Rotan",
      "Bukit Subang",
      "Cheras",
      "Country Heights",
      "Cyberjaya",
      "Damansara Damai",
      "Damansara Intan",
      "Damansara Jaya",
      "Damansara Kim",
      "Damansara Perdana",
      "Damansara Utama",
      "Denai Alam",
      "Dengkil",
      "Glenmarie",
      "Gombak",
      "Hulu Langat",
      "Hulu Selangor",
      "Jenjarom",
      "Kajang",
      "Kapar",
      "Kayu Ara",
      "Kelana Jaya",
      "Kerling",
      "Klang",
      "Kota Damansara",
      "Kota Emerald",
      "Kota Kemuning",
      "Kuala Kubu Baru",
      "Kuala Langat",
      "Kuala Selangor",
      "Kuang",
      "Mutiara Damansara",
      "Petaling Jaya",
      "Port Klang",
      "Puchong",
      "Puchong South",
      "Pulau Indah (Pulau Lumut)",
      "Pulau Carey",
      "Pulau Ketam",
      "Puncak Alam",
      "Puncak Jalil",
      "Putra Heights",
      "Rasa",
      "Rawang",
      "Sabak Bernam",
      "Salak Tinggi",
      "Saujana",
      "Saujana Utama",
      "Sekinchan",
      "Selayang",
      "Semenyih",
      "Sepang",
      "Serdang",
      "Serendah",
      "Seri Kembangan",
      "Setia Alam",
      "Setia Eco Park",
      "Shah Alam",
      "SierraMas",
      "SS2",
      "Subang Bestari",
      "Subang Heights",
      "Subang Jaya",
      "Subang Perdana",
      "Sungai Ayer Tawar",
      "Sungai Besar",
      "Sungai Buloh",
      "Sungai Pelek",
      "Taman TTDI Jaya",
      "Tanjong Karang",
      "Tanjong Sepat",
      "Telok Panglima Garang",
      "Tropicana",
      "Ulu Klang",
      "USJ",
      "USJ Heights",
      "Valencia",
    ],
    [
      "Besut",
      "Dungun",
      "Hulu Terengganu",
      "Kemaman",
      "Kuala Terengganu",
      "Marang",
      "Setiu",
      "Kuala Nerus",
    ],
  ]);
  const [userInfo, setUserInfo] = useState({
    _id: "",
    firstName: "",
    coverImg: "",
    lastName: "",
    email: "",
    gender: "",
    noTel: "",
    states: "",
    areaLocations: "",
    whatsappLink: "",
    messengerLink: "",
    wechatLink: "",
    instagramLink: "",
  });
  const [areasToShow, setAreasToShow] = useState([]);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  });
  const [error, setError] = useState("");

  function checkPassword(e) {
    if (
      !password.oldPassword ||
      !password.newPassword1 ||
      !password.newPassword2
    ) {
      setPasswordError("Please Enter All Required Fields");
      return false;
    } else if (password.newPassword1 !== password.newPassword2) {
      setPasswordError("New Passwords Does Not Matched");
      return false;
    }
    return true;
  }

  function handleOnSubmitPassword(e) {
    e.preventDefault();
    if (checkPassword()) {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      axios
        .post(
          "https://papero-dev.herokuapp.com/users/changePassword",
          password,
          config
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.msg === "Password Changed") {
              window.location.pathname = "/";
            } else {
              setPasswordError(res.data.msg);
            }
          } else {
          }
        })
        .catch((err) => console.log(err));
      // changePassword
    }
  }

  function handleOnChangePassword(e) {
    const { name, value } = e.target;
    setPassword((prevPassword) => {
      return { ...prevPassword, [name]: value };
    });
  }

  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("https://papero-dev.herokuapp.com/users/retrieveInfo", config)
      .then((res) => {
        setUserInfo({
          ...res.data,
          areaLocations: res.data.location,
          noTel: "0" + res.data.noTel,
        });
        setAreasToShow(areaLocations[states.indexOf(res.data.states)]);
        setAvatarUri(res.data.avatarUri);
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  function checkNoEmpty() {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.gender ||
      !userInfo.states ||
      !userInfo.areaLocations ||
      userInfo.areaLocations == "test"
    ) {
      setError("Please Enter All Required Fields! ");
      return false;
    }
    return true;
  }

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    if (checkNoEmpty()) {
      try {
        let formData = new FormData();
        formData.append("coverImg", userInfo.coverImg);
        formData.append("firstName", userInfo.firstName);
        formData.append("lastName", userInfo.lastName);
        formData.append("email", userInfo.email);
        formData.append("gender", userInfo.gender);
        formData.append("noTel", userInfo.noTel);
        formData.append("states", userInfo.states);
        formData.append("location", userInfo.areaLocations);
        formData.append("whatsappLink", userInfo.whatsappLink);
        formData.append("messengerLink", userInfo.messengerLink);
        formData.append("wechatLink", userInfo.wechatLink);
        formData.append("instagramLink", userInfo.instagramLink);

        const res = await fetch(
          "https://papero-dev.herokuapp.com/sellers/test",
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        let data = await res.json();
        if (res.ok) {
          if (data.msg !== "Updated") {
            setError(data.msg);
          } else {
            window.location.pathname = "/";
          }
        } else {
        }
      } catch (error) {}
    }
  };

  function handleOnChange(e) {
    const name = e.target.name;
    const value = name === "coverImg" ? e.target.files[0] : e.target.value;
    if (name === "coverImg") {
      setAvatarUri(URL.createObjectURL(e.target.files[0]));
    }
    if (name == "states") {
      setUserInfo((prevValue) => {
        return { ...prevValue, [name]: value, [areaLocations]: "" };
      });
      setAreasToShow(areaLocations[states.indexOf(value)]);
    }
    setUserInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <>
      {userInfo ? (
        <div className="container">
          <section id="us-main-upload-part">
            <div className="us-main-upload-part">
              {error != "" && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Uh oh!</strong> {error}
                </div>
              )}
              <form encType="multipart/form-data" onSubmit={handleSubmitInfo}>
                <section id="us-basic-info">
                  <div className="us-basic-info">
                    <div
                      id="book-images"
                      className="row us-label-input-prop justify-content-md-center"
                    >
                      <div className="col-md-auto">
                        <label for="coverImg">
                          <input
                            type="file"
                            name="coverImg"
                            id="coverImg"
                            onChange={handleOnChange}
                            style={{ display: "none" }}
                          />
                          <img
                            id="img-coverImg"
                            className="us-img-coverImg"
                            src={
                              avatarUri != ""
                                ? avatarUri
                                : "https://res.cloudinary.com/papero/image/upload/v1633250954/user_tbyq9p.png"
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <h3 className="us-h3" style={{ "margin-bottom": "30px" }}>
                      Basic Information:{" "}
                    </h3>
                    <div id="book-title" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">First Name*: </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          required
                          style={{ width: " 100%" }}
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={userInfo.firstName ? userInfo.firstName : ""}
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="us-label col-md-2">
                        <label for="">Last Name*: </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          style={{ width: " 100%" }}
                          type="text"
                          id="lastName"
                          required
                          name="lastName"
                          onChange={handleOnChange}
                          value={userInfo.lastName ? userInfo.lastName : ""}
                        />
                      </div>
                    </div>
                    <div id="book-title" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">Email*: </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          readonly
                          required
                          style={{ width: " 100%" }}
                          type="text"
                          id="email"
                          name="email"
                          value={userInfo.email ? userInfo.email : ""}
                        />
                      </div>
                      <div className="us-label col-md-2">
                        <label for="">Gender*: </label>
                      </div>
                      <div className="col-md-4">
                        <select
                          required
                          className="us-select"
                          style={{ width: " 100%" }}
                          value={userInfo.gender ? userInfo.gender : ""}
                          name="gender"
                          id="gender"
                          onChange={handleOnChange}
                        >
                          <option defaultValue hidden>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div id="book-title" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">States*: </label>
                      </div>
                      <div className="col-md-4">
                        <select
                          required
                          className="us-select"
                          style={{ width: " 100%" }}
                          value={userInfo.states ? userInfo.states : ""}
                          name="states"
                          onChange={handleOnChange}
                          id="states"
                        >
                          <option defaultValue hidden>
                            Select a States
                          </option>
                          {states.map((state) => {
                            return (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="us-label col-md-6"></div>
                    </div>
                    <div id="book-title" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">Location*: </label>
                      </div>
                      <div className="col-md-4">
                        <select
                          required
                          className="us-select"
                          style={{ width: " 100%" }}
                          name="areaLocations"
                          value={
                            areasToShow &&
                            areasToShow.includes(userInfo.areaLocations)
                              ? userInfo.areaLocations
                              : userInfo.areaLocations
                          }
                          onChange={handleOnChange}
                          id="areaLocations"
                        >
                          <option defaultValue hidden>
                            Select a Location
                          </option>
                          {areasToShow &&
                            areasToShow.map((location) => {
                              return (
                                <option key={location} value={location}>
                                  {location}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="us-label col-md-6"></div>
                    </div>
                  </div>
                </section>
                <hr />
                <section id="us-contact-info">
                  <div className="us-contact-info">
                    <h3 className="us-h3" style={{ margin: "30px 0px" }}>
                      Contact Information:{" "}
                    </h3>

                    <div id="contact-hp" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">H/P Number: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="number"
                          minLength="9"
                          id="noTel"
                          name="noTel"
                          onChange={handleOnChange}
                          value={userInfo.noTel ? userInfo.noTel : ""}
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-wechat"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">WeChat: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="text"
                          id="wechatLink"
                          onChange={handleOnChange}
                          name="wechatLink"
                          value={userInfo.wechatLink ? userInfo.wechatLink : ""}
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-whatsapp"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">Whatsapp: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="text"
                          id="whatsappLink"
                          name="whatsappLink"
                          onChange={handleOnChange}
                          value={
                            userInfo.whatsappLink ? userInfo.whatsappLink : ""
                          }
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-messenger"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">Messenger: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="text"
                          id="messengerLink"
                          name="messengerLink"
                          onChange={handleOnChange}
                          value={
                            userInfo.messengerLink ? userInfo.messengerLink : ""
                          }
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-instagram"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">Instagram: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="text"
                          id="instagramLink"
                          name="instagramLink"
                          onChange={handleOnChange}
                          value={
                            userInfo.instagramLink ? userInfo.instagramLink : ""
                          }
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>
                  <section id="buttons">
                    <div className="row">
                      <div className="col-md-9"></div>
                      <div className="col-md-3">
                        <button
                          className="us-primary-btn"
                          style={{ width: "80%" }}
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </section>
                </section>
              </form>
              <hr />
              <form
                encType="multipart/form-data"
                onSubmit={handleOnSubmitPassword}
              >
                <section id="us-change-password">
                  <div className="us-change-password">
                    <h3 className="us-h3" style={{ margin: " 30px 0px" }}>
                      Change Password:{" "}
                    </h3>
                    {passwordError != "" && (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Uh oh!</strong> {passwordError}
                      </div>
                    )}
                    <div id="contact-hp" className="row us-label-input-prop">
                      <div className="us-label col-md-2">
                        <label for="">Old Password: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="password"
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="Enter Old Password"
                          onChange={handleOnChangePassword}
                          value={password.oldPassword}
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-wechat"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">New Password: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="password"
                          id="newPassword1"
                          name="newPassword1"
                          onChange={handleOnChangePassword}
                          placeholder="Enter New Password"
                          value={password.newPassword1}
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div
                      id="contact-whatsapp"
                      className="row us-label-input-prop"
                    >
                      <div className="us-label col-md-2">
                        <label for="">Re-enter Again: </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          style={{ width: " 100%" }}
                          type="password"
                          id="newPassword2"
                          name="newPassword2"
                          onChange={handleOnChangePassword}
                          placeholder="Confirm Password"
                          value={password.newPassword2}
                        />
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>
                </section>
                <section id="buttons">
                  <div className="row">
                    <div className="col-md-9"></div>
                    <div className="col-md-3">
                      <button
                        className="us-primary-btn"
                        type="submit"
                        style={{ width: "80%" }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserSetting;
