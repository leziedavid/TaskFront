import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddTaskUserModal from '../../components/Modal/AddTaskUserModal';
import UserOne from '../../images/user/user-01.png';
// services
import DateConverter from '../../components/DateConverter';
import AddActionModal from '../../components/Modal/AddActionModal';
import AddObsModal from '../../components/Modal/AddObsModal';
import DeleteActionModal from '../../components/Modal/DeleteActionModal';
import ToggleSwitch from '../../components/ToggleSwitch';
import { BaseResponse } from '../../interfaces/ApiResponse';
import { TaskDetailsDTO } from '../../interfaces/ModelsTask';
import { removeAction, updateActionStatus } from '../../services/TaskActionServices';
import { fetchTaskDetails } from '../../services/TaskService';
import { removeObs } from '../../services/TaskObsServices';


interface ApiResulte {
    code: number;
    data: string;
    message: string;
}

const TaskActions: React.FC = () => {

    const [response, setResponse] = useState<TaskDetailsDTO | null>(null);
    const [apiRes, setApiRes] = useState<BaseResponse<ApiResulte> | null>(null);

    const { id } = useParams<{ id: string }>();
    const [idProject, setIdProject] = useState(Number);
    const [startDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [isdisabled, setIsdisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [taskId, setTaskId] = useState(Number);
    const [actionId, setActionId] = useState(Number);
    const [obsId, setObsId] = useState(Number);
    
    const [actionMessage, setActionMessage] = useState('');
    const [onDeleteMessage, setOnDeleteMessage] = useState('');

    const [isModalOpens, setIsModalOpens] = useState(false);
    const [isopenActionSup, setIspenActionSup] = useState(false);

    const [isModalOpenActions, setIsModalOpenActions] = useState(false);

    const closeModalActions = () => {
        setIsModalOpenActions(false);
        setActionId(0);
    };

    
    const openActionSup = (idActions: number,) => {
        setIspenActionSup(true);
        setActionId(idActions);
        setActionMessage('Êtes-vous sûr de vouloir supprimer cette action ?');
        setOnDeleteMessage('OUI, SUPPRIMER');
    };

    const openActionEdit = (idActions: number, idTask: number, projectId: number, StartDate: string, EndDate: string) => {
        setIsdisabled(false);
        setIsShow(false);
        setActionId(idActions);
        setTaskId(idTask);
        setStartDate(StartDate);
        setEndDate(EndDate);
        setIdProject(projectId);
        setIsModalOpenActions(true);
        setActionMessage("MODIFICATION DE L'ACTION SUR CETTE TACHE");
        setOnDeleteMessage('MODIFIER');
    };

    const openActionShow = (idActions: number, idTask: number, projectId: number, StartDate: string, EndDate: string) => {
        setIsdisabled(true);
        setIsShow(true);
        setActionId(idActions);
        setTaskId(idTask);
        setStartDate(StartDate);
        setEndDate(EndDate);
        setIdProject(projectId);
        setIsModalOpenActions(true);
        setActionMessage("DETAIL");
        setOnDeleteMessage('');
    };

    const handleDeleteAction = async () => {

        try {
            const res = await removeAction(actionId!);
            if (res.code === 200) {
                toast.success(res.messages);
                setIspenActionSup(false);
                fetchTaskDetail(id!);
            } else {
                toast.success("erueur verifier votre connexion");
            }
        } catch (error) {
            toast.error('Failed to remove action');
        }
    }


    const openModalActions = (idTask: number, projectId: number, StartDate: string, EndDate: string) => {
        setIsdisabled(false);
        setIsShow(false);
        setTaskId(idTask);
        setStartDate(StartDate);
        setEndDate(EndDate);
        setIdProject(projectId);
        setIsModalOpenActions(true);
        setActionMessage('AJOUTER UNE ACTION SUR CETTE TACHE');
        setOnDeleteMessage('VALIDER');
        setActionId(0);

    };

    const closeModal = () => {
        setIsModalOpens(false);
        setIsModalOpenActions(false);
        setIspenActionSup(false);
        setIsdisabled(false);
        setIsShow(false);
    };

    const fetchTaskDetail = async (code: string) => {
        try {
            const apiResponse = await fetchTaskDetails(code);
            setResponse(apiResponse.data);

        } catch (error) {
            console.error('Error fetching project details:', error);
            toast.error('Failed to fetch project details');
        }
    };

    useEffect(() => {
        fetchTaskDetail(id!);
    }, [id]);

    useEffect(() => {

        if (apiRes && apiRes.code == 200) {
            fetchTaskDetail(id!);
            toast.success(apiRes.messages);
        } else {

        }

    }, [apiRes]);

    const handleCheckboxChange = async (actionId: number, currentValue: number) => {
        const newValue = currentValue === 0 ? 1 : 0;
        const res = await updateActionStatus(actionId, newValue);
        if (res.code === 200) {
            toast.success(res.messages);
        }

        setResponse(prev => prev ? {
            ...prev, actions: prev.actions.map(action => action.actionId === actionId ? { ...action, isValides: newValue } : action)
        } : null);
    };


    const handleDelete = () => {

        if (actionId > 0) {
            handleDeleteAction();
            setObsId(0);
        }
    };


    return (
        <>

            <ToastContainer position="top-right" autoClose={5000} />
            <Breadcrumb pageTilte="Tâche" pageElement="Lites" pageName="Actions" />

            {response ? (

                <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-4 pb-4">

                    <section className="bg-white dark:bg-gray-900">

                        <div className="container px- py-10 mx-auto">

                            <p className="text-sm text-gray-500 dark:text-gray-400">

                                <div className="flex justify-end gap-4.5">

                                    <button onClick={() => openModalActions(response.tasks[0]?.taskId, response.tasks[0]?.projectId, response.tasks[0]?.taskStartDate, response.tasks[0]?.taskEndDate)} className="mb-2 flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" >
                                        + ACTION
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                                        <thead className="w-full rounded-lg bg-[#ffffff] text-base font-semibold text-white">
                                            <tr>
                                                <th className="whitespace-nowrap py-3 px-3 text-sm font-bold  text-[#212B36]">ID</th>
                                                <th className="whitespace-nowrap py-3 px-3 text-sm font-bold  text-[#212B36]">Heures</th>
                                                <th className="whitespace-nowrap py-3 px-3 text-sm font-bold  text-[#212B36]">Libelle</th>
                                                <th className="whitespace-nowrap py-3 px-3 text-sm font-bold  text-[#212B36]">Status</th>
                                                <th className="whitespace-nowrap py-3 text-sm font-bold  text-[#212B36] ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response && response.actions.length > 0 ? (
                                                response.actions.map((action, index) => (

                                                    <tr key={index} className="cursor-pointer bg-white drop-shadow-sm hover:shadow-lg">
                                                        <td className="whitespace-nowrap py-3 text-[#000000] px-3 text-[15px] font-normal text-gray-600 ">{index+1} </td>
                                                        <td className="whitespace-nowrap py-3 text-[#000000] px-3 text-[15px] font-normal text-gray-600 ">{action.hours} h</td>

                                                        <td className="whitespace-nowrap px-3 text-[#000000] py-3 text-[15px] font-normal text-gray-600 "> {action.libelle}</td>

                                                        <td className="whitespace-nowrap px-3 text-[#000000] py-3 text-[15px] font-normal text-gray-600">
                                                            <ToggleSwitch isChecked={action.isValides === 1} onChange={() => handleCheckboxChange(action.actionId, action.isValides)} />
                                                        </td>

                                                        <td className="whitespace-nowrap px-3 text-[#000000] py-3 flex space-x-2 text-gray-600">

                                                            <button onClick={() => openActionEdit(action.actionId, response.tasks[0]?.taskId, response.tasks[0]?.projectId, response.tasks[0]?.taskStartDate, response.tasks[0]?.taskEndDate)} className="focus:outline-none" aria-label="Icon 1" >
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.49878 17.7505V21.5005H7.24878L18.3088 10.4405L14.5588 6.69055L3.49878 17.7505ZM21.2088 7.54055C21.5988 7.15055 21.5988 6.52055 21.2088 6.13055L18.8688 3.79055C18.4788 3.40055 17.8488 3.40055 17.4588 3.79055L15.6288 5.62055L19.3788 9.37055L21.2088 7.54055Z" fill="#003D63" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => openActionSup(action.actionId)} className="focus:outline-none" aria-label="Icon 2" >
                                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.5 16.5C1.5 17.6 2.4 18.5 3.5 18.5H11.5C12.6 18.5 13.5 17.6 13.5 16.5V4.5H1.5V16.5ZM14.5 1.5H11L10 0.5H5L4 1.5H0.5V3.5H14.5V1.5Z" fill="#C62828" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => openActionShow(action.actionId, response.tasks[0]?.taskId, response.tasks[0]?.projectId, response.tasks[0]?.taskStartDate, response.tasks[0]?.taskEndDate)} className="focus:outline-none" aria-label="Icon 3">
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.5 9.5C11.7044 9.5 10.9413 9.81607 10.3787 10.3787C9.81607 10.9413 9.5 11.7044 9.5 12.5C9.5 13.2956 9.81607 14.0587 10.3787 14.6213C10.9413 15.1839 11.7044 15.5 12.5 15.5C13.2956 15.5 14.0587 15.1839 14.6213 14.6213C15.1839 14.0587 15.5 13.2956 15.5 12.5C15.5 11.7044 15.1839 10.9413 14.6213 10.3787C14.0587 9.81607 13.2956 9.5 12.5 9.5ZM12.5 17.5C11.1739 17.5 9.90215 16.9732 8.96447 16.0355C8.02678 15.0979 7.5 13.8261 7.5 12.5C7.5 11.1739 8.02678 9.90215 8.96447 8.96447C9.90215 8.02678 11.1739 7.5 12.5 7.5C13.8261 7.5 15.0979 8.02678 16.0355 8.96447C16.9732 9.90215 17.5 11.1739 17.5 12.5C17.5 13.8261 16.9732 15.0979 16.0355 16.0355C15.0979 16.9732 13.8261 17.5 12.5 17.5ZM12.5 5C7.5 5 3.23 8.11 1.5 12.5C3.23 16.89 7.5 20 12.5 20C17.5 20 21.77 16.89 23.5 12.5C21.77 8.11 17.5 5 12.5 5Z" fill="black" />
                                                                </svg>
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))

                                            ) : (

                                                <tr className="cursor-pointer bg-white drop-shadow-sm hover:shadow-lg">
                                                    <td className="whitespace-nowrap px-3 py-3 flex items-center justify-center space-x-2 text-gray-600">
                                                        Aucune action trouvé
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>


                                <div className="flex items-center justify-end mt-6">

                                    <div className="items-center hidden lg:flex gap-x-3">
                                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                                    </div>

                                </div>

                                </p>

                        </div>

                    </section>

                </div>

            ) : (

                <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-4 pb-4">

                    <section className="bg-white dark:bg-gray-900">
                        <p>
                            <div aria-label="Chargement..." role="status" className="flex items-center space-x-2">
                                <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                    </line>
                                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                    </line>
                                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="24"></line>
                                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                    </line>
                                </svg>
                                <span className="text-4xl font-medium text-gray-500">Chargement...</span>
                            </div>
                        </p>
                    </section>

                </div>
            )}

            <DeleteActionModal
                buttonColor="#D32F2F"
                actionMessage={actionMessage}
                onDeleteMessage={onDeleteMessage}
                onCloseMessage="ANNULER"
                id={actionId}
                onDelete={handleDelete}
                // onDelete={() => { handleDeleteAction(); }}
                isOpen={isopenActionSup}
                onClose={closeModal}
            />

            <AddActionModal
                codes={id}
                id={idProject}
                taskId={taskId}
                EndDate={EndDate}
                startDate={startDate}
                actionId={actionId}
                isdisabled={isdisabled}
                isShow={isShow}
                buttonColor="#D32F2F"
                actionMessage={actionMessage} // Message de confirmation
                onDeleteMessage={onDeleteMessage} // Texte du bouton de suppression
                onCloseMessage="ANNULER" // Texte du bouton d'annulation
                idModale="static-modal" // ID du modal (peut être utilisé pour les tests d'automatisation ou de styles CSS spécifiques)
                fetchTaskDetails={fetchTaskDetail} // Fonction appelée lors de la suppression
                isOpen={isModalOpenActions} // État d'ouverture du modal
                onClose={closeModalActions} // Fonction de fermeture du modal
            />



        </>
    );
};

export default TaskActions;
