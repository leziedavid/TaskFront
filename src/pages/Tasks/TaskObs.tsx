import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// services
import DateConverter from '../../components/DateConverter';
import AddObsModal from '../../components/Modal/AddObsModal';
import DeleteActionModal from '../../components/Modal/DeleteActionModal';
import { BaseResponse } from '../../interfaces/ApiResponse';
import { TaskDetailsDTO } from '../../interfaces/ModelsTask';
import { fetchTaskDetails } from '../../services/TaskService';
import { removeObs } from '../../services/TaskObsServices';


interface ApiResulte {
    code: number;
    data: string;
    message: string;
}

const TaskObs: React.FC = () => {

    const [response, setResponse] = useState<TaskDetailsDTO | null>(null);
    const [apiRes, setApiRes] = useState<BaseResponse<ApiResulte> | null>(null);

    const { id } = useParams<{ id: string }>();
    const [idProject, setIdProject] = useState(Number);
    const [isdisabled, setIsdisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [taskId, setTaskId] = useState(Number);
    const [actionId, setActionId] = useState(Number);
    const [obsId, setObsId] = useState(Number);
    
    const [actionMessage, setActionMessage] = useState('');
    const [onDeleteMessage, setOnDeleteMessage] = useState('');

    const [isopenActionSup, setIspenActionSup] = useState(false);

    const [supObs, setObsDelete] = useState(false);

    const [isModalOpenObs, setIsModalOpenObs] = useState(false);
    

    const closeModalObs = () => {
        setIsModalOpenObs(false);
        setObsId(0);
    };


    const openObsSup = (idObs: number,) => {
        setIspenActionSup(true);
        setObsId(idObs);
        setObsDelete(true);
        setActionMessage('Êtes-vous sûr de vouloir supprimer cette observation ?');
        setOnDeleteMessage('OUI, SUPPRIMER');
    };
    

    const openModalObsShow = (obsIds: number, idTask: number, projectId: number) => {
        setIsShow(true);
        setObsId(obsIds);
        setTaskId(idTask);
        setIdProject(projectId);
        setIsModalOpenObs(true);
        setIsdisabled(true);
        setActionMessage("DETAIL");
        setOnDeleteMessage('');
    };
    const handleDeleteObs = async () => {

        try {
            const res = await removeObs(obsId!);
            if (res.code === 200) {
                toast.success(res.messages);
                setIspenActionSup(false);
                fetchTaskDetail(id!);
            } else {
                toast.success("erueur verifier votre connexion");
            }
        } catch (error) {
            toast.error('Failed to remove observation');
        }
    }

    const openModalObs = (idTask: number, projectId: number) => {
        setTaskId(idTask);
        setIdProject(projectId);
        setIsModalOpenObs(true);
        setActionMessage("AJOUTER UNE OBSERVATION SUR CETTE TACHE");
        setOnDeleteMessage('VALIDER');
    };
    const openModalObsEdit = (obsIds: number, idTask: number, projectId: number) => {
        setIsdisabled(false);
        setIsShow(false);
        setObsId(obsIds);
        setTaskId(idTask);
        setIdProject(projectId);
        setIsModalOpenObs(true);
        setActionMessage("MODIFICATION UNE OBSERVATION SUR CETTE TACHE");
        setOnDeleteMessage('MODIFIER');
    };

    const closeModal = () => {
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


    // Fonction octetsEnMB ajustée
    const octetsEnMB = (tailleEnOctets: number): string => {
        const tailleEnMo = tailleEnOctets / (1024 * 1024);
        const tailleEnMoFormatee = tailleEnMo.toFixed(2);
        return `${tailleEnMoFormatee} MB`;
    };

    useEffect(() => {

        if (apiRes && apiRes.code == 200) {
            fetchTaskDetail(id!);
            toast.success(apiRes.messages);
        } else {

        }

    }, [apiRes]);


    // Fonction de troncature
    const truncateDescription = (description: string, maxLength: number = 20): string => {

        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };

    const handleDelete = () => {
        if(obsId > 0) {
            handleDeleteObs();
            setActionId(0);
        }
    };


    return (
        <>

            <ToastContainer position="top-right" autoClose={5000} />
            <Breadcrumb pageTilte="Tâche" pageElement="Lites" pageName="Observations" />

            {response ? (

                <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-4 pb-4">

                    <section className="bg-white dark:bg-gray-900">

                        <div className="container px- py-10 mx-auto">

                            <p className="text-sm text-gray-500 dark:text-gray-400">

                                <div className="flex justify-end gap-4.5">
                                    <button onClick={() => openModalObs(response.tasks[0]?.taskId, response.tasks[0]?.projectId)} className="mb-2 flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" >
                                        +  AJOUTER UNE  OBSERVATION
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
                                        <thead className="w-full rounded-lg bg-[#ffffff] text-base font-semibold text-white">
                                            <tr>
                                                <th className="whitespace-nowrap py-3 px-3 text-[15px] font-bold text-[#212B36]">ID</th>
                                                <th className="whitespace-nowrap py-3 px-3 text-[15px] font-bold text-[#212B36]">Libelle</th>
                                                <th className="whitespace-nowrap py-3 px-3 text-[15px] font-bold text-[#212B36]">Description</th>
                                                <th className="whitespace-nowrap py-3 text-[15px] font-bold text-[#212B36]">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response && response.observations.length > 0 ? (
                                                response.observations.map((obs, index) => (

                                                    <tr className="cursor-pointer bg-white drop-shadow-sm hover:shadow-lg">
                                                        <td className="whitespace-nowrap py-3 text-[#000000] px-3 text-[15px] font-normal text-gray-600">{index+1}</td>
                                                        <td className="whitespace-nowrap py-3 text-[#000000] px-3 text-[15px] font-normal text-gray-600">{obs.libelle}</td>
                                                        <td className="whitespace-nowrap px-3 text-[#000000] py-3 text-[15px] font-normal text-gray-600">
                                                            <div className="flex items-center">
                                                                <span className="mr-2">
                                                                    <DateConverter dateStr={obs.observationCreatedAt} /> -
                                                                </span>
                                                                <div dangerouslySetInnerHTML={{ __html: truncateDescription(obs.description) }} />
                                                            </div>
                                                        </td>

                                                        <td className="whitespace-nowrap px-3 text-[#000000] py-3 flex items-center justify-center space-x-2 text-gray-600">
                                                            <button onClick={() => openModalObsEdit(obs.observationId, response.tasks[0]?.taskId, response.tasks[0]?.projectId)} className="focus:outline-none" aria-label="Icon 1">
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.49878 17.7505V21.5005H7.24878L18.3088 10.4405L14.5588 6.69055L3.49878 17.7505ZM21.2088 7.54055C21.5988 7.15055 21.5988 6.52055 21.2088 6.13055L18.8688 3.79055C18.4788 3.40055 17.8488 3.40055 17.4588 3.79055L15.6288 5.62055L19.3788 9.37055L21.2088 7.54055Z" fill="#003D63" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => openObsSup(obs.observationId)} className="focus:outline-none" aria-label="Icon 2">
                                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.5 16.5C1.5 17.6 2.4 18.5 3.5 18.5H11.5C12.6 18.5 13.5 17.6 13.5 16.5V4.5H1.5V16.5ZM14.5 1.5H11L10 0.5H5L4 1.5H0.5V3.5H14.5V1.5Z" fill="#C62828" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => openModalObsShow(obs.observationId, response.tasks[0]?.taskId, response.tasks[0]?.projectId)} className="focus:outline-none" aria-label="Icon 3" >
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
                                                        Aucune observation trouvé
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
                isOpen={isopenActionSup}
                onClose={closeModal}
            />


            <AddObsModal
                codes={id}
                id={idProject}
                taskId={taskId}
                obsId={obsId}
                isdisabled={isdisabled}
                isShow={isShow}
                buttonColor="#D32F2F"
                actionMessage={actionMessage}
                // actionMessage="AJOUTER UNE OBSERVATION SUR TACHES" // Message de confirmation
                onDeleteMessage={onDeleteMessage}// Texte du bouton de suppression
                onCloseMessage="ANNULER" // Texte du bouton d'annulation
                idModale="static-modal" // ID du modal (peut être utilisé pour les tests d'automatisation ou de styles CSS spécifiques)
                fetchTaskDetails={fetchTaskDetail} // Fonction appelée lors de la suppression
                isOpen={isModalOpenObs} // État d'ouverture du modal
                onClose={closeModalObs} // Fonction de fermeture du modal
            />


        </>
    );
};

export default TaskObs;
