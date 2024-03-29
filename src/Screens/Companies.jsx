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
import Header from "../Components/Header";
const Companies = () => {
  return (
    <>
      <Wrapper title={"Companies"}>
       <Header/>
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
