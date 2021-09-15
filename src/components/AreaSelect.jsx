import React, { useEffect, useState } from "react";

function AreaSelect(props) {
  const [areaLocations, setAreaLocations] = useState([
    ["Ayer Baloi", "Ayer Hitam", "Bakri", "Batu Anam", "Batu Pahat", "Bekok", "Benut", "Bukit Gambir", "Bukit Pasir", "Chaah", "Endau", "Gelang Patah", "Gerisek", "Gugusan Taib Andak", "Jementah", "Johor Bahru", "Kahang", "Kampung Kenangan Tun Dr Ismail", "Kluang", "Kota Tinggi", "Kukup", "Kulai", "Labis", "Layang Layang", "Masai", "Mersing", "Muar", "Iskandar Puteri", "Pagoh", "Paloh", "Panchor", "Parit Jawa", "Parit Raja", "Parit Sulong", "Pasir Gudang", "Pekan Nanas", "Pengerang", "Permas Jaya", "Plentong", "Pontian", "Rengam", "Rengit", "Segamat", "Semerah", "Senai", "Senggarang", "Senibong", "Seri Gading", "Setia Indah", "Setia Tropika", "Simpang Rengam", "Skudai", "Sungai Mati", "Tampoi", "Tangkak", "Ulu Tiram", "Yong Peng", "Others"],
    ["Alor Setar", "Ayer Hitam", "Baling", "Bandar Baharu", "Bukit Kayu Hitam", "Changloon", "Guar Chempedak", "Gurun", "Jitra", "Karangan", "Kepala Batas", "Kodiang", "Kota Sarang Semut", "Kuala Kedah", "Kuala Ketil", "Kuala Muda", "Kuala Nerang", "Kubang Pasu", "Kulim", "Lunas", "Merbok", "Padang Serai", "Padang Terap", "Pendang", "Pokok Sena", "Pulau Langkawi", "Serdang", "Sik", "Simpang Empat", "Sungai Petani", "University Utara", "Yan", "Bedong", "Langgar"],
    ["Ayer Lanas", "Bachok", "Cherang Ruku", "Dabong", "Gua Musang", "Jeli", "Kem Desa Pahwalan", "Ketereh", "Kok Lanas", "Kota Bharu", "Kuala Balah", "Kuala Kerai", "Kubang Kerian", "Machang", "Melor", "Pasir Mas", "Pasir Puteh", "Pulai Chondong", "Rantau Panjang", "Selising", "Tanah Merah", "Tawang", "Temangan", "Tumpat", "Wakaf Baru"],
    ["Ampang Hilir", "Bandar Damai Perdana", "Bandar Menjalara", "Bandar Tasik Selatan", "Bangsar", "Bangsar South", "Batu", "Brickfields", "Bukit Bintang", "Bukit Jalil", "Bukit Ledang", "Bukit Persekutuan", "Bukit Tunku", "Cheras", "City Centre", "Country Heights", "Country Heights Damansara", "Damansara", "Damansara Heights", "Desa Pandan", "Desa ParkCity", "Desa Petaling", "Gombak", "Jalan Ampang", "Jalan Ipoh", "Jalan Kuching", "Jalan Sultan Ismail", "Jinjang", "Kenny Hills", "Kepong", "Keramat", "KL City", "KL Sentral", "KLCC", "Kuchai Lama", "Mid Valley City", "Mont Kiara", "Old Klang Road", "OUG", "Pandan Indah", "Pandan Jaya", "Pandan Perdana", "Pantai", "Pekan Batu", "Puchong", "Salak Selatan", "Segambut", "Sentul", "Seputeh", "Serdang", "Setapak", "Setia Eco Park", "Setiawangsa", "Solaris Dutamas", "Sri Damansara", "Sri Hartamas", "Sri Petaling", "Sungai Besi", "Sungai Penchala", "Taman Desa", "Taman Duta", "Taman Melawati", "Taman Tun Dr Ismail", "Taman Permata", "Titiwangsa", "TPM", "Wangsa Maju"],
    ["Batu Arang", "Batu Manikar", "Bebuloh", "Belukut", "Bukit Kalam", "Bukit Kuda", "Durian Tunjung", "Ganggarak / Merinding", "Gersik / Saguking / Jawa / Parit", "Kilan / Kilan Pulau Akar", "Lajau", "Layang-Layangan", "Lubok Temiang", "Nagalang / Kerupang", "Pantai", "Patau-Patau 1", "Patau-Patau 2", "Pohon Batu", "Rancha-Rancha", "Sungai Bedaun", "Sungai Bangat", "Sungai Buton", "Sungai Keling", "Sungai Lada", "Sungai Labu", "Sungai Miri / Pagar", "Tanjung Aru"],
    ["Alor Gajah", "Asahan", "Ayer Keroh", "Bandar Hilir", "Batu Berendam", "Bemban", "Bukit Beruang", "Durian Tunggal", "Jasin", "Kuala Linggi", "Kuala Sungai Baru", "Lubok China", "Masjid Tanah", "Melaka Tengah", "Merlimau", "Selandar", "Sungai Rambai", "Sungai Udang", "Tanjong Kling", "Ujong Pasir"],
    ["Bahau", "Bandar Baru Serting", "Batang Melaka", "Batu Kikir", "Gemas", "Gemencheh", "Jelebu", "Jempol", "Johol", "Juasseh", "Kota", "Kuala Klawang", "Kuala Pilah", "Labu", "Lenggeng", "Linggi", "Mantin", "Nilai", "Pasir Panjang", "Pedas", "Port Dickson", "Rantau", "Rembau", "Rompin", "Senawang", "Seremban", "Siliau", "Simpang Durian", "Simpang Pertang", "Sri Menanti", "Si Rusa", "Tampin", "Tanjong Ipoh"],
    ["Balok", "Bandar Pusat Jengka", "Bandar Tun Abdul Razak", "Benta", "Bentong", "Bera", "Brinchang", "Bukit Fraser", "Cameron Highlands", "Chenor", "Daerah Rompin", "Damak", "Dong", "Genting Highlands", "Jerantut", "Karak", "Kuala Lipis", "Kuala Rompin", "Kuantan", "Lanchang", "Lurah Bilut", "Maran", "Mengkarak", "Mentakab", "Muadzam Shah", "Padang Tengku", "Pekan", "Raub", "Ringlet", "Rompin", "Sega", "Sungai Koyan", "Sungai Lembing", "Sungai Ruan", "Tanah Rata", "Temerloh", "Triang"],
    ["Air Tawar", "Alma", "Ayer Itam", "Bagan Ajam", "Bagan Jermal", "Bagan Lalang", "Balik Pulau", "Bandar Perda", "Batu Ferringhi", "Batu Kawan", "Batu Maung", "Batu Uban", "Bayan Baru", "Bayan Lepas", "Berapit", "Bertam", "Bukit Dumbar", "Bukit Jambul", "Bukit Mertajam", "Bukit Minyak", "Bukit Tambun", "Bukit Tengah", "Butterworth", "Gelugor", "Georgetown", "Gertak Sangul", "Greenlane", "Jawi", "Jelutong", "Juru", "Kepala Batas", "Kubang Semang", "Mak Mandin", "Minden Heights", "Nibong Tebal", "Pauh Jaya", "Paya Terubong", "Penaga", "Penang Hill", "Penanti", "Perai", "Permatang Kuching", "Permatang Pauh", "Permatang Tinggi", "Persiaran Gurney", "Prai", "Pulau Betong", "Pulau Tikus", "Raja Uda", "Relau", "Scotland", "Seberang Jaya", "Seberang Perai", "Simpang Ampat", "Sungai Ara", "Sungai Bakap", "Sungai Dua", "Sungai Jawi", "Sungai Nibong", "Sungai Pinang", "Tanjong Tokong", "Tanjung Bungah", "Tasek Gelugor", "Teluk Bahang", "Teluk Kumbar", "USM", "Valdor"],
    ["Ayer Tawar", "Bagan Datoh", "Bagan Serai", "Batu Gajah", "Batu Kurau", "Behrang Stesen", "Beruas", "Bidor", "Bota", "Changkat Jering", "Changkat Keruing", "Chemor", "Chenderiang", "Chenderong Balai", "Chikus", "Enggor", "Gerik", "Gopeng", "Hutan Melintang", "Intan", "Ipoh", "Jeram", "Kampar", "Kampong Gajah", "Kampong Kepayang", "Kamunting", "Kuala Kangsar", "Kuala Kurau", "Kuala Sepatang", "Lahat", "Lambor Kanan", "Langkap", "Lenggong", "Lumut", "Malim Nawar", "Mambang Diawan", "Manong", "Matang", "Menglembu", "Padang Rengas", "Pangkor", "Pantai Remis", "Parit", "Parit Buntar", "Pengkalan Hulu", "Pusing", "Rantau Panjang", "Sauk", "Selama", "Selekoh", "Selinsing", "Semanggol", "Seri Manjong", "Seri Iskandar", "Simpang", "Sitiawan", "Slim River", "Sungai Siput", "Sungai Sumun", "Sungkai", "Taiping", "Tanjong Piandang", "Tanjong Rambutan", "Tanjong Tualang", "Tanjung Malim", "Tapah", "Teluk Intan", "Temoh", "TLDM Lumut", "Trolak", "Trong", "Tronoh", "Ulu Bernam", "Ulu Kinta"],
    ["Arau", "Kaki Bukit", "Kangar", "Kuala Perlis", "Padang Besar", "Pauh", "Simpang Ampat"],
    ["Putrajaya"],
    ["Beaufort", "Beluran", "Bongawan", "Keningau", "Kota Belud", "Kota Kinabalu", "Kota Kinabatangan", "Kota Marudu", "Kuala Penyu", "Kudat", "Kunak", "Lahad Datu", "Likas", "Membakut", "Menumbok", "Nabawan", "Pamol", "Papar", "Penampang", "Pitas", "Putatan", "Ranau", "Sandakan", "Semporna", "Sipitang", "Tambunan", "Tamparuli", "Tawau", "Tenom", "Tuaran", "Telupid"],
    ["Asajaya", "Balingian", "Baram", "Bau", "Bekenu", "Belaga", "Belawai", "Betong", "Bintangor", "Bintulu", "Dalat", "Daro", "Debak", "Engkilili", "Julau", "Kabong", "Kanowit", "Kapit", "Kota Samarahan", "Kuching", "Lawas", "Limbang", "Lingga", "Long Lama", "Lubok Antu", "Lundu", "Lutong", "Maradong", "Marudi", "Matu", "Miri", "Mukah", "Nanga Medamit", "Niah", "Pusa", "Roban", "Saratok", "Sarikei", "Sebauh", "Sebuyau", "Serian", "Sibu", "Simunjan", "Song", "Spaoh", "Sri Aman", "Sundar", "Tanjung Kidurong", "Tatau"],
    ["Alam Impian", "Aman Perdana", "Ampang", "Ambang Botanic", "Ara Damansara", "Balakong", "Bandar Botanic", "Bandar Bukit Raja", "Bandar Bukit Tinggi", "Bandar Kinrara", "Bandar Puteri Klang", "Bandar Puteri Puchong", "Bandar Saujana Putra", "Bandar Sungai Long", "Bandar Sunway", "Bandar Utama", "Bangi", "Banting", "Batang Berjuntai", "Batang Kali", "Batu Arang", "Batu Caves", "Beranang", "Bukit Antarabangsa", "Bukit Beruntung", "Bukit Jelutong", "Bukit Rahman Putra", "Bukit Rotan", "Bukit Subang", "Cheras", "Country Heights", "Cyberjaya", "Damansara Damai", "Damansara Intan", "Damansara Jaya", "Damansara Kim", "Damansara Perdana", "Damansara Utama", "Denai Alam", "Dengkil", "Glenmarie", "Gombak", "Hulu Langat", "Hulu Selangor", "Jenjarom", "Kajang", "Kapar", "Kayu Ara", "Kelana Jaya", "Kerling", "Klang", "Kota Damansara", "Kota Emerald", "Kota Kemuning", "Kuala Kubu Baru", "Kuala Langat", "Kuala Selangor", "Kuang", "Mutiara Damansara", "Petaling Jaya", "Port Klang", "Puchong", "Puchong South", "Pulau Indah (Pulau Lumut)", "Pulau Carey", "Pulau Ketam", "Puncak Alam", "Puncak Jalil", "Putra Heights", "Rasa", "Rawang", "Sabak Bernam", "Salak Tinggi", "Saujana", "Saujana Utama", "Sekinchan", "Selayang", "Semenyih", "Sepang", "Serdang", "Serendah", "Seri Kembangan", "Setia Alam", "Setia Eco Park", "Shah Alam", "SierraMas", "SS2", "Subang Bestari", "Subang Heights", "Subang Jaya", "Subang Perdana", "Sungai Ayer Tawar", "Sungai Besar", "Sungai Buloh", "Sungai Pelek", "Taman TTDI Jaya", "Tanjong Karang", "Tanjong Sepat", "Telok Panglima Garang", "Tropicana", "Ulu Klang", "USJ", "USJ Heights", "Valencia"],
    ["Besut", "Dungun", "Hulu Terengganu", "Kemaman", "Kuala Terengganu", "Marang", "Setiu", "Kuala Nerus"],
  ]);

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

  const [areasToShow, setAreasToShow] = useState(
    props.states ? areaLocations[states.indexOf(props.states)] : []
  );
  useEffect(() => {
    setAreasToShow(
      props.states ? areaLocations[states.indexOf(props.states)] : []
    );
  }, [props.states]);

  return (
    <>
      <label htmlFor="areaLocations">Area Locations</label>
      <select
        name="areaLocations"
        value={
          areasToShow.includes(props.userAreaLocation)
            ? props.userAreaLocation
            : ""
        }
        onChange={(e) => {
          props.onChange(
            e.target.name,
            e.target.value,
            areaLocations.indexOf(e.target.value)
          );
        }}
        id="areaLocations"
        className="form-control"
      >
        <option>test</option>
        {areasToShow .map((location) => {
          return 
            <option key={location} value={location}>
              {location}
            </option>
          ;
        })}
      </select>
    </>
  );
}

export default AreaSelect;