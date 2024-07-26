import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SkillBar from '../../components/Forms/Slider/SkillBar';
import UserOne from '../../images/user/user-01.png';
import AddModalLeaders from '../../components/Modal/AddModalLeaders';
import SupUsersActionModal from '../../components/Modal/SupUsersActionModal';
import TaskCard from '../../components/Projects/TaskCard';
import ProjectStep from '../../components/Projects/ProjectStep';
import AddFilesCard from '../../components/Projects/AddFilesCard';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ApiResulte {
    code: number;
    data: string;
    message: string;
    }

// services
import {Task,ProjectsDetails } from '../../interfaces/Global';
import { getProjectDetails,removeUserFromProject ,updateGroupLeader} from '../../services/ProjectService';
import { BaseResponse } from '../../interfaces/ApiResponse';

const ProjectDetail: React.FC = () => {

    const [response, setResponse] = useState<ProjectsDetails | null>(null);
    const [apiRes, setApiRes] = useState<BaseResponse<ApiResulte> | null>(null);

    const [tasksEnCours, setTasksEnCours] = useState<Task[]>([]);
    const [tasksEnAttente, setTasksEnAttente] = useState<Task[]>([]);
    const [tasksTermines, setTasksTermines] = useState<Task[]>([]);

    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState('styled-steps');

    const [isModalOpens, setIsModalOpens] = useState(false);

    const openModal = () => {
        setIsModalOpens(true);
    };

    const closeModal = () => {
        setIsModalOpens(false);
    };



    const handleTabClick = (tabId: React.SetStateAction<string>) => {
        setActiveTab(tabId);
    };

    const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);

    const fetchProjectDetails = async (code: string) => {
        try {
            const apiResponse = await getProjectDetails(code);
            setResponse(apiResponse.data);
            setOpenfiles(false);
            // Vérification de leader dans la première entrée des utilisateurs
            if (response && response.users.length > 0) {
                // const isFirstUserLeader = response.users[0].leader;
                const defaultLeaderId = response?.users.find(user => user.leader)?.user.userId;
                console.log(response?.users);

                if (defaultLeaderId) {
                    setSelectedLeaderId(defaultLeaderId);
                }

            }

        } catch (error) {
            console.error('Error fetching project details:', error);
            toast.error('Failed to fetch project details');
        }
    };

    useEffect(() => {
        // Vérifiez si projectCode est défini
        if (id) {
            fetchProjectDetails(id);
            setOpenfiles(false);
        }

        const defaultLeaderId = response?.users.find(user => user.leader)?.user.userId;

        console.log(response?.users);

        if (defaultLeaderId) {
            setSelectedLeaderId(defaultLeaderId);
        }


    }, [id]);

    useEffect(() => {
        const defaultLeaderId = response?.users.find(user => user.leader)?.user.userId;
        console.log(response?.users);
        if (defaultLeaderId) {
            setSelectedLeaderId(defaultLeaderId);
        }


    }, [response?.users]);

    useEffect(() => {

        if (response) {
            const tasks = response.tasks;

            const tasksEnCoursFiltered = tasks.filter(task => task.taskState === 'EN_COURS');
            const tasksEnAttenteFiltered = tasks.filter(task => task.taskState === 'EN_ATTENTE');
            const tasksTerminesFiltered = tasks.filter(task => task.taskState === 'TERMINER');

            setTasksEnCours(tasksEnCoursFiltered);
            setTasksEnAttente(tasksEnAttenteFiltered);
            setTasksTermines(tasksTerminesFiltered);

            console.log(tasksEnCoursFiltered);
        }
    }, [response]);

    const handleCheckboxChange = async (userId: number) => {
        try {

                if (selectedLeaderId === userId) {
                    setSelectedLeaderId(null);
        
                } else {
        
                    const previousLeaderId = selectedLeaderId || 0; // Utilisez une valeur par défaut si selectedLeaderId est null
                    console.log(previousLeaderId, userId);
                    setSelectedLeaderId(userId); // Sélectionner un nouveau leader
                    
                    if (id) {

                        const Respond = await updateGroupLeader(id, previousLeaderId, userId);
                        setApiRes(Respond);

                        updateGroupLeader(id, previousLeaderId, userId); // Mettre à jour le leader dans votre base de données
                    }

                }

        } catch (error) {
            console.error('Error removing user from project:', error);
            toast.error('Failed to remove user from project');
        }
    };

    // Fonction octetsEnMB ajustée
    const octetsEnMB = (tailleEnOctets: number): string => {
        const tailleEnMo = tailleEnOctets / (1024 * 1024);
        const tailleEnMoFormatee = tailleEnMo.toFixed(2);
        return `${tailleEnMoFormatee} MB`;
    };


    const [projectId, setProjectId]= useState('');
    const [userIdToRemove, setUserIdToRemove] = useState<number | null>(null);
    const [openfiles, setOpenfiles] = useState(false);

    const initRemoveUsers = async (projectId: string,userIdToRemoveParam: number) => {
        setProjectId(projectId);
        setUserIdToRemove(userIdToRemoveParam);
        openModal();
    };

    const handleDelete = () => {
        if(userIdToRemove){
            removeUsers(projectId,userIdToRemove)
        }
    }

    const removeUsers = async (projectId: string, userIdToRemove: number) => {
        try {
            const apiRespons = await removeUserFromProject(projectId, userIdToRemove);
                setApiRes(apiRespons);
        } catch (error) {
            console.error('Error removing user from project:', error);
            toast.error('Failed to remove user from project');
        }
    };



    useEffect(() => {

        if (apiRes && apiRes.code == 200) {

            if (id) {
                fetchProjectDetails(id);
                setOpenfiles(false);
            }
            toast.success(apiRes.messages);

        }else {
            
            // toast.error("Erreur lors de la  suppression de l'utilisateur sur le projet. Veuillez réessayer");
        }

    }, [apiRes]);

    // Option pour le modal :
    const [isModalOpenUsers, setIsModalOpen] = useState(false);

    const openModalUsers = () => {

        setIsModalOpen(true);
    };

    const closeModalUsers = () => {
        setIsModalOpen(false);
    };


    const handleAddFiles = (value: number) => {

        if(value==1){
            setOpenfiles(true);
        }else{
            setOpenfiles(false);
        }
        
    };

    return (
        <>

            <Breadcrumb pageName="Detail" />
            {response ? (

                <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-4 pb-4">

                    <section className="bg-white dark:bg-gray-900">

                        <div className="container px-0 py-0 mx-auto">

                            <div className="space-x-0  grid grid-cols-1 gap-1 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-10xl">

                                <div className="p-6 bg-gray-100 border-[#E3E3E3] border rounded-lg dark:bg-gray-800 md:p-8">

                                    <p className="leading-loose text-gray-500 dark:text-gray-300">

                                        <div className="mb-5">
                                            <input disabled value={response.projects?.projectName} className=" text-lg w-full rounded-lg border border-stroke py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="" />
                                        </div>

                                        <div className=" mb-8 w-full rounded border border-stroke  py-10 pl-11.5 pr-4.5 text-black focus-visible:outline-none dark:border-strokedark  dark:text-white dark:focus:border-black" dangerouslySetInnerHTML={{ __html: response.projects?.projectDescription }}></div>

                                        <label className="mb-4.5 block text-lg font-medium text-black dark:text-white">DETAILS</label>
                                        <hr className="border-gray-900 my-6" />

                                        <div className="flex flex-wrap justify-between gap-2">
                                            <div>

                                                <a className="block" href="/invoice">
                                                    Date de creation
                                                </a>

                                            </div>

                                            <div className="" >

                                                <a className="block" href="/invoice">
                                                    Modifier le :
                                                </a>
                                            </div>

                                        </div>

                                        <div className="flex flex-wrap justify-between gap-2 mb-5">


                                            <div>
                                                <span className="mt-1.5 block">
                                                    <span className="font-medium text-black dark:text-white">{new Date(response.projects?.projectCreatedAt).toLocaleDateString()}</span>
                                                </span>
                                            </div>

                                            <div className="" >
                                                <span className="mt-1.5 block">
                                                    <span className="font-medium text-black dark:text-white">{new Date(response.projects?.projectUpdatedAt).toLocaleDateString()}</span>
                                                </span>
                                            </div>

                                        </div>

                                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">Date de Debut</label>
                                                <input value={new Date(response.projects?.projectStartDate).toLocaleDateString()} disabled className=" text-lg w-full rounded-lg border border-stroke py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="" />
                                            </div>
                                            <div className="w-full xl:w-1/2">
                                                <label className="mb-2.5 block text-black dark:text-white">Date de fin </label>
                                                <input value={new Date(response.projects?.projectEndDate).toLocaleDateString()} disabled className=" text-lg w-full rounded-lg border border-stroke py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="" />
                                            </div>
                                        </div>

                                        <div>

                                            <span className="mt-1.5 block mb-3">
                                                <span className="font-medium text-black dark:text-white">ESTIMATIONS ET PROGRESSION</span>
                                            </span>
                                            <hr className="border-gray-900 my-6" />

                                            <div>
                                                <p className="mb-1.5 font-medium text-black dark:text-white">Temps restant :</p>
                                                <h4 className="mb-2 text-xl font-bold text-black dark:text-white">{response.projects?.projectNombreJours} jours</h4>

                                                <p className="mb-1.5 font-medium text-black dark:text-white">Progression:</p>
                                                <div>
                                                    <SkillBar level={response.projects?.progress} color="#038C4C" />{response.projects?.progress} %
                                                </div>

                                            </div>

                                        </div>

                                        {/* Lites des taches :  */}

                                    </p>

                                </div>


                                {/* deuxieme Card sur la droite  */}

                                <div className="p-6 bg-gray-100 border-[#E3E3E3] border rounded-lg dark:bg-gray-800 md:p-8">

                                    <div>
                                        <div className="mb-4  border-gray-200 dark:border-gray-700">
                                            <ul className="flex flex-wrap -mb-px text-lg font-medium text-center" id="default-styled-tab" role="tablist">
                                                <li className="me-2" role="presentation">
                                                    <button className={`text-sm inline-block p-4 ${activeTab === 'styled-steps' ? 'border-b-2 border-[#012340] text-[#012340] hover:text-gray-900 dark:text-gray-900 dark:hover:text-gray-900' : 'hover:text-gray-600 dark:hover:text-gray-300'}`} id="steps-styled-tab" onClick={() => handleTabClick('styled-steps')} type="button" role="tab" aria-controls="steps" aria-selected={activeTab === 'styled-steps' ? 'true' : 'false'}>ETAPES</button>
                                                </li>

                                                <li className="me-2" role="presentation">
                                                    <button className={`text-sm inline-block p-4 ${activeTab === 'styled-profile' ? 'border-b-2 border-[#012340] text-[#012340] hover:text-gray-900 dark:text-gray-900 dark:hover:text-gray-900' : 'hover:text-gray-600 dark:hover:text-gray-300'}`} id="profile-styled-tab" onClick={() => handleTabClick('styled-profile')} type="button" role="tab" aria-controls="profile" aria-selected={activeTab === 'styled-profile' ? 'true' : 'false'}>MEMBRES</button>
                                                </li>
                                                <li className="me-2" role="presentation">
                                                    <button className={`text-sm inline-block p-4 ${activeTab === 'styled-dashboard' ? 'border-b-2 border-[#012340] text-[#012340] hover:text-[#012340] dark:text-gray-900 dark:hover:text-gray-900' : 'hover:text-gray-600 dark:hover:text-gray-300'}`} id="dashboard-styled-tab" onClick={() => handleTabClick('styled-dashboard')} type="button" role="tab" aria-controls="dashboard" aria-selected={activeTab === 'styled-dashboard' ? 'true' : 'false'}>FICHIERS</button>
                                                </li>
                                                <li className="me-2" role="presentation">
                                                    <button className={`text-sm inline-block p-4 ${activeTab === 'styled-settings' ? 'border-b-2 border-[#012340] text-[#012340] hover:text-[#012340] dark:text-gray-900 dark:hover:text-gray-900' : 'hover:text-gray-600 dark:hover:text-gray-300'}`} id="settings-styled-tab" onClick={() => handleTabClick('styled-settings')} type="button" role="tab" aria-controls="settings" aria-selected={activeTab === 'styled-settings' ? 'true' : 'false'}>MESSAGES</button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div id="default-styled-tab-content">

                                            <div className={`p-4 ${activeTab === 'styled-steps' ? 'block' : 'hidden'} rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-steps" role="tabpanel" aria-labelledby="steps-tab">

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    <ProjectStep fetchProjectDetails={fetchProjectDetails} id={id}/>
                                                </p>

                                            </div>

                                            <div className={`p-4 ${activeTab === 'styled-profile' ? 'block' : 'hidden'} rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">

                                                {/* Tableau des utilisateur: */}

                                                <p className="text-sm text-gray-500 dark:text-gray-400">

                                                    <div className="flex justify-end gap-4.5">

                                                        <button  onClick={() => openModalUsers()} className="mb-2 flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" >
                                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 12.5C17.21 12.5 19 10.71 19 8.5C19 6.29 17.21 4.5 15 4.5C12.79 4.5 11 6.29 11 8.5C11 10.71 12.79 12.5 15 12.5ZM6 10.5V7.5H4V10.5H1V12.5H4V15.5H6V12.5H9V10.5H6ZM15 14.5C12.33 14.5 7 15.84 7 18.5V20.5H23V18.5C23 15.84 17.67 14.5 15 14.5Z" fill="white" />
                                                            </svg>
                                                        </button>
                                                    </div>


                                                    <div className="relative overflow-x-auto sm:rounded-sm">
                                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                                            <tbody>

                                                                { response && response.users.length > 0 ? (

                                                                    response.users.map((user, index) => (

                                                                        <tr key={index} className="bg-white border-b border-gray-900  dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                            <th scope="row" className="flex px-0 py-0 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                <div>
                                                                                    <button className="h-10 w-10 border-0 border-white dark:border-boxdark">
                                                                                        <img src={UserOne} alt="User" />
                                                                                    </button>
                                                                                </div>
                                                                                <div className="py-3 ml-2">
                                                                                    {user.leader && (
                                                                                        <span className="px-2 py-1 mr-2 bg-green-500 text-white rounded-md text-xs">Leader</span>
                                                                                    )}
                                                                                    {user.user.firstname} - {user.user.lastname}
                                                                                </div>
                                                                            </th>
                                                                            <td className="px-6 py-4">
                                                                                {user.user.fonction}
                                                                            </td>

                                                                            <td className="px-6 py-4">
                                                                                {user.user.phone}
                                                                            </td>

                                                                            <td className="px-0 py-0 text-right">
                                                                                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                                                                    <input
                                                                                        type='checkbox'
                                                                                        name={`autoSaver-${index}`}
                                                                                        className='sr-only'
                                                                                        checked={selectedLeaderId === user.user.userId}
                                                                                        onChange={() => handleCheckboxChange(user.user.userId)}
                                                                                    />
                                                                                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${selectedLeaderId === user.user.userId ? 'bg-[#012340]' : 'bg-[#CCCCCE]'}`}>
                                                                                        <span className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${selectedLeaderId === user.user.userId ? 'translate-x-6' : ''}`}></span>
                                                                                    </span>
                                                                                </label>
                                                                            </td>

                                                                            <td className="">

                                                                            <div className="inline-flex items-center gap-x-1">
                                                                                    {/* // Vérifie si id est défini avant d'appeler removeUsers */}
                                                                                    <button type='button'   onClick={() => id && initRemoveUsers(id, user.user.userId)}  className="text-red-600 hover:text-red-900">
                                                                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M19.5 6.91L18.09 5.5L12.5 11.09L6.91 5.5L5.5 6.91L11.09 12.5L5.5 18.09L6.91 19.5L12.5 13.91L18.09 19.5L19.5 18.09L13.91 12.5L19.5 6.91Z" fill="black" fillOpacity="0.6" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>

                                                                            </td>

                                                                        </tr>

                                                                    ))

                                                                ) : (

                                                                    <tr>
                                                                        <td colSpan={8} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                                            Aucun utilisateur trouvé
                                                                        </td>
                                                                    </tr>
                                                                )}

                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </p>

                                            </div>

                                            <div className={`p-4 ${activeTab === 'styled-dashboard' ? 'block' : 'hidden'} rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">

                                                <p className="text-sm text-gray-500 dark:text-gray-400">

                                                    <div className=" items-center  p-4  sm:p-6 xl:p-10">
                                                        {response && response.projects.filesData.length > 0 ? (
                                                            response.projects.filesData.map((files, index) => (

                                                            <div className="mb-5 max-w-[557px] rounded-lg bg-[#d6d8d8] border border-stroke py-4 pl-4 pr-3 dark:border-strokedark dark:bg-meta-4 sm:pl-6">
                                                                    <div className="flex justify-between">

                                                                        <div className="flex flex-grow gap-3">
                                                                            <div>
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M13 9V3.5L18.5 9M6 2C4.89 2 4 2.89 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2H6Z" fill="#012340" />
                                                                                </svg>
                                                                            </div>
                                                                            <div>
                                                                                <div className=" text-xsm font-medium text-[#012340] dark:text-white">
                                                                                    {files.title}
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                        <div className='text-center'>
                                                                            <button>
                                                                                <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.854423 0.85186C1.2124 0.493879 1.79281 0.493879 2.15079 0.85186L7.0026 5.70368L11.8544 0.85186C12.2124 0.493879 12.7928 0.493879 13.1508 0.85186C13.5088 1.20984 13.5088 1.79024 13.1508 2.14822L8.29897 7.00004L13.1508 11.8519C13.5088 12.2098 13.5088 12.7902 13.1508 13.1482C12.7928 13.5062 12.2124 13.5062 11.8544 13.1482L7.0026 8.2964L2.15079 13.1482C1.79281 13.5062 1.2124 13.5062 0.854423 13.1482C0.496442 12.7902 0.496442 12.2098 0.854423 11.8519L5.70624 7.00004L0.854423 2.14822C0.496442 1.79024 0.496442 1.20984 0.854423 0.85186Z" fill=""></path>
                                                                                </svg>
                                                                            </button>
                                                                            <br />
                                                                            <span className='text-box'>
                                                                                {octetsEnMB(files.size)}
                                                                            </span>
                                                                        </div>

                                                                    </div>
                                                            </div>

                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <div className="mb-5 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap items-center">
                                                                    Aucun fichier trouvé
                                                                </div>
                                                            </tr>
                                                        )}



                                                        {openfiles ? (

                                                            <div className=''>
                                                                <AddFilesCard id={id} fetchProjectDetails={fetchProjectDetails}/>
                                                                <button onClick={() => handleAddFiles(0)} className="font-medium text-[#03233F] flex items-center">
                                                                    <span className="font-bold">ANNULER L'OPÉRATION</span>
                                                                </button>
                                                            </div>

                                                        ) : (
                                                        <button  onClick={() => handleAddFiles(1)} className="font-medium text-[#03233F] flex items-center">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                                                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#012340" />
                                                            </svg>
                                                            <span className="font-bold">AJOUTER D'AUTRES FICHIERS</span>
                                                        </button>
                                                        )}
                                                    </div>

                                                    

                                                </p>

                                            </div>

                                            <div className={`p-4 ${activeTab === 'styled-settings' ? 'block' : 'hidden'} rounded-lg bg-gray-50 dark:bg-gray-800`} id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">

                                                <p className="text-sm text-gray-500 dark:text-gray-400">


                                                </p>

                                            </div>

                                        </div>
                                        
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            ) : (
                <p>Loading...</p>
            )}

            <TaskCard
                tasksEnCours={tasksEnCours}
                    tasksEnAttente={tasksEnAttente}
                    tasksTermines={tasksTermines}
                    fetchProjectDetails={fetchProjectDetails}
                id={id}/>

            <SupUsersActionModal
                buttonColor="#D32F2F"
                actionMessage=" Êtes-vous sûr de vouloir supprimer ce utilisateur ?"
                onDeleteMessage="OUI, SUPPRIMER"
                onCloseMessage="ANNULER"
                id={projectId}
                onDelete={() => { handleDelete();}}
                isOpen={isModalOpens}
                onClose={closeModal}
            />

            <AddModalLeaders
                codes={id}
                buttonColor="#D32F2F"
                actionMessage="AJOUTER UN MEMBRE À L'ÉQUIPE" // Message de confirmation
                onDeleteMessage="VALIDER" // Texte du bouton de suppression
                onCloseMessage="ANNULER" // Texte du bouton d'annulation
                id="static-modal" // ID du modal (peut être utilisé pour les tests d'automatisation ou de styles CSS spécifiques)
                fetchProjectDetails={fetchProjectDetails} // Fonction appelée lors de la suppression
                isOpen={isModalOpenUsers} // État d'ouverture du modal
                onClose={closeModalUsers} // Fonction de fermeture du modal
            />



        </>
    );
};

export default ProjectDetail;
