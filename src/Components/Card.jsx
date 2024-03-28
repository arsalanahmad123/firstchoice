import React from "react";

const Card = (props) => {
  return (
    <>
      
      <div div className="">
        <img src={props.img} />
        <label className="text-white text-center ">{props.title}</label>
      </div>
    </>
  );
};

export default Card;
