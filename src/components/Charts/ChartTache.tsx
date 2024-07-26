import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const ChartTache: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [65, 34, 12],
  });

  const [legendPosition, setLegendPosition] = useState<'right' | 'bottom'>('right');

  // Effect to update legend position based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setLegendPosition('bottom');
      } else {
        setLegendPosition('right');
      }
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chart options configuration
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    
    colors: ['#038C4C', '#F27F1B', '#033F73', '#0FADCF'],
    labels: ['Femmes', 'Hommes', 'Autre'],
    legend: {
      show: true,
      position: legendPosition,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (

    <div className="mb-6 sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">Tâches par projet</h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={state.series} type="donut" />
        </div>
      </div>
      
    </div>

  );
};

export default ChartTache;
