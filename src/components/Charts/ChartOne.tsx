import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 100,
    },
  };

  interface ChartOneState {
    series: {
      name: string;
      data: number[];
    }[];
  }

const ChartOne: React.FC = () => {

  const [state, setState] = useState<ChartOneState>({
    
    series: [
      {
        name: 'Product One',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Product Two',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],

  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;


  const [activeButton, setActiveButton] = useState('SEMAINE');
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };



  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
    <div className="">
      <div className="px-6 pt-6 pb-7.5">

    <div className="mb-5.5 flex flex-col sm:flex-row justify-between items-center gap-3.5">
      <div>
        <span className="text-2xl text-[#080808] font-bold">Statistique des projets</span>
      </div>

      <div className="flex flex-wrap items-center bg-[#0123401A] justify-center gap-3.5">
        <button
          className={`inline-flex items-center justify-center w-full sm:w-auto gap-3 rounded-md border py-2 px-4.5 font-medium ${
            activeButton === 'SEMAINE'
              ? 'bg-[#012340] text-white border-primary'
              : 'hover:border-primary hover:bg-primary/[0.08] hover:text-primary border-stroke dark:border-strokedark'
          }`}
          onClick={() => handleButtonClick('SEMAINE')}
        >
          SEMAINE
        </button>

        <button
          className={`inline-flex items-center justify-center w-full sm:w-auto gap-3 rounded-md border py-2 px-4.5 font-medium ${
            activeButton === 'MOIS'
              ? 'bg-[#012340] text-white border-primary'
              : 'hover:border-primary hover:bg-primary/[0.08] hover:text-primary border-stroke dark:border-strokedark'
          }`}
          onClick={() => handleButtonClick('MOIS')}
        >
          MOIS
        </button>

        <button
          className={`inline-flex items-center justify-center w-full sm:w-auto gap-3 rounded-md border py-2 px-4.5 font-medium ${
            activeButton === 'ANNEES'
              ? 'bg-[#012340] text-white border-primary'
              : 'hover:border-primary hover:bg-primary/[0.08] hover:text-primary border-stroke dark:border-strokedark'
          }`}
          onClick={() => handleButtonClick('ANNEES')}
        >
          ANNEES
        </button>
      </div>

    </div>

        <div className="grid gap-1 rounded bg-gray-2 py-2 px-4.5 dark:bg-graydark xsm:grid-cols-7 sm:grid-cols-5">
          <div className="xsm:col-span-3">
            <h4 className="text-sm font-medium uppercase">EMAIL TITLE</h4>
          </div>
          <div className="xsm:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-medium uppercase">STATUS</h4>
          </div>
          <div className="xsm:col-span-2 sm:col-span-1">
            <h4 className="text-sm font-medium uppercase xsm:text-right">CONVERSION</h4>
          </div>
        </div>

        <div className="mt-4.5 flex flex-col gap-6 hidden">
          {/* Repeatable grid items */}
        </div>

        <div className="mt-4.5 flex flex-col gap-6 block">
          {/* Repeatable grid items */}
        </div>
      </div>
    </div>
  </div>

  );

};

export default ChartOne;
