import React from "react";
import AppLayout from "../Layout/AppLayout";
import Wrapper from "../Layout/Wrapper";
import Card from "../Components/Card";
import Ellipse from '../assets/Ellipse.png'
import Ellipse23 from '../assets/Ellipse23.png'
import Ellipse22 from '../assets/Ellipse22.png'
import Ellipse24 from '../assets/Ellipse24.png'
import { CgSearch } from "react-icons/cg";
import EmployeeProfile from "../Components/EmployeeProfile";
const Companies = () => {
  return (
    <>
      <Wrapper title={"Companies"}>
        <div className="flex  justify-between  gap-x-20 lg:pt-4 px-5">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white"
            />
            <CgSearch className="text-slate-700 m-auto absolute lg:right-5 lg:top-3  " />
          </div>
          <button className="text-white text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-gradient-to-b from-yellow-400 to-yellow-600">
            Add New Company
          </button>
        </div>
        <div className="flex">
        <div className="flex gap-x-7 px-6   pt-16 text-center">
          <EmployeeProfile img={Ellipse} desc={"Ahad"} />
        </div>
        <div className="flex gap-x-7 px-6   pt-16 text-center">
          <EmployeeProfile img={Ellipse23} desc={"Ali khan "} />
        </div>
        <div className="flex gap-x-7 px-6   pt-16 text-center">
          <EmployeeProfile img={Ellipse22} desc={"Sania "} />
        </div>
        <div className="flex gap-x-7 px-6   pt-16 text-center">
          <EmployeeProfile img={Ellipse24} desc={"Sani Zafar"} />
        </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AppLayout()(Companies);
