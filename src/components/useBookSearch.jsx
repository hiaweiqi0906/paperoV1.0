import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  let url;
useEffect(()=>{
setBooks([])
}, [query])

  useEffect(() => {
      if(query==='') url=`http://localhost:5000/allBooks&page=${pageNumber}`
      else url=`http://localhost:5000/search=${query}&page=${pageNumber}`
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
          console.log(res.data)
        setBooks((prevBooks) => {
          return [...prevBooks, ...res.data]
        });
        console.log('books', books)
        setHasMore(res.data.length > 0);
        console.log(hasMore)
        setLoading(false);

        console.log(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}
