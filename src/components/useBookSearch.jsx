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
      const arrStr = query.split("@");
      url = `http://localhost:5000/preferredBookSearch?${arrStr[0]}&page=${pageNumber}`;
    } else if (query.includes("@@@@uploadedRecently")) {
      const arrStr = query.split("@");
      url = `http://localhost:5000/uploadedRecentlySearch?${arrStr[0]}&page=${pageNumber}`;
    } else if (query.includes("@@@@userOtherInfo")) {
      const arrStr = query.split("@");
      url = `http://localhost:5000/users/info&id=${arrStr[0]}&page=${pageNumber}`;
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
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}
