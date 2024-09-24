import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ProjectStatisticsChartProps {

    totalProjectsInProgress: number;
    totalProjectsPending: number;
    totalProjectsCompleted: number;
    
}


const projectOptions: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#D96941', '#033F73', '#038C4C'],
    labels: ['En cours','En attente', 'Terminés'],
    legend: {
        show: true,
        position: 'left',
        fontSize: '15px',
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
                    width: 300,
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

const ProjectStatisticsChart: React.FC<ProjectStatisticsChartProps> = ({
    totalProjectsInProgress,totalProjectsPending,totalProjectsCompleted,

}) => {

    const series = [totalProjectsInProgress,totalProjectsPending, totalProjectsCompleted];

    return (

        <div className="bg-white shadow-md rounded-lg overflow-hidden px-2 p-4">

            <h2 className="text-lg text-black  font-bold mb-2">Statistiques du projet</h2>

                <div className="flex justify-center ">
                    <ReactApexChart options={projectOptions} series={series} type="donut" />
                </div>

        </div>
    );
};

export default ProjectStatisticsChart;
