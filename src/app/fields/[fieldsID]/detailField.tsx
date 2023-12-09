"use client";
import Image from "next/image";
import { useState } from "react";
import PercentageBarChart from "./components/percentageHorizontal";
import LineChart from "./components/lineChart";
import { Field, FieldArea, Humidity, Temperature } from "@prisma/client";
import toast from "react-hot-toast";

interface FieldsProps extends Field {
  temperatures: Temperature[];
  humidities: Humidity[];
  fieldArea?: FieldArea;
}

const DetailedField = ({ field }: { field: FieldsProps }) => {
  const fieldData = [
    { label: "Rice", percentage: field.fieldArea?.riceArea ?? 0 },
    { label: "Corn", percentage: field.fieldArea?.cornArea ?? 0 },
    { label: "Wheat", percentage: field.fieldArea?.wheatArea ?? 0 },
  ];
  const [harvestStatus, setHarvestStatus] = useState(field.harvestStatus);
  const [isWaterSystemOn, setIsWaterSystemOn] = useState(field.waterSystem);
  const [waterSystem, setWaterSystem] = useState(
    field.waterSystem ? "On" : "Off"
  );
  const [isFertilizeSystemOn, setFertilizeSystemOn] = useState(
    field.fertilizerSystem
  );
  const [fertilizeSystem, setFertilizeSystem] = useState(
    field.fertilizerSystem ? "On" : "Off"
  );

  const [isConfirmed, setIsConfirmed] = useState(field.isConfirmed);
  const [isRejected, setIsRejected] = useState(field.isRejected);

  const handleConfirm = async () => {
    try {
      const res = await fetch(`/api/v1/fields/${field.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isConfirmed: true,
          harvestStatus: "Is the harvesting finished?",
        }),
      });

      if (res?.ok) {
        toast.success("Harvest request accepted");
        setHarvestStatus("Is the harvesting finished?");
        setIsConfirmed(true);
      } else {
        toast.error("Failed to accept harvest request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(`/api/v1/fields/${field.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isRejected: true,
          harvestStatus: "You didn't accept the harvest request.",
        }),
      });

      if (res?.ok) {
        toast.success("Harvest request rejected");
        setHarvestStatus("You didn't accept the harvest request.");
        setIsRejected(true);
      } else {
        toast.error("Failed to reject harvest request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  const handleWaterSystem = async () => {
    try {
      const res = await fetch(`/api/v1/fields/${field.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waterSystem: !isWaterSystemOn,
        }),
      });

      if (res?.ok) {
        toast.success(
          "Water System turned " + (isWaterSystemOn ? "Off" : "On")
        );
        setIsWaterSystemOn((prevValue) => !prevValue);
        setWaterSystem((prevValue) => (prevValue === "On" ? "Off" : "On"));
      } else {
        toast.error(
          "Failed to turn Water System " + (isWaterSystemOn ? "Off" : "On")
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  const handleFertilizeSystem = async () => {
    try {
      const res = await fetch(`/api/v1/fields/${field.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fertilizerSystem: !isFertilizeSystemOn,
        }),
      });

      if (res?.ok) {
        toast.success(
          "Fertilizer System turned " + (isFertilizeSystemOn ? "Off" : "On")
        );
        setFertilizeSystemOn((prevValue) => !prevValue);
        setFertilizeSystem((prevValue) => (prevValue === "On" ? "Off" : "On"));
      } else {
        toast.error(
          "Failed to turn Fertilizer System " +
            (isFertilizeSystemOn ? "Off" : "On")
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  const handleFinishHarvest = async () => {
    try {
      const res = await fetch(`/api/v1/fields/${field.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isHarvested: true,
          harvestStatus: "Successfully Harvested!",
        }),
      });

      if (res?.ok) {
        toast.success("Harvest finished");
        setHarvestStatus("Successfully Harvested!");
      } else {
        toast.error("Failed to finish harvest");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  const formatNumber = (number: number) => {
    // Convert the number to string
    const numberString = number.toString();

    const [integerPart, decimalPart = ""] = numberString.split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedNumber = decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;

    return formattedNumber;
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] py-[137px]">
      <div className="px-10 grid grid-cols-1 xl:grid-cols-2 gap-[25px]">
        <div className="h-[400px] rounded-3xl drop-shadow-xl bg-white flex justify-center">
          <div className="p-2 flex flex-col items-center md:gap-4 lg:gap-10 md:flex-row md:px-10  xl:px-12">
            <Image
              src="/farmer1.svg"
              alt=""
              width={350}
              height={350}
              className="w-[150px] md:w-[350px]"
            />
            <div className="w-[200px] flex flex-col items-center">
              <h1 className="text-center text-[34px] font-bold font-dmsans md:text-[68px]">
                {field.name}
              </h1>
              <p className="pt-2 text-center text-[10px] md:text-[18px] font-normal font-dmsans">
                {field.isReadyToHarvest && harvestStatus}
              </p>
              <div className="pt-2 md:pt-8 flex flex-col items-center">
                {field.isReadyToHarvest ? (
                  field.isReadyToHarvest && !isConfirmed ? (
                    <>
                      {!isRejected && (
                        <button
                          onClick={handleConfirm}
                          className="w-[100px] h-[40px] bg-[#799E29] rounded-full text-white font-dmsans font-bold text-[10px] md:text-[15px]"
                        >
                          Confirm
                        </button>
                      )}
                      {!isRejected && (
                        <button
                          onClick={handleReject}
                          className="w-[100px] h-[40px] bg-[#C92A20] rounded-full text-white font-dmsans font-bold text-[10px] mt-2 md:text-[15px]"
                        >
                          Reject
                        </button>
                      )}
                    </>
                  ) : !field.isHarvested && !isRejected ? (
                    !field.isHarvested ? (
                      <button
                        className="w-[100px] h-[40px] bg-[#799E29] rounded-full text-white font-dmsans font-bold text-[10px] md:text-[15px] md:w-[150px] md:h-[40px]"
                        onClick={handleFinishHarvest}
                      >
                        Finish
                      </button>
                    ) : null
                  ) : null
                ) : (
                  <p className="pt-2 text-center text-[10px] md:text-[18px] font-normal font-dmsans">
                    Everything{"'"}s alright here
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-3 h-[400px] rounded-3xl drop-shadow-xl bg-white p-5 xl:col-start-2 xl:row-start-1">
          <p className="font-dmsans font-bold text-[20px] md:text-[40px] text-black">
            Temperature
          </p>
          <p className="font-dmsans font-medium text-[10px] md:text-[16px] text-[#9D9D9D]">
            Here is the weekly average temperature (°C) data for {field.name}{" "}
            for this month.
          </p>
          <LineChart
            data={field.temperatures.map((temperature) => ({
              week: "Week " + temperature.week,
              value: temperature.value,
            }))}
          />
        </div>
        <div className="h-[650px] sm:h-[400px] grid grid-cols-1 sm:grid-cols-2 sm:gap-2 xl:gap-0">
          <div className="h-[190px] bg-[#044D3A] rounded-3xl drop-shadow-xl py-4 px-6 flex justify-between xl:w-[320px]">
            <div className="flex md:justify-center">
              <div className="flex md:flex-col items-center">
                <Image
                  src="/water.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[50px] md:w-[100px]"
                />
                <h1 className="pl-5 font-dmsans text-white text-[12px] md:text-[20px] font-medium">
                  Water
                  <br />
                  System
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleWaterSystem}
                  checked={isWaterSystemOn}
                />
                <div className="w-11 h-6 bg-[#044D3A]  peer-focus:ring-4 peer-focus:ring-[#044D3A] rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#044D3A] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                <span className="ms-3 text-sm font-medium text-white dark:text-white">
                  {waterSystem}
                </span>
              </label>
            </div>
          </div>
          <div className="row-span-2 bg-white rounded-3xl drop-shadow-xl p-5">
            <p className="font-dmsans font-bold text-[20px] md:text-[40px] text-black">
              Field Area
            </p>
            <p className="font-dmsans font-bold text-[16px] md:text-[35px] text-[#044D3A]">
              {formatNumber(field.fieldArea?.area ?? 0)} Ha
            </p>
            <p className="font-dmsans font-medium text-[8px] md:text-[16px] text-[#9D9D9D]">
              With the type of land and its extant as follows
            </p>
            <div className="mt-10">
              <PercentageBarChart data={fieldData} />
            </div>
          </div>
          <div className="row-start-2 sm:row-start-2 h-[190px] bg-white rounded-3xl drop-shadow-xl py-4 px-6 flex justify-between xl:w-[320px]">
            <div className="flex md:justify-center">
              <div className="flex md:flex-col items-center">
                <Image
                  src="/fertilize.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[50px] md:w-[100px]"
                />
                <h1 className="md:pt-2 pl-5 font-dmsans text-black text-[12px] md:text-[20px] font-bold">
                  Fertilization
                  <br />
                  System
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleFertilizeSystem}
                  checked={isFertilizeSystemOn}
                />
                <div className="w-11 h-6 bg-[#D9D9D9]  peer-focus:ring-4 peer-focus:ring-white  rounded-full peer dark:bg-[#D9D9D9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-slate-400 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D9D9D9]"></div>
                <span className="ms-3 text-sm font-medium text-black dark:text-black">
                  {fertilizeSystem}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="h-[400px] rounded-3xl drop-shadow-2xl bg-white p-5">
          <p className="font-dmsans font-bold text-[40px] text-black">
            Humidity
          </p>
          <p className="font-dmsans font-medium text-[16px] text-[#9D9D9D]">
            Here is the weekly average humidity (%) data for field 5 for this
            month.
          </p>
          <LineChart
            data={field.humidities.map((humidity) => ({
              week: "Week " + humidity.week,
              value: humidity.value,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedField;
