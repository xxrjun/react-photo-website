import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Search from "../components/search";
import Picture from "../components/picture";

const Homepage = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const auth = "563492ad6f917000010000018a9f3359935a4946b784ba05c0d42fa0";
  const initialUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${pageNumber}`;
  const searchUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=${pageNumber}`;

  // get pictures data
  const getData = async (url) => {
    let cancel;
    setLoading(true);
    setError(false);
    axios
      .get(url, {
        header: {
          Authorization: auth,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setLoading(false);
        setHasMore(response.data.total_results > 0);
        console.log(response);
        setPictures(response.data.photos);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        console.log(err);
      });
    return () => cancel();
  };

  // load more
  const observer = useRef();
  const lastPictureElement = useCallback(
    (node) => {
      if (loading) return; // avoid repeat api request
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (query === "") {
      getData(initialUrl);
    } else {
      getData(searchUrl);
    }
  }, [pageNumber]);

  useEffect(() => {
    getData(initialUrl);
  }, []);

  return (
    <div>
      <Search
        setQuery={setQuery}
        setPictures={setPictures}
        setPageNumber={setPageNumber}
      />
      <div className="pictures">
        {pictures &&
          pictures.map((picture, index) => {
            if (pictures.length === index + 1)
              return <Picture ref={lastPictureElement} picture={picture} />;
            else return <Picture picture={picture} />;
          })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error!"}</div>
    </div>
  );
};

export default Homepage;
