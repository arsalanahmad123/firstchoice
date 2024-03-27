import React from 'react';
import Wrapper from '../Layout/Wrapper';
import AppLayout from '../Layout/AppLayout';
import { CgSearch } from 'react-icons/cg';
import Card from '../Components/Card';
import Elipse from '../assets/Ellipse.png'
import DashboardCard from '../Components/DashboardCard';
const Employees = () => {
  return (
    <Wrapper title="Employees">
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
        <div className="flex gap-x-7 px-6   pt-16 text-center">
          <DashboardCard/>
        </div>
    </Wrapper>
  );
};

export default AppLayout()(Employees);
