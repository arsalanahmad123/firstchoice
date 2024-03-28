import React from "react";
import { FiPlus } from "react-icons/fi";

const EmployeeProfile = (props) => {
  return (
    <div className="flex ">
      <div className="flex flex-col text-white  rounded-xl    bg-bgLight   pb-5  px-6   pt-5 text-center">
        <img src={props.img} alt="" />
        <p className="pt-4">{props.desc}</p>
    </div>
    </div>
  );
};

export default EmployeeProfile;
