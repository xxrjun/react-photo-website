import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Homepage = () => {
  const [query, setQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState(""); // 避免 load more 時 load 到不同主題的照片
  const [pageNumber, setPageNumber] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const auth = "563492ad6f917000010000018a9f3359935a4946b784ba05c0d42fa0";
  const initialUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${pageNumber}`;
  const searchUrl = `https://api.pexels.com/v1/search?query=${currentQuery}&per_page=16&page=${pageNumber}`;
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

  // first loading
  useEffect(() => {
    getData(initialUrl);
  }, []);

  // load more pictures
  useEffect(() => {
    if (currentQuery === "") {
      getData(initialUrl);
    } else {
      getData(searchUrl);
    }
  }, [currentQuery, pageNumber]);

  // observe last element and using callback function to update pageNumber if hasMore and isIntersecting
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
        query={query}
        setQuery={setQuery}
        setCurrentQuery={setCurrentQuery}
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
