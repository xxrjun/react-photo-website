import React from "react";

const picture = ({ picture }) => {
  return (
    <div>
      <p>{picture.photographer}</p>
      <div className="imageContainer">
        <img src={picture.src.large} alt={picture.alt} />
      </div>
      <p>
        Download Image:{" "}
        <a target="_blank" href={picture.src.large} rel="noreferrer">
          Click Here
        </a>
      </p>
    </div>
  );
};

export default picture;
