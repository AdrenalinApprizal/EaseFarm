import Image from "next/image";

const Fields = () => {
  const dummyData = [
    {
      fieldName: "Field 1",
      humidity: "80%",
      image: "/fields/highland-photo-wallpaper-preview.jpg",
      temperature: "21°C",
      harvestTime: "36 days",
      pest: "None",
      waterSystem: "OFF",
      fertilizerSystem: "OFF",
    },
    {
      fieldName: "Field 2",
      humidity: "80%",
      image: "/fields/field.jpg",
      temperature: "21°C",
      harvestTime: "Now!",
      pest: "None",
      waterSystem: "OFF",
      fertilizerSystem: "OFF",
    },
    {
      fieldName: "Field 3",
      humidity: "80%",
      image: "/fields/field.jpg",
      temperature: "21°C",
      harvestTime: "21 days",
      pest: "None",
      waterSystem: "OFF",
      fertilizerSystem: "OFF",
    },
    {
      fieldName: "Field 4",
      humidity: "80%",
      image: "/fields/field.jpg",
      temperature: "21°C",
      harvestTime: "21 days",
      pest: "Pest detected!",
      waterSystem: "OFF",
      fertilizerSystem: "OFF",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2 lg:-mx-4">
        {dummyData.map((field, index) => (
          <div
            className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2"
            key={index}
          >
            <div className="overflow-hidden rounded-[16px] shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer">
              <Image
                alt="farm-field"
                className="block h-auto w-full"
                height={300}
                src={field.image}
                width={300}
              />
              <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-2xl text-black font-semibold">
                  {field.fieldName}
                </h1>
                <p className="text-slate-500 text-sm">
                  Harvest : {field.harvestTime}
                </p>
              </div>

              <hr className="border border-slate-100" />

              <div className="flex items-center justify-between leading-none p-8 xl:px-24">
                <div className="flex flex-col gap-4">
                  <Image
                    alt="humidity"
                    className="block mx-auto"
                    height={50}
                    src="/fields/humidity-icon.svg"
                    width={50}
                  />
                  <p className="text-center text-black font-semibold">
                    {field.humidity}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Image
                    alt="temperature"
                    className="block mx-auto"
                    height={50}
                    src="/fields/temperature-icon.svg"
                    width={50}
                  />
                  <p className="text-center text-black font-semibold">
                    {field.temperature}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Image
                    alt="waterSystem"
                    className="block mx-auto"
                    height={50}
                    src="/fields/water-icon.svg"
                    width={50}
                  />
                  <p className="text-center text-[#787877] font-semibold bg-[#D9D9D9] rounded-full px-7 py-4">
                    {field.waterSystem === "ON" ? "On" : "Off"}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Image
                    alt="fertilizerSystem"
                    className="block mx-auto"
                    height={50}
                    src="/fields/fertilizer-icon.svg"
                    width={50}
                  />
                  <p className="text-center text-[#787877] font-semibold bg-[#D9D9D9] rounded-full px-7 py-4">
                    {field.fertilizerSystem === "ON" ? "On" : "Off"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fields;
