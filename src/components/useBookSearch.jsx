import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  let url;
  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    if (query === "") url = `http://localhost:5000/allBooks&page=${pageNumber}`;
    else if (query === "@@@@userFavourite")
      url = `http://localhost:5000/users/favourites&page=${pageNumber}`;
    else if (query === "@@@@userInfo")
      url = `http://localhost:5000/users/info&page=${pageNumber}`;
    else if (query.includes("@@@@preferredBooks")) {
      // url = `http://localhost:5000/preferredBookAll&page=${pageNumber}`;
      const arrStr = query.split('@')
      url = `http://localhost:5000/preferredBookSearch?${arrStr[0]}&page=${pageNumber}`;

    } else if (query.includes("@@@@uploadedRecently")){
      // url = `http://localhost:5000/preferredBookAll&page=${pageNumber}`;
      const arrStr = query.split('@')
      url = `http://localhost:5000/uploadedRecentlySearch?${arrStr[0]}&page=${pageNumber}`;

    } else if (query.includes("@@@@userOtherInfo")) {
      let email = query.substring(17);
      url = `http://localhost:5000/users/info&email=:${email}&page=${pageNumber}`;
    } else if (query.includes("search=")) {
      url = `http://localhost:5000/trySearch?${query}&page=${pageNumber}`;
    } else url = `http://localhost:5000/search=${query}&page=${pageNumber}`;
    setLoading(true);
    setError(false);
    let cancel;
    const authToken = localStorage.getItem("authToken") || "empty";

    axios({
      method: "GET",
      url: url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [...prevBooks, ...res.data];
        });
        console.log("books", books);
        setHasMore(res.data.length > 0);
        console.log(hasMore);
        setLoading(false);

        console.log(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  console.log(loading);
  return { loading, error, books, hasMore };
}
