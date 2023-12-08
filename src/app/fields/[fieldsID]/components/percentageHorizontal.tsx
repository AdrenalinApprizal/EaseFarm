import React from 'react';

interface PercentageBarChartProps {
  data: { label: string; percentage: number }[];
}

const PercentageBarChart: React.FC<PercentageBarChartProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center w-72 space-x-2">
          <div className="flex-shrink-0 w-20 text-gray-700">{item.label}</div>
          <div className="flex-1 bg-[#EBEBEB] h-5 relative flex flex-col rounded-full">
            <div
              className="flex-1 bg-[#044D3A] rounded-full"
              style={{ width: `${item.percentage}%` }}
            >
            </div>
          </div>
          <div className="flex-shrink-0 w-20 text-gray-700 text-right">{item.percentage}%</div>
        </div>
      ))}
    </div>
  );
};

export default PercentageBarChart;
