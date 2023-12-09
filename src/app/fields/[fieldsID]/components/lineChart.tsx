import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface LineChartProps {
  data: { week: string; value: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line' as const,
    },
    series: [
      {
        name: 'Temperature',
        data: data.map(item => item.value),
        color: '#044D3A',
      },
    ],
    xaxis: {
      categories: data.map(item => item.week),
    },
    yaxis: {
      categories: [0, 10, 20, 30, 40],
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions as any}
        series={chartOptions.series}
        type="line"
        height={250}
      />
    </div>
  );
};

export default LineChart;
