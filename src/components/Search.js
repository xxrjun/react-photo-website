import React from "react";

const Search = ({
  query,
  setQuery,
  setCurrentQuery,
  setPictures,
  setPageNumber,
}) => {
  const inputHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const clickHandler = (e) => {
    setPictures([]);
    setPageNumber(1);
    setCurrentQuery(query);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      <button onClick={clickHandler}>SEARCH</button>
    </div>
  );
};

export default Search;
