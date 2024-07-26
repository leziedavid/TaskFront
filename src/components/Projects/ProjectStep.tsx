import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProjectStepProps {
    fetchProjectDetails: (code: string) => Promise<void>;
    id: string | undefined; //
}

const ProjectStep: React.FC<ProjectStepProps> = ({}) => {

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const toggleAccordion = (index: number) => {
        switch (index) {
            case 1:
                setIsOpen1(!isOpen1);
                break;
            case 2:
                setIsOpen2(!isOpen2);
                break;
            case 3:
                setIsOpen3(!isOpen3);
                break;
            default:
                break;
        }
    };



    return (

        <>

            <section className="bg-white dark:bg-gray-900">
                <ol className="overflow-hidden space-y-8">
                    
                    <li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-[#BDBDBD] after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
                    
                        <a className="flex font-medium w-full">
                            <span className="w-28 h-8 bg-[#012340] relative z-20 border-2 after:bg-[#BDBDBD] rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                                1
                            </span>
                            <div className="block">
                                <h4 className="text-base text-black  mb-2">21/07/2024</h4>
                                <p className="text-sm text-gray-900 max-w-lg mb-2 ">21/07/2024 demarrage du projet. 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet </p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                            </div>
                        </a>

                    </li>

                    <li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-[#BDBDBD] after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
                    
                    <a className="flex font-medium w-full">
                        <span className="w-8 h-8 bg-[#012340] relative z-20 border-2 after:bg-[#BDBDBD] rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                            2
                        </span>
                        <div className="block">
                            <h4 className="text-base text-black mb-2">21/07/2024</h4>
                                <p className="text-sm text-gray-900 max-w-lg mb-2 ">21/07/2024 demarrage du projet. 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet </p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                        </div>
                    </a>

                    </li>
                    <li className="relative flex-1 after:content-[''] after:w-0.5 after:h-full after:bg-[#BDBDBD] after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
                    
                    <a className="flex font-medium w-full">
                        <span className="w-8 h-8 bg-[#012340] relative z-20 border-2 after:bg-[#BDBDBD] rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                            3
                        </span>
                        <div className="block">
                            <h4 className="text-base text-black mb-2">21/07/2024</h4>
                                <p className="text-sm text-gray-900 max-w-lg mb-2 ">21/07/2024 demarrage du projet. 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet 21/07/2024 demarrage du projet </p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                                <p className="text-sm text-gray-600 max-w-lg mb-2 ">Of course, we are here to guide you.</p>
                        </div>
                    </a>

                    </li>


                </ol>

            </section>

        </>

    );
};

export default ProjectStep;
