import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

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
  const controller = new AbortController();

  // get pictures data
  const getData = async (url) => {
    setLoading(true);
    setError(false);
    await axios
      .get(url, {
        headers: {
          Authorization: auth,
        },
        signal: controller.signal,
      })
      .then((response) => {
        setHasMore(response.data.total_results > 0);
        console.log(response);
        setPictures((prePictures) => {
          return [...prePictures, ...response.data.photos];
        });
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        console.log(err);
      });

    // cancel the request
    controller.abort();
  };

  useEffect(() => {
    getData(initialUrl);
  }, []);

  useEffect(() => {
    if (query === "") {
      getData(initialUrl);
    } else {
      getData(searchUrl);
    }
  }, [query, pageNumber]);

  // load more pictures
  const observer = useRef();
  const lastPictureElement = useCallback(
    (node) => {
      if (loading) return; // avoid repeat api request
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <Search
        setQuery={setQuery}
        setPictures={setPictures}
        setPageNumber={setPageNumber}
      />
      <div className="pictures">
        {pictures &&
          pictures.map((picture, index) => {
            if (pictures.length === index + 1) {
              return (
                <div className="picture" ref={lastPictureElement}>
                  <Picture picture={picture} key={picture.id} />
                </div>
              );
            } else {
              return (
                <div className="picture">
                  <Picture picture={picture} key={picture.id} />
                </div>
              );
            }
          })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error!"}</div>
      <Footer />
    </div>
  );
};

export default Homepage;
