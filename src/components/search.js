import React from "react";

const search = ({ setQuery, setPictures, setPageNumber }) => {
  const inputHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const clickHandler = (e) => {
    setPictures([]);
    setPageNumber(1);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      <button onClick={clickHandler}>SEARCH</button>
    </div>
  );
};

export default search;
