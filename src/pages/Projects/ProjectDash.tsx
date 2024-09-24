
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import SelectAllUsers from '../../components/Forms/SelectGroup/SelectAllUsers';
import SelectPriorite from '../../components/Forms/SelectGroup/SelectPriorite';
import SelectState from '../../components/Forms/SelectGroup/SelectState';
import Slider from '../../components/Forms/Slider/Slider';
import CardProject from '../../components/Projects/CardProject';
import TableProject from '../../components/Projects/TableProject';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// services
import { Project } from '../../interfaces/Global';
import { Department } from '../../interfaces/Department';

import { getAllProjects, getFilteredProjects, projectsStatistics } from '../../services/ProjectService';
import SelectDepartment from '../../components/Forms/SelectGroup/SelectDepartment';
import { getProjectState } from '../../services/getStatistique';
import PercentageSelect from '../../components/Forms/SelectGroup/PercentageSelect';
import TablePreloader from '../../components/Preloader/TablePreloader';


const ProjectDash: React.FC = () => {

  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [Priority, setPriority] = useState("");
  const [departments, setDepartment] = useState("");
  const [state, setState] = useState("");
  const [users, setUsers] = useState<number[]>([]);

  const [sliderValue, setSliderValue] = useState(0);
  const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
  const [placeholder1, setPlaceholder1] = useState("Selectionner");
  const [placeholder2, setPlaceholder2] = useState("Selectionnez");
  const [prioColor, SetPrioColor] = useState("");

  const [response, setResponse] = useState<Project[]>([]);

  const [modes, setMode] = useState("Liste");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('projectCreatedAt');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedInterval, setSelectedInterval] = useState<string>('0-10');
  const [selectedValue, setSelectedValue] = useState<number>(0);

  // Donn"es statistique

  const [completedProjects, SetCompletedProjects] = useState("");
  const [inProgressProjects, SetInProgressProjects] = useState("");
  const [pendingProjects, SetPendingProjects] = useState("");
  const [totalProjects, SetTotalProjects] = useState("");

  const authorisation = localStorage.getItem('authorisation');

  const handleSliderChange = (value: number) => setSliderValue(value);

    // Fonction pour gérer les changements de sélection
    const handleIntervalChange = (interval: string) => {
      setSelectedInterval(interval);
      console.log('Intervalle sélectionné:', interval);
  };


  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    fetchProjects();
    fetchProjectsSate();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  const selecteModes = (value: string) => {
    console.log(value);
    setMode(value);
    localStorage.setItem('mode',value);
  };



  const fetchProjectsSate = async () => {
    setLoading(true);
    try {
        const response = await getProjectState();
        
        if (response && response.data) {
          SetCompletedProjects(response.data.totalProjectsCompleted);
          SetInProgressProjects(response.data.totalProjectsInProgress);
          SetPendingProjects(response.data.totalProjectsPending);
          SetTotalProjects(response.data.totalProjects);

        }

    } catch (error) {

    } finally {
        setLoading(false);
    }
};

  const fetchProjects = async () => {
    setLoading(true);
    try {
        const response = await getAllProjects(currentPage, pageSize, sortBy);
        if (response && response.data) {
          setResponse(response.data);
        } else {
          setResponse([]);
        }
        setTotalPages(5);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchProjects();
    fetchProjectsSate();
}, [currentPage, pageSize, sortBy]);


//   const fetchFilteredProjects = async () => {
//     try {
//         const apiResponse = await getFilteredProjects(
//             Priority,
//             state,
//             departments ? parseInt(departments) : undefined,
//             users.length > 0 ? users : undefined,
//             sliderValue,
//             dateDebut,
//             dateFin
//         );
//         // Assurez-vous que apiResponse.data est un tableau ou null
//         setResponse(apiResponse.data ?? null); // Utilisez l'opérateur nullish coalescing
    
//       } catch (error) {
//         console.error('Error fetching filtered projects:', error);
//         toast.error('Failed to fetch projects');
//         setResponse(null); // Assurez-vous de gérer les erreurs correctement
//     }
// };

const fetchFilteredProjects = async () => {
  setLoading(true);
  try {
      const apiResponse = await getFilteredProjects(
          Priority,
          state,
          departments ? parseInt(departments) : undefined,
          users.length > 0 ? users : undefined,
          // sliderValue,
          selectedInterval,
          dateDebut,
          dateFin,
          currentPage,
          pageSize
      );

      if (apiResponse && apiResponse.data) {
        setResponse(apiResponse.data);;
      } else {
        setResponse([]);
      }
  } catch (error) {
      console.error('Error fetching filtered projects:', error);
      setResponse([]);
  } finally {
      setLoading(false);
  }
};

