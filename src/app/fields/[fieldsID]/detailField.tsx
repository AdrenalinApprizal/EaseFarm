"use client";
import Image from "next/image";
import { useState } from "react";
import PercentageBarChart from "./components/percentageHorizontal";
import LineChart from "./components/lineChart";

const DetailedField = () => {
  const fieldData = [
    { label: 'Rice', percentage: 75 },
    { label: 'Corn', percentage: 20 },
    { label: 'Wheat', percentage: 5 },
  ];
  const tempData = [
    { week: 'Week 1', value: 25},
    { week: 'Week 2', value: 35},
    { week: 'Week 3', value: 22},
    { week: 'Week 4', value: 32},
  ];
  const humidityData = [
    { week: 'Week 1', value: 25},
    { week: 'Week 2', value: 35},
    { week: 'Week 3', value: 22},
    { week: 'Week 4', value: 32},
  ];

  const [harvestStatus, setHarvestStatus] = useState(
    "Ready to Harvest Now. Can You Handle It?"
  );
  const [waterSystem, setWaterSystem] = useState('Off');
  const [fertilizeSystem, setFertilizeSystem] = useState('Off');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRejected, setIsRejected] = useState(false)
  const handleConfirm = () => {
    setHarvestStatus("Is the harvesting finished?");
    setIsConfirmed(true);
  };
  const handleReject = () => {
    setHarvestStatus("Ready to Harvest Now.");
    setIsRejected(true);
  }
  const handleWaterSystem = () => {
    setWaterSystem((prevValue) => (prevValue === "On" ? "Off" : "On"));
  }
  const handleFertilizeSystem = () => {
    setFertilizeSystem((prevValue) => (prevValue === "On" ? "Off" : "On"));
  }

  return (
    <div className="min-h-screen bg-[#EBEBEB] py-[137px]">
      <div className="px-10 grid grid-cols-1 xl:grid-cols-2 gap-[25px]">
        <div className="h-[400px] rounded-3xl drop-shadow-xl bg-white flex justify-center">
          <div className="p-2 flex flex-col items-center md:gap-4 lg:gap-10 md:flex-row md:px-10  xl:px-12">
            <Image src="/farmer1.svg" alt="" width={350} height={350} className="w-[150px] md:w-[350px]"/>
            <div className="w-[200px] flex flex-col items-center">
              <h1 className="text-center text-[34px] font-bold font-dmsans md:text-[68px]">
                Field 5
              </h1>
              <p className="pt-2 text-center text-[10px] md:text-[18px] font-normal font-dmsans">
                {harvestStatus}
              </p>
              <div className="pt-2 md:pt-8 flex flex-col items-center">
              {isConfirmed ? (
                  <button className="w-[100px] h-[40px] bg-[#799E29] rounded-full text-white font-dmsans font-bold text-[10px] md:text-[15px] md:w-[150px] md:h-[40px]">
                    Finish
                  </button>
                ) : (
                  <>
                    {!isRejected && (
                      <button
                        onClick={handleConfirm}
                        className="w-[100px] h-[40px] bg-[#799E29] rounded-full text-white font-dmsans font-bold text-[10px] md:text-[15px]">
                        Confirm
                      </button>
                    )}
                    {!isRejected && (
                      <button
                        onClick={handleReject}
                        className="w-[100px] h-[40px] bg-[#C92A20] rounded-full text-white font-dmsans font-bold text-[10px] mt-2 md:text-[15px]">
                        Reject
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-3 h-[400px] rounded-3xl drop-shadow-xl bg-white p-5 xl:col-start-2 xl:row-start-1">
            <p className="font-dmsans font-bold text-[20px] md:text-[40px] text-black">Temperature</p>
            <p className="font-dmsans font-medium text-[10px] md:text-[16px] text-[#9D9D9D]">Here is the weekly average temperature (°C) data for field 5 for this month.</p>
            <LineChart data={tempData}/>
        </div>
        <div className="h-[650px] sm:h-[400px] grid grid-cols-1 sm:grid-cols-2 sm:gap-2 xl:gap-0">
          <div className="h-[190px] bg-[#044D3A] rounded-3xl drop-shadow-xl py-4 px-6 flex justify-between xl:w-[320px]">
            <div className="flex md:justify-center">
              <div className="flex md:flex-col items-center">
                <Image src="/water.svg" alt="" width={100} height={100} className="w-[50px] md:w-[100px]"/>
                <h1 className="pl-5 font-dmsans text-white text-[12px] md:text-[20px] font-medium">Water<br />System</h1>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handleWaterSystem}/>
                <div className="w-11 h-6 bg-[#044D3A]  peer-focus:ring-4 peer-focus:ring-[#044D3A] rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#044D3A] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                <span className="ms-3 text-sm font-medium text-white dark:text-white">{waterSystem}</span>
              </label>
            </div>
          </div>
          <div className="row-span-2 bg-white rounded-3xl drop-shadow-xl p-5">
            <p className="font-dmsans font-bold text-[20px] md:text-[40px] text-black">Field Area</p>
            <p className="font-dmsans font-bold text-[16px] md:text-[35px] text-[#044D3A]">3.425.000 Ha</p>
            <p className="font-dmsans font-medium text-[8px] md:text-[16px] text-[#9D9D9D]">With the type of land and its extant as follows</p>
            <div className="mt-10">
              <PercentageBarChart data={fieldData}/>
            </div>
          </div>
          <div className="row-start-2 sm:row-start-2 h-[190px] bg-white rounded-3xl drop-shadow-xl py-4 px-6 flex justify-between xl:w-[320px]">
            <div className="flex md:justify-center">
              <div className="flex md:flex-col items-center">
                <Image src="/fertilize.svg" alt="" width={100} height={100} className="w-[50px] md:w-[100px]"/>
                <h1 className="md:pt-2 pl-5 font-dmsans text-black text-[12px] md:text-[20px] font-bold">Fertilization<br />System</h1>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handleFertilizeSystem}/>
                <div className="w-11 h-6 bg-[#D9D9D9]  peer-focus:ring-4 peer-focus:ring-white  rounded-full peer dark:bg-[#D9D9D9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-slate-400 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D9D9D9]"></div>
                <span className="ms-3 text-sm font-medium text-black dark:text-black">{fertilizeSystem}</span>
              </label>
            </div>
            

          </div>
        </div>
        <div className="h-[400px] rounded-3xl drop-shadow-2xl bg-white p-5">
          <p className="font-dmsans font-bold text-[20px] md:text-[40px] text-black">Humidity</p>
          <p className="font-dmsans font-medium text-[10px] md:text-[16px] text-[#9D9D9D]">Here is the weekly average humidity (%) data for field 5 for this month.</p>
          <LineChart data={humidityData}/>
        </div>
      </div>
    </div>
  );
};

export default DetailedField;
