import axios from "axios";
import React, { useEffect, useState } from "react";
import FormData from "form-data";

function UploadBook(props) {
  const [isNotPosted, setIsNotPosted] = useState(true);
  const authToken = localStorage.getItem("authToken") || "empty";
  const [coverImgPreview, setCoverImgPreview] = useState("");
  const [imgPreview1, setImgPreview1] = useState("");
  const [imgPreview2, setImgPreview2] = useState("");
  const [imgPreview3, setImgPreview3] = useState("");
  const [errorArr, setErrorArr] = useState([]);
  const [loadingStyle, setLoadingStyle] = useState({ display: "none" });
  const [loadingNoneStyle, setLoadingNoneStyle] = useState({ display: "flex" });
  let errArr = [];
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
  const allCategories = [
    "Arts & Music",
    "Biography",
    "Business",
    "Comics",
    "Computers & Tech",
    "Cooking",
    "Edu & Reference",
    "Entertainment",
    "Health & Fitness",
    "History",
    "Hobbies & Crafts",
    "Home & Garden",
    "Horror",
    "Kids",
    "Literature & Fiction",
    "Medical",
    "Mysteries",
    "Parenting",
    "Religion",
    "Romance",
    "Sci-Fi & Fantasy",
    "Science & Math",
    "Self Help & Improvements",
    "Social Sciences",
    "Sports",
    "Teen",
    "Travel",
    "True Crime",
    "Westerns",
  ];
  const allLanguages = [
    "Chinese",
    "English",
    "Bahasa Melayu",
    "Bahasa Indonesia",
    "Vietnamese",
    "Thai",
    "Portugese",
    "B. Arab",
    "Others",
  ];
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
  const [areasToShow, setAreasToShow] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
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
    isbn: "",
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

  function handleOnChange(e) {
    const name = e.target.name;
    const value =
      name === "coverImg" || name === "img1" || name === "img2"
        ? e.target.files[0]
        : e.target.value;
    if (name === "coverImg") {
      setCoverImgPreview(URL.createObjectURL(e.target.files[0]));
    }
    if (name === "img1") {
      setImgPreview1(URL.createObjectURL(e.target.files[0]));
    }
    if (name === "img2") {
      setImgPreview2(URL.createObjectURL(e.target.files[0]));
    }
    if (name === "img3") {
      setImgPreview3(URL.createObjectURL(e.target.files[0]));
    }
    if (name == "states") {
      data.areaLocations = "";
      setData((prevValue) => {
        return { ...prevValue, [name]: value };
      });
      setAreasToShow(areaLocations[states.indexOf(value)]);
    }
    setData((prevValue) => {
      return { ...prevValue, [name]: value };
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
        setUserInfo({ ...res.data, areaLocations: res.data.location });
        setData({
          coverImg: "",
          img1: "",
          img2: "",
          title: "",
          price: "",
          description: "",
          categories: "",
          uploadedBy: res.data.email,
          publishingCompany: "",
          language: "",
          isbn: "",
          coverType: "",
          year: "",
          quantity: 1,
          states: res.data.states,
          areaLocations: res.data.location,
          contactNumber: "0" + res.data.noTel,
          whatsappLink: res.data.whatsappLink,
          messengerLink: res.data.messengerLink,
          wechatLink: res.data.wechatLink,
          instagramLink: res.data.instagramLink,
        });
        setAreasToShow(areaLocations[states.indexOf(res.data.states)]);
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  function checkNoEmpty() {
    errArr = [];
    if (
      !data.coverImg ||
      !data.title ||
      !data.isbn ||
      !data.price ||
      !data.description ||
      !data.categories ||
      !data.year ||
      !data.language ||
      !data.states ||
      data.areaLocations == "test" ||
      !data.areaLocations ||
      !data.contactNumber
    ) {
      errArr = [...errArr, "Please enter all required(*) fields"];
    }
    if (data.title.length < 20) {
      errArr = [...errArr, "Title should be min 20 characters"];
    }

    if (!data.coverImg) {
      errArr = [...errArr, "Should insert 1 cover image"];
    }
    if (data.isbn.includes("-")) {
      data.isbn.replace("-", "");
    }

    if (
      (data.messengerLink != "" && !data.messengerLink.includes("http")) ||
      (data.instagramLink != "" && !data.instagramLink.includes("http")) ||
      (data.wechatLink != "" && !data.wechatLink.includes("http")) ||
      (data.whatsappLink != "" && !data.whatsappLink.includes("http"))
    ) {
      errArr = [...errArr, "All social media should be link(s)"];
    }

    if (data.isbn.length != 13) {
      errArr = [...errArr, "ISBN should be 13 characters (without -)"];
    }

    if (data.year.length != 4) {
      errArr = [...errArr, "Year published entered invalid"];
    }

    setErrorArr(errArr);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkNoEmpty();
    if (errArr.length === 0) {
      setLoadingStyle({ display: "flex" });
      setLoadingNoneStyle({ display: "none" });
      try {
        let formData = new FormData();
        formData.append("coverImg", data.coverImg);
        formData.append("img1", data.img1);
        formData.append("img2", data.img2);
        formData.append("title", data.title);
        formData.append("uploadedBy", data.uploadedBy);
        formData.append("description", data.description);
        formData.append("categories", data.categories);
        formData.append("states", data.states);
        formData.append("isbn", data.isbn);
        formData.append("year", data.year);
        formData.append("price", data.price);
        formData.append("location", data.areaLocations);
        formData.append("contactNumber", data.contactNumber);
        formData.append("whatsappLink", data.whatsappLink);
        formData.append("instagramLink", data.instagramLink);
        formData.append("messengerLink", data.messengerLink);
        formData.append("wechatLink", data.wechatLink);
        formData.append("language", data.language);

        const res = await fetch(
          `https://papero-dev.herokuapp.com/sellers/upload`,
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
            isbn: "",
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
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  return (
    <>
      <div className="container">
        <section id="ub-main-upload-part">
          <div className="ub-main-upload-part">
            {errorArr.map((err, index) => {
              return (
                <div
                  key={index}
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Uh oh!</strong> {err}
                </div>
              );
            })}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <section id="ub-basic-info">
                <div className="ub-basic-info">
                  <h3 className="ub-h3" style={{ marginBottom: "30px" }}>
                    Basic Information:{" "}
                  </h3>
                  <div id="book-images" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Book Images: </label>
                    </div>
                    <div className="col-md-9">
                      <label for="coverImg">
                        <input
                          type="file"
                          accept="image/*"
                          name="coverImg"
                          onChange={handleOnChange}
                          id="coverImg"
                          style={{ display: "none" }}
                        />
                        <img
                          id="img-coverImg"
                          src={
                            coverImgPreview != ""
                              ? coverImgPreview
                              : "https://res.cloudinary.com/papero/image/upload/v1633250625/uploadimg_jcudmy.png"
                          }
                          style={{
                            border: "1px solid black",
                            objectFit: "contain",
                            width: "100px",
                            height: "100px",
                            display: "block",
                          }}
                        />
                      </label>
                      <label for="img1">
                        <input
                          type="file"
                          name="img1"
                          accept="image/*"
                          onChange={handleOnChange}
                          id="img1"
                          style={{ display: "none" }}
                        />
                        <img
                          id="img-img1"
                          src={
                            imgPreview1 != ""
                              ? imgPreview1
                              : "https://res.cloudinary.com/papero/image/upload/v1633250625/uploadimg_jcudmy.png"
                          }
                          style={{
                            objectFit: "contain",
                            width: "100px",
                            height: "100px",
                            display: "block",
                          }}
                        />
                      </label>
                      <label for="img2">
                        <input
                          type="file"
                          name="img2"
                          accept="image/*"
                          onChange={handleOnChange}
                          id="img2"
                          style={{ display: "none" }}
                        />
                        <img
                          id="img-img2"
                          src={
                            imgPreview2 != ""
                              ? imgPreview2
                              : "https://res.cloudinary.com/papero/image/upload/v1633250625/uploadimg_jcudmy.png"
                          }
                          style={{
                            objectFit: "contain",
                            width: "100px",
                            height: "100px",
                            display: "block",
                          }}
                        />
                      </label>
                      <label for="img3">
                        <input
                          type="file"
                          name="img3"
                          accept="image/*"
                          onChange={handleOnChange}
                          id="img3"
                          style={{ display: "none" }}
                        />
                        <img
                          id="img-img3"
                          src={
                            imgPreview3 != ""
                              ? imgPreview3
                              : "https://res.cloudinary.com/papero/image/upload/v1633250625/uploadimg_jcudmy.png"
                          }
                          style={{
                            objectFit: "contain",
                            width: "100px",
                            height: "100px",
                            display: "block",
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div id="book-title" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Book Title*: </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        required
                        style={{ width: "100%" }}
                        type="text"
                        id="title"
                        value={data.title}
                        minLength="20"
                        maxLength="40"
                        onChange={handleOnChange}
                        name="title"
                        placeholder="Enter Title (min 20 characters, max 40 characters)"
                      />
                    </div>
                  </div>
                  <div
                    id="book-description"
                    className="row ub-label-input-prop"
                  >
                    <div className="ub-label  col-md-3">
                      <label for="">Description*: </label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        rows="1"
                        required
                        id="description"
                        value={data.description}
                        onChange={handleOnChange}
                        name="description"
                        placeholder="Enter Description"
                        style={{ whiteSpace: "pre-wrap" }}
                      ></textarea>
                    </div>
                  </div>
                  <div id="book-isbn" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">ISBN*: </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        placeholder="Enter ISBN (without '-')"
                        required
                        style={{ width: "100%" }}
                        type="number"
                        value={data.isbn}
                        onChange={handleOnChange}
                        name="isbn"
                        id="isbn"
                      />
                    </div>
                  </div>
                  <div id="book-price" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Price*: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        required
                        style={{ width: "100%" }}
                        type="number"
                        id="price"
                        step="0.01"
                        value={data.price}
                        onChange={handleOnChange}
                        name="price"
                        placeholder="Enter Price"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div id="book-year" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Year Published*: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        required
                        style={{ width: "100%" }}
                        type="number"
                        id="year"
                        name="year"
                        minLength="4"
                        value={data.year}
                        onChange={handleOnChange}
                        placeholder="Enter Year Published"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div id="book-category" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Category*: </label>
                    </div>
                    <div className="col-md-5">
                      <select
                        required
                        className="ub-select"
                        style={{ width: "100%" }}
                        name="categories"
                        id="categories"
                        onChange={handleOnChange}
                      >
                        <option defaultValue hidden>
                          Select a Category
                        </option>
                        {allCategories.map((category) => {
                          return (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div id="book-language" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">Language*: </label>
                    </div>
                    <div className="col-md-5">
                      <select
                        required
                        className="ub-select"
                        style={{ width: "100%" }}
                        name="language"
                        onChange={handleOnChange}
                        id="language"
                      >
                        <option value="none" defaultValue hidden>
                          Select a Language
                        </option>
                        {allLanguages.map((language) => {
                          return (
                            <option value={language} key={language}>
                              {language}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
              </section>
              <hr />
              <section id="ub-contact-info">
                <div className="ub-contact-info">
                  <h3 className="ub-h3" style={{ margin: "30px 0px" }}>
                    Personal Information:{" "}
                  </h3>
                  <div id="contact-hp" className="row ub-label-input-prop">
                    <div className="ub-label col-md-3">
                      <label for="">States*: </label>
                    </div>
                    <div className="col-md-5">
                      <select
                        required
                        className="ub-select"
                        style={{ width: " 100%" }}
                        value={data.states ? data.states : ""}
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
                    <div className="col-md-4"></div>
                  </div>
                  <div id="contact-wechat" className="row ub-label-input-prop">
                    <div className="ub-label col-md-3">
                      <label for="">Area Location*: </label>
                    </div>
                    <div className="col-md-5">
                      <select
                        required
                        className="ub-select"
                        style={{ width: " 100%" }}
                        name="areaLocations"
                        value={
                          areasToShow &&
                          areasToShow.includes(data.areaLocations)
                            ? data.areaLocations
                            : data.areaLocations
                        }
                        onChange={handleOnChange}
                        id="areaLocations"
                      >
                        <option defaultValue hidden>
                          Select a Location
                        </option>{" "}
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
                    <div className="col-md-4"></div>
                  </div>
                </div>
              </section>
              <hr />
              <section id="ub-contact-info">
                <div className="ub-contact-info">
                  <h3 className="ub-h3" style={{ margin: "30px 0px" }}>
                    Contact Information:{" "}
                  </h3>

                  <div id="contact-hp" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">H/P Number*: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        required
                        minLength="9"
                        style={{ width: "100%" }}
                        type="number"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Enter Contact Number"
                        value={data.contactNumber}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div id="contact-wechat" className="row ub-label-input-prop">
                    <div className="ub-label  col-md-3">
                      <label for="">WeChat: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        id="wechatLink"
                        name="wechatLink"
                        value={data.wechatLink}
                        onChange={handleOnChange}
                        placeholder="Enter WeChat Link!"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div
                    id="contact-whatsapp"
                    className="row ub-label-input-prop"
                  >
                    <div className="ub-label  col-md-3">
                      <label for="">Whatsapp: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        id="whatsappLink"
                        name="whatsappLink"
                        value={data.whatsappLink}
                        onChange={handleOnChange}
                        placeholder="Enter WhatsApp Link!"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div
                    id="contact-messenger"
                    className="row ub-label-input-prop"
                  >
                    <div className="ub-label  col-md-3">
                      <label for="">Messenger: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        id="messengerLink"
                        name="messengerLink"
                        value={data.messengerLink}
                        onChange={handleOnChange}
                        placeholder="Enter Messenger Link!"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div
                    id="contact-instagram"
                    className="row ub-label-input-prop"
                  >
                    <div className="ub-label  col-md-3">
                      <label for="">Instagram: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        id="instagramLink"
                        name="instagramLink"
                        value={data.instagramLink}
                        onChange={handleOnChange}
                        placeholder="Enter Instagram Link!"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
              </section>

              <section id="buttons">
                <div className="row" style={loadingNoneStyle}>
                  <div className="col-md-9"></div>
                  <div className="col-md-3">
                    <button className="ub-primary-btn" type="submit">
                      Publish
                    </button>
                  </div>
                </div>

                <div className="row" style={loadingStyle}>
                  <div className="col-md-6"></div>
                  <div className="col-md-3">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          style={{
                            width: "30px",
                            display: "block",
                            textAlign: "right",
                          }}
                          src="https://res.cloudinary.com/papero/image/upload/c_crop,h_54/v1633658908/200_xbc604.gif"
                          alt=""
                        />
                      </div>
                      <div className="col-md-8 ub-label">
                        <label for="">Uploading... </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="ub-primary-btn"
                      type="submit"
                      disabled
                      style={{ background: "#804e55" }}
                    >
                      Publish
                    </button>
                  </div>
                </div>
                {errorMsg != "" && (
                  <div
                    className="alert alert-warning alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Uh oh!</strong> {errorMsg}
                  </div>
                )}
              </section>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default UploadBook;