const handleFilterClick = () => {
  setCurrentPage(0);
  fetchFilteredProjects();
};

const handlePageChange = (page: number) => {
  if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
  }
};


// Génération des numéros de page pour l'affichage
const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (

    <>

      <ToastContainer position="top-right" autoClose={5000} />

      <div className="mb-6 flex flex-col gap-y-4 rounded-xl  bg-white p-1  dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className=" border-stroke py-3 dark:border-strokedark  sm:px-6 xl:px-7.5">
            <nav>
              <ol className="flex flex-wrap items-center gap-3">
                <li style={activeItem === 0 ? { borderBottom: '2px solid white ' } : {}}>
                  <button className="flex items-center gap-3 font-medium" onClick={() => handleItemClick(0)}>
                    <span className="hover:text-black font-medium text-sm">TOUS</span>

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#000000] mb-1">
                      <span className="text-sm font-medium text-white"> {totalProjects} </span>
                    </div>

                  </button>
                </li>

                <li style={activeItem === 1 ? { borderBottom: '2px solid white ' } : {}}>
                  <button className="flex items-center gap-3 font-medium" onClick={() => handleItemClick(1)}>
                    <span className="hover:text-black  text-sm font-medium"> EN COURS</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D96941] mb-1">
                      <span className="text-sm font-medium text-white">{inProgressProjects}</span>
                    </div>
                  </button>
                </li>

                <li style={activeItem === 2 ? { borderBottom: '2px solid white ' } : {}}>
                  <button className="flex items-center gap-3 font-medium" onClick={() => handleItemClick(2)}>
                    <span className="hover:text-black  text-sm font-medium">EN ATTENTES </span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#033F73] mb-1">
                      <span className="text-sm font-medium text-white">{pendingProjects}</span>
                    </div>
                  </button>
                </li>

                <li style={activeItem === 3 ? { borderBottom: '2px solid white ' } : {}}>
                  <button className="flex items-center gap-3 font-medium" onClick={() => handleItemClick(3)}>
                    <span className="hover:text-black  text-sm font-medium">TERMINES</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E5902] mb-1">
                      <span className="text-sm font-medium text-white"> {completedProjects}</span>
                    </div>
                  </button>
                </li>

              </ol>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
            {authorisation === 'ADMIN' || authorisation === 'MANAGER' || authorisation === 'GLOBAL_ADMIN' ? (
                <div>
                    <Link to={`/auth/Admin/add/projets`} className="rounded-xl border text-nowrap flex items-center gap-2 bg-[#012340] py-2 px-4.5 font-medium text-white hover:bg-opacity-90">
                        <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
                        </svg>
                        AJOUTER UN PROJET
                    </Link>
                </div>
            ) : null}
        </div>

      </div>
      

      <div className={`flex flex-row  justify-between ${isOpen ? 'mb-5' : 'mb-10'}`}>
        <button onClick={toggleDropdown} className={` flex flex-row space-x-2 py-3 px-3 border-stroke  rounded-lg  text-title-lg  text-black dark:text-white ${isOpen ? 'bg-[#012340]': 'bg-white'}`}>
          <svg className='mt-1' width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="white" fill-opacity="0.6" />
            ) : (
              <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="black" fill-opacity="0.6" />
            )}
          </svg>
  
          <span className={` text-sm font-medium ${isOpen ? 'text-white': ''}`}> FILTRE</span>
        </button>

        <div className='flex '>

        {modes=="Liste" ? (

          <button  onClick={() => selecteModes('Module')} className=" flex flex-row space-x-2 py-3 px-3 border-stroke bg-white rounded-lg  text-title-lg   text-black dark:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 15H20V13H4V15ZM4 19H20V17H4V19ZM4 11H20V9H4V11ZM4 5V7H20V5H4Z" fill="#F27F1B" fill-opacity="0.38"/>
            </svg>
            <span className="text-sm font-medium"> LISTE</span>
          </button>

          ) : (

          <button onClick={() => selecteModes('Liste')} className=" flex flex-row space-x-2 py-3 px-3 border-stroke bg-white rounded-lg  text-title-lg   text-black dark:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V9C3 9.39782 3.15804 9.77936 3.43934 10.0607C3.72064 10.342 4.10218 10.5 4.5 10.5H9C9.39782 10.5 9.77936 10.342 10.0607 10.0607C10.342 9.77936 10.5 9.39782 10.5 9V4.5C10.5 4.10218 10.342 3.72064 10.0607 3.43934C9.77936 3.15804 9.39782 3 9 3ZM9 9H4.5V4.5H9V9ZM19.5 3H15C14.6022 3 14.2206 3.15804 13.9393 3.43934C13.658 3.72064 13.5 4.10218 13.5 4.5V9C13.5 9.39782 13.658 9.77936 13.9393 10.0607C14.2206 10.342 14.6022 10.5 15 10.5H19.5C19.8978 10.5 20.2794 10.342 20.5607 10.0607C20.842 9.77936 21 9.39782 21 9V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 9H15V4.5H19.5V9ZM9 13.5H4.5C4.10218 13.5 3.72064 13.658 3.43934 13.9393C3.15804 14.2206 3 14.6022 3 15V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H9C9.39782 21 9.77936 20.842 10.0607 20.5607C10.342 20.2794 10.5 19.8978 10.5 19.5V15C10.5 14.6022 10.342 14.2206 10.0607 13.9393C9.77936 13.658 9.39782 13.5 9 13.5ZM9 19.5H4.5V15H9V19.5ZM19.5 13.5H15C14.6022 13.5 14.2206 13.658 13.9393 13.9393C13.658 14.2206 13.5 14.6022 13.5 15V19.5C13.5 19.8978 13.658 20.2794 13.9393 20.5607C14.2206 20.842 14.6022 21 15 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V15C21 14.6022 20.842 14.2206 20.5607 13.9393C20.2794 13.658 19.8978 13.5 19.5 13.5ZM19.5 19.5H15V15H19.5V19.5Z" fill="#F27F1B"/>
            </svg>
            <span className="text-sm font-medium"> MODULE </span>
          </button>
        )}
        </div>
      </div>

      {isOpen && (

        <div className="mb-8 swim-lane flex flex-col gap-5.5">

          <div draggable="false" className=" relative  justify-between rounded-lg border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-lg font-medium text-black dark:text-white">Status</label>
                    <SelectState placeholder2={placeholder2} setState={setState} defaultDisabled={false} stateValue={''} />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-lg font-medium text-black dark:text-white">Priorité</label>
                    <SelectPriorite placeholder1={placeholder1} setPriority={setPriority} SetPrioColor={SetPrioColor} priorityValue={''} />
                  </div>


                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-lg font-medium text-black dark:text-white">Départments {users} </label>
                      <SelectDepartment setDepartment={setDepartment} departments={dataDepartment} />
                    </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-lg font-medium text-black dark:text-white">Membre {users} </label>
                    <SelectAllUsers setUsers={setUsers} departementId={ departments ? parseInt(departments) : undefined} />
                  </div>

              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">

                      <label className="mb-3 block text-lg font-medium text-black dark:text-white">Poucentage</label>
                      {/* <Slider min={0} max={100} value={sliderValue} onChange={handleSliderChange} /> */}
                      <PercentageSelect value={selectedInterval} onChange={handleIntervalChange} />
                      <p className="mt-4">Valeur sélectionnée: {selectedInterval}%</p>

                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-lg font-medium text-black dark:text-white">Date debut</label>
                      <input type="date"
                        placeholder=""
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-lg font-medium text-black dark:text-white">Date fin</label>
                      <input type="date"
                        placeholder=""
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>

              </div>

            <div className="flex justify-end gap-4.5">
              <button onClick={toggleDropdown}  className="flex justify-center rounded-lg border border-[#012340] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button" >ANNULER</button>
              <button  onClick={handleFilterClick} className="flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" >
                FILTRER
              </button>
            </div>

          </div>

        </div>

      )}

      {modes === 'Liste' ? (
        loading ? (
          <TablePreloader />
        ) : (
          <TableProject response={response} fetchProjects={fetchProjects} />
        )
      ) : (
        <CardProject response={response} fetchProjects={fetchProjects} />
      )}


      <div className="flex items-center justify-end mt-6">
        <div className="flex gap-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 text-sm text-gray-500 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Précédent
          </button>
          {totalPages > 1 && pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 text-sm rounded-md ${page === currentPage
                  ? 'text-blue-500 bg-blue-100'
                  : 'text-gray-500 hover:bg-gray-100'
                }`} >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 text-sm text-gray-500 rounded-md bg-gray-100 hover:bg-gray-200">
            Suivant
          </button>
        </div>
      </div>


    </>
  );

};

export default ProjectDash;
