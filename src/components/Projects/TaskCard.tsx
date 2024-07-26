import React, { useState } from 'react';
// Assurez-vous d'importer correctement l'interface Projects
import ActionModal from '../Modal/ActionModal';
import ValidateModal from '../Modal/ValidateModal';

import DateConverter from '../DateConverter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserOne from '../../images/user/user-01.png';
import { Link } from 'react-router-dom';

import SelectAllUsers from '../../components/Forms/SelectGroup/SelectAllUsers';
import SelectPriorite from '../../components/Forms/SelectGroup/SelectPriorite';

// services
import {changeTaskState,deleteTask} from '../../services/TaskService';
import {Task } from '../../interfaces/Global';

interface TaskCardProps {
    tasksEnCours : Task[];
    tasksEnAttente: Task[];
    tasksTermines: Task[];
    fetchProjectDetails: (code: string) => Promise<void>;
    id: string | undefined; //
}

const TaskCard: React.FC<TaskCardProps> = ({ tasksEnCours,tasksEnAttente,tasksTermines,fetchProjectDetails,id}) => {


    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [Priority, setPriority] = useState("");
    const [placeholder1, setPlaceholder1] = useState("Selectionner");
    const [state, setState] = useState("");
    const [Users, setUsers] = useState('');

    const [isOpenFiltre, setIsOpenFiltre] = useState(false);
    const toggleDropdownFiltre = () => { setIsOpenFiltre(!isOpenFiltre);};
    const [prioColor, SetPrioColor] = useState("");

    const [openState, setOpenState] = useState<number | null>(null);
    const [StateSelecte, setStateSelecte] = useState<string>('');
    const states = ['EN COURS', 'EN ATTENTE', 'TERMINER'];
    const [selectedColors, setSelectedColors] = useState<string>('');


// Option pour le modal :
const [isModalOpen, setIsModalOpen] = useState(false);
const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

const [idtaches, setId] = useState<number | null>(null);
const [taskIdToDelete, setProjectIdToDelete] = useState<number | null>(null);
const [actionMessage, setActionMessage] = useState<string>('');
const [position, setPosition] = useState<number | null>(null);

    // Gestion des Status et des priorité sur la page de detail
    // Premier menu
    const [openTaskId, setTaskId] = useState<number | null>(null);

    const toggleDropdown = (taskId: number) => {

        setTaskId(openTaskId === taskId ? null : taskId);
        setopenActionTaskId(0);
        setOpenPropriete(0);
        
    };

    const formatProjectState = (state: string): string => {
        return state.replace('_', ' ');
    };

    // deuxieme menu
    const [openActionTaskId, setopenActionTaskId] = useState<number | null>(null);
    const toggleDropdownActions = (taskId: number) => {
        setopenActionTaskId(openActionTaskId === taskId ? null : taskId);
        setTaskId(0);
        setOpenPropriete(0);
        
    };

    // Troisieme menu
    const [openPropriete, setOpenPropriete] = useState<number | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<string>('MOYENNE');

    const priorities = ['MOYENNE', 'FAIBLE', 'ELEVEE'];
    const toggleDropdownPropriete = (taskId: number) => {
        setOpenPropriete(openPropriete === taskId ? null : taskId);
        setTaskId(0);
        setopenActionTaskId(0);
    };



    const toggleDropdownState = (projectId: number) => {
        setOpenState(openState === projectId ? null : projectId);
    };



    const openModal = (id: number) => {
        setId(id);
        setActionMessage("Voulez-vous vraiment supprimer cette tâche  ?");
        setIsModalOpen(true);
    };

    const openValidateModal = (id: number, steps:number,status:string,colors:string) => {
        
        setStateSelecte(status);
        setSelectedColors(colors);
        setId(id);
        setPosition(steps);
        setActionMessage("Voulez-vous vraiment démarrer cette tâche  ?");
        setIsValidateModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsValidateModalOpen(false);
    };

    const handleDeleteTask = async (Taskid:number | null) => {
        try {
            if(Taskid){

                const apiResponse = await deleteTask(Taskid);
                if (apiResponse && apiResponse.code === 200) {
                    if(id){
                        toast.success("Tâche supprimée avec succès !");
                        fetchProjectDetails(id);
                    }
                } else {
                    toast.error("Erreur lors de la suppression de la tâche. Veuillez réessayer");
                }
            }
        } catch (error) {
            
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
        closeModal();
    };

    const initRemoveUsers = async (TaskId: number| null, actions: number | null) => {

        if(actions==1){

        }else if(actions==2){

        // if (selectedStates == "EN_COURS") {
            
        //     setSelectedColors('#038C4C');
        // } else if (selectedStates == "EN_ATTENTE") {

        //     setSelectedColors('#F27F1B');
        // } else if (selectedStates == "TERMINER") {
            
        //     setSelectedColors('#012340');
        // }
        // alert(selectedColors);
        // console.log(selectedColors);
        
        try {

            if (TaskId){

                const apiResponse = await changeTaskState(TaskId,StateSelecte,selectedColors);

                if (apiResponse && apiResponse.code === 200) {
                    if(id){
                        toast.success("Le statut et la couleur de la tâche ont été mis à jour avec succès !");
                        fetchProjectDetails(id);
                    }

                } else {
                    
                    toast.error("Erreur lors de la mise à jour de du status. Veuillez réessayer");
                }
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour du status:', error);
            toast.error("Erreur lors de la mise à jour du status. Veuillez vérifier votre connexion.");
        }
        }else if(actions==3){

        }
    
    };

    return (

        <>

            <section className="bg-white dark:bg-gray-900">


                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-4">


                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-1">

                                <div className="mb-3 flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-1 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
                                    
                                    <div>
                                        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">Les tâches</h3>
                                    </div>

                                    <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">

                                    <div className="flex space-x-2">
                                            <button className="flex flex-row space-x-2 py-4 px-1 border-stroke bg-white rounded-xl text-title-lg text-black dark:text-white">
                                                <svg className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="black"></path>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="black"></path>
                                                </svg>
                                            </button>

                                            <button onClick={toggleDropdownFiltre} className={`flex flex-row space-x-2 py-3 px-3 border-stroke bg-white rounded-xl text-title-lg text-black dark:text-white ${isOpenFiltre ? 'mb-2' : 'mb-0'}`}>
                                                <svg className='mt-2' width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="black" fillOpacity="0.6" />
                                                </svg>
                                                <span className="text-base font-medium">FILTRE</span>
                                            </button>
                                    </div>

                                    </div>

                                </div>

                                <div className="flex justify-end gap-4.5">
                                        <Link to={`/auth/task/add/${id}`} className="flex items-center justify-center rounded-lg border bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
                                            </svg>
                                            <span>TACHE</span>
                                        </Link>
                                </div>
                        </div>

                                {isOpenFiltre && (
                                <div className="mb-8 swim-lane flex flex-col gap-5.5">
                                <div draggable="false" className=" relative  justify-between rounded-lg border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">

                                    <div>
                                    <div className="mb-5 flex flex-col gap-6 xl:flex-row">


                                        <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white">Priorité</label>
                                        <SelectPriorite placeholder1={placeholder1} setPriority={setPriority} SetPrioColor={SetPrioColor} />
                                        </div>

                                        <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white">Membre {Users} </label>
                                        <SelectAllUsers setUsers={setUsers} />
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
                                    </div>


                                    <div className="flex justify-end gap-4.5">
                                    <button onClick={toggleDropdownFiltre}  className="flex justify-center rounded-lg border border-[#012340] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button" >ANNULER</button>
                                    <button className="flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" >
                                        FILTRER
                                    </button>
                                    </div>

                                </div>

                                </div>
                        )}
                    
                        <div className="space-x-0 lg:grid lg:grid-cols-3 gap-3 xl:gap-4 lg:space-y-0">

                            {/* Premier Card */}

                            <div>
                                <div className="flex flex-col p-2 mx-auto max-w-lg h-[40rem]  text-gray-900 bg-[#EBF1FA] rounded-lg  border-gray-100 shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">

                                    <div className="mb-5 flex justify-between">

                                        <div className="flex items-center">
                                            <h3 className="text-lg text-black font-bold">En cours</h3>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white ml-2">
                                                <span className="text-sm font-medium text-black">2</span>
                                            </div>
                                        </div>

                                        <div>

                                            <Link to={`/auth/task/add/${id}`} >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.75 10.25H10.25V17.75H7.75V10.25H0.25V7.75H7.75V0.25H10.25V7.75H17.75V10.25Z" fill="#012340" />
                                                </svg>
                                            </Link>

                                        </div>
                                    </div>

                                    {tasksEnCours.length > 0 ? (
                                        <div className='flex flex-col'>

                                            {tasksEnCours.map((task, index) => (

                                                <div key={task.taskId} className='mb-3 p-3 bg-white rounded-md space-y-4'>

                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <h3 className="text-sm font-semibold">{task.taskName}</h3>
                                                        </div>

                                                        <div>

                                                            <div className="relative inline-block text-left">

                                                                <button
                                                                    onClick={() => toggleDropdown(task.taskId)}
                                                                    type="button"
                                                                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900  rounded-lg"
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openTaskId === task.taskId ? 'true' : 'false'}
                                                                    style={{ position: 'relative' }}
                                                                >

                                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.5 10C5.4 10 4.5 10.9 4.5 12C4.5 13.1 5.4 14 6.5 14C7.6 14 8.5 13.1 8.5 12C8.5 10.9 7.6 10 6.5 10ZM18.5 10C17.4 10 16.5 10.9 16.5 12C16.5 13.1 17.4 14 18.5 14C19.6 14 20.5 13.1 20.5 12C20.5 10.9 19.6 10 18.5 10ZM12.5 10C11.4 10 10.5 10.9 10.5 12C10.5 13.1 11.4 14 12.5 14C13.6 14 14.5 13.1 14.5 12C14.5 10.9 13.6 10 12.5 10Z" fill="black" fill-opacity="0.56" />
                                                                    </svg>

                                                                </button>

                                                                {openTaskId === task.taskId && (
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full top-0'} mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M12.6666 13.3336H3.33329C3.15648 13.3336 2.98691 13.4038 2.86188 13.5288C2.73686 13.6538 2.66662 13.8234 2.66662 14.0002C2.66662 14.177 2.73686 14.3466 2.86188 14.4716C2.98691 14.5967 3.15648 14.6669 3.33329 14.6669H12.6666C12.8434 14.6669 13.013 14.5967 13.138 14.4716C13.263 14.3466 13.3333 14.177 13.3333 14.0002C13.3333 13.8234 13.263 13.6538 13.138 13.5288C13.013 13.4038 12.8434 13.3336 12.6666 13.3336ZM3.33329 12.0002H3.39329L6.17329 11.7469C6.47782 11.7166 6.76264 11.5824 6.97995 11.3669L12.98 5.3669C13.2128 5.12088 13.3387 4.79257 13.3299 4.45392C13.3212 4.11527 13.1786 3.7939 12.9333 3.56023L11.1066 1.73356C10.8682 1.50963 10.5558 1.38114 10.2288 1.37253C9.90187 1.36393 9.58314 1.47581 9.33329 1.6869L3.33329 7.6869C3.1178 7.90421 2.98362 8.18903 2.95329 8.49356L2.66662 11.2736C2.65764 11.3712 2.67031 11.4696 2.70373 11.5618C2.73715 11.654 2.79049 11.7377 2.85995 11.8069C2.92225 11.8687 2.99612 11.9176 3.07735 11.9507C3.15857 11.9839 3.24555 12.0007 3.33329 12.0002ZM10.18 2.6669L12 4.4869L10.6666 5.7869L8.87995 4.00023L10.18 2.6669Z" fill="#033F73" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Modifier </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3627 7.3635C14.5654 7.6475 14.6667 7.79016 14.6667 8.00016C14.6667 8.21083 14.5654 8.35283 14.3627 8.63683C13.452 9.91416 11.126 12.6668 8.00004 12.6668C4.87337 12.6668 2.54804 9.9135 1.63737 8.63683C1.43471 8.35283 1.33337 8.21016 1.33337 8.00016C1.33337 7.7895 1.43471 7.6475 1.63737 7.3635C2.54804 6.08616 4.87404 3.3335 8.00004 3.3335C11.1267 3.3335 13.452 6.08683 14.3627 7.3635Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Voir les tâches </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg className="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3626 7.36301C14.5653 7.64701 14.6666 7.78967 14.6666 7.99967C14.6666 8.21034 14.5653 8.35234 14.3626 8.63634C13.4519 9.91367 11.1259 12.6663 7.99992 12.6663C4.87325 12.6663 2.54792 9.91301 1.63725 8.63634C1.43459 8.35234 1.33325 8.20967 1.33325 7.99967C1.33325 7.78901 1.43459 7.64701 1.63725 7.36301C2.54792 6.08567 4.87392 3.33301 7.99992 3.33301C11.1266 3.33301 13.4519 6.08634 14.3626 7.36301Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Detail</span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.25006 10C6.97939 10 6.76672 9.78 6.76672 9.5V2.5C6.76672 2.22 6.97939 2 7.25006 2C7.52072 2 7.73339 2.22 7.73339 2.5V9.5C7.73339 9.78 7.52072 10 7.25006 10Z" fill="#038C4C" />
                                                                                            <path d="M7.25001 15.0002C3.78934 15.0002 0.966675 12.1802 0.966675 8.72015C0.966675 6.31015 2.37801 4.08015 4.56267 3.04015C4.80434 2.93015 5.09434 3.04015 5.20068 3.29015C5.30701 3.54015 5.20068 3.84015 4.95901 3.95015C3.11267 4.82015 1.92367 6.69015 1.92367 8.72015C1.92367 11.6302 4.31134 14.0002 7.24034 14.0002C10.1693 14.0002 12.557 11.6302 12.557 8.72015C12.557 6.70015 11.368 4.82015 9.52168 3.95015C9.40519 3.89559 9.31436 3.79549 9.26906 3.67179C9.22377 3.54809 9.2277 3.41086 9.28001 3.29015C9.38634 3.04015 9.67634 2.93015 9.91801 3.04015C12.1027 4.07015 13.514 6.30015 13.514 8.72015C13.514 12.1802 10.6913 15.0002 7.23067 15.0002H7.25001Z" fill="#038C4C" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Démarrer </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => openModal(task.taskId)} className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M4.00004 12.6667C4.00004 13.4 4.60004 14 5.33337 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4.00004V12.6667ZM12.6667 2.66667H10.3334L9.66671 2H6.33337L5.66671 2.66667H3.33337V4H12.6667V2.66667Z" fill="#C62828" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Supprimer </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div>

                                                            <button className="h-9 w-5 border-0 border-white dark:border-boxdark">
                                                                <img src={UserOne} alt="User" />
                                                            </button>

                                                            <button className="h-9 w-7 border-white dark:border-boxdark">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9 4C7.93913 4 6.92172 4.42143 6.17157 5.17157C5.42143 5.92172 5 6.93913 5 8C5 9.06087 5.42143 10.0783 6.17157 10.8284C6.92172 11.5786 7.93913 12 9 12C10.0609 12 11.0783 11.5786 11.8284 10.8284C12.5786 10.0783 13 9.06087 13 8C13 6.93913 12.5786 5.92172 11.8284 5.17157C11.0783 4.42143 10.0609 4 9 4ZM7 13C5.93913 13 4.92172 13.4214 4.17157 14.1716C3.42143 14.9217 3 15.9391 3 17V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H13C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H7ZM15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H17V10C17 9.73478 17.1054 9.48043 17.2929 9.29289C17.4804 9.10536 17.7348 9 18 9C18.2652 9 18.5196 9.10536 18.7071 9.29289C18.8946 9.48043 19 9.73478 19 10V11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H19V14C19 14.2652 18.8946 14.5196 18.7071 14.7071C18.5196 14.8946 18.2652 15 18 15C17.7348 15 17.4804 14.8946 17.2929 14.7071C17.1054 14.5196 17 14.2652 17 14V13H16C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12Z" fill="black" fillOpacity="0.6" />
                                                                </svg>
                                                            </button>

                                                        </div>

                                                        <div>

                                                            <input onClick={() => toggleDropdownActions(task.taskId)} id="green-radio" type="radio" value="" name="colored-radio" className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                                            <label htmlFor="green-radio" className="font-medium text-gray-900 dark:text-gray-300"> </label>

                                                            <div className="relative inline-block text-left">

                                                                {openActionTaskId === task.taskId && (
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full top-0'} mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.47803 5H6.47803V11H7.47803V5ZM10.478 5H9.47803V11H10.478V5Z" fill="black" fill-opacity="0.6" />
                                                                                            <path d="M8.47803 2C9.66472 2 10.8248 2.35189 11.8115 3.01118C12.7981 3.67047 13.5672 4.60754 14.0213 5.7039C14.4754 6.80026 14.5943 8.00666 14.3627 9.17054C14.1312 10.3344 13.5598 11.4035 12.7207 12.2426C11.8816 13.0818 10.8125 13.6532 9.64857 13.8847C8.48469 14.1162 7.27829 13.9974 6.18193 13.5433C5.08557 13.0892 4.1485 12.3201 3.48921 11.3334C2.82992 10.3467 2.47803 9.18669 2.47803 8C2.47803 6.4087 3.11017 4.88258 4.23539 3.75736C5.36061 2.63214 6.88673 2 8.47803 2ZM8.47803 1C7.09356 1 5.74018 1.41054 4.58904 2.17971C3.43789 2.94888 2.54069 4.04213 2.01087 5.32122C1.48106 6.6003 1.34244 8.00776 1.61253 9.36563C1.88263 10.7235 2.54932 11.9708 3.52828 12.9497C4.50725 13.9287 5.75453 14.5954 7.1124 14.8655C8.47027 15.1356 9.87773 14.997 11.1568 14.4672C12.4359 13.9373 13.5291 13.0401 14.2983 11.889C15.0675 10.7378 15.478 9.38447 15.478 8C15.478 6.14348 14.7405 4.36301 13.4278 3.05025C12.115 1.7375 10.3345 1 8.47803 1Z" fill="black" fill-opacity="0.6" />
                                                                                        </svg>
                                                                                    </span>

                                                                                    <span> EN ATTENTE </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.62516 13.6673C3.94316 13.6673 0.958496 10.6827 0.958496 7.00065C0.958496 3.31865 3.94316 0.333984 7.62516 0.333984C11.3072 0.333984 14.2918 3.31865 14.2918 7.00065C14.2918 10.6827 11.3072 13.6673 7.62516 13.6673ZM6.9605 9.66732L11.6738 4.95332L10.7318 4.01065L6.9605 7.78198L5.0745 5.89598L4.13183 6.83865L6.9605 9.66732Z" fill="#F27F1B" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> TERMINE </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>

                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div className="flex items-center gap-2">

                                                            <svg width="18" height="18" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                                                <path d="M9 6H6.5V8.5H9V6ZM8.5 0.5V1.5H4.5V0.5H3.5V1.5H3C2.445 1.5 2.005 1.95 2.005 2.5L2 9.5C2 10.05 2.445 10.5 3 10.5H10C10.55 10.5 11 10.05 11 9.5V2.5C11 1.95 10.55 1.5 10 1.5H9.5V0.5H8.5ZM10 9.5H3V4H10V9.5Z" fill="black" fillOpacity="0.56" />
                                                            </svg>

                                                            <div className="text-[9px] font-semibold ">
                                                                {<DateConverter dateStr={task.taskEndDate} />} - ({task.taskNombreHeurs} h)
                                                            </div>

                                                            <svg width="16" height="16" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.37159 2.88649C2.44702 2.88649 2.5023 2.87642 2.57259 2.82114L4.25495 1.55042C4.34045 1.49042 4.38566 1.40985 4.38566 1.32456C4.38566 1.21914 4.3353 1.13385 4.25002 1.05328C4.0593 0.882493 3.71752 0.787136 3.41645 0.787136C3.23079 0.785998 3.04675 0.821724 2.875 0.892242C2.70325 0.96276 2.5472 1.06667 2.41591 1.19794C2.28461 1.32922 2.18068 1.48525 2.11014 1.65699C2.03959 1.82873 2.00384 2.01276 2.00495 2.19842C2.00495 2.38421 2.03516 2.56999 2.0853 2.68549C2.14059 2.81106 2.25116 2.88649 2.37159 2.88649ZM10.6233 2.88649C10.7489 2.88649 10.8494 2.80614 10.9096 2.68549C10.9649 2.57514 10.9949 2.38421 10.9949 2.19842C10.9949 1.41499 10.367 0.787136 9.57866 0.787136C9.2823 0.787136 8.94095 0.882493 8.75002 1.05328C8.66452 1.13364 8.61438 1.21914 8.61438 1.32456C8.61438 1.40985 8.65959 1.49021 8.73995 1.55042L10.4225 2.82114C10.4928 2.87642 10.5481 2.88649 10.6233 2.88649ZM2.29616 11.0579C2.3326 11.095 2.37617 11.1245 2.42426 11.1445C2.47235 11.1644 2.52398 11.1744 2.57604 11.174C2.62811 11.1735 2.67954 11.1625 2.72726 11.1417C2.77497 11.1208 2.81799 11.0906 2.85373 11.0527L3.64723 10.2641C4.47304 10.8747 5.47303 11.204 6.50002 11.2036C7.56973 11.2036 8.55416 10.8521 9.35259 10.2646L10.1463 11.0531C10.3019 11.2139 10.5481 11.2139 10.6987 11.0581C10.8444 10.9124 10.8494 10.6664 10.6936 10.5155L9.9303 9.75714C10.8107 8.86264 11.3032 7.65734 11.3013 6.40228C11.3013 3.75028 9.1518 1.59564 6.50002 1.59564C3.84823 1.59564 1.69873 3.75028 1.69873 6.40206C1.69732 7.65607 2.1878 8.8606 3.0648 9.75692L2.3013 10.5155C2.15066 10.6661 2.15066 10.9119 2.29638 11.0576M6.50002 10.3447C4.3203 10.3447 2.55245 8.58178 2.55245 6.40206C2.55245 4.22749 4.3203 2.45964 6.50002 2.45964C8.67459 2.45964 10.4375 4.22749 10.4375 6.40206C10.4375 8.58178 8.67459 10.3447 6.50002 10.3447ZM4.21488 6.95471H6.49488C6.69095 6.95471 6.84652 6.80385 6.84652 6.60799V3.56449C6.8468 3.51826 6.83791 3.47244 6.82035 3.42967C6.80279 3.38691 6.77691 3.34805 6.74422 3.31536C6.71153 3.28267 6.67268 3.2568 6.62991 3.23924C6.58715 3.22168 6.54132 3.21278 6.49509 3.21306C6.29902 3.21306 6.14838 3.36864 6.14838 3.56449V6.25635H4.21488C4.01388 6.25635 3.86345 6.41214 3.86345 6.60778C3.86345 6.80385 4.01388 6.95471 4.21488 6.95471Z" fill="black" fill-opacity="0.6" />
                                                            </svg>

                                                        </div>


                                                        <div>


                                                            <div className="relative inline-block sm:text-[5px] text-left">

                                                                <button onClick={() => toggleDropdownPropriete(task.taskId)} type="button" className={`inline-flex self-center items-center pl-1 pr-1 py-1 sm:text-[10px] text-sm font-medium text-center text-gray-900 bg-white rounded border-[0px] border-[#${task.prioColor}]`}
                                                                    aria-haspopup="true" aria-expanded={openPropriete === task.taskId ? 'true' : 'false'} style={{ position: 'relative', backgroundColor: `${task.prioColor}20`, color: task.prioColor }} >

                                                                    <span className={`text-[${task.prioColor}] sm:text-[10px]  whitespace-nowrap`}> PRIORITE {task.taskPriority} </span>
                                                                    <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M16.59 8.79492L12 13.3749L7.41 8.79492L6 10.2049L12 16.2049L18 10.2049L16.59 8.79492Z" fill={task.prioColor} />
                                                                    </svg>
                                                                </button>

                                                                {openPropriete === task.taskId && (
                                                                    // bottom-0
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full'} mt-2 w-40 px-5 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            {priorities.map((priority, idx) => (

                                                                                <li key={idx} className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                    <a onClick={() => { setSelectedPriority(priority) }} href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                        <span>  {priority} </span>
                                                                                    </a>
                                                                                </li>

                                                                            ))}

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center h-32">
                                            <p className="text-gray-500">Aucune tâche en cours pour ce projet.</p>
                                        </div>
                                    )}

                                </div>
                            </div>


                            {/* Dexieme Crad */}

                            <div>
                                <div className="flex flex-col p-2 mx-auto max-w-lg h-[40rem]  text-gray-900 bg-[#EBF1FA] rounded-lg  border-gray-100 shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">

                                    <div className="mb-5 flex justify-between">

                                        <div className="flex items-center">
                                            <h3 className="text-lg text-black font-bold">En attentes</h3>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white ml-2">
                                                <span className="text-sm font-medium text-black">2</span>
                                            </div>
                                        </div>

                                        <div> </div>
                                    </div>

                                    {tasksEnAttente.length > 0 ? (
                                        <div className='flex flex-col'>

                                            {tasksEnAttente.map((task, index) => (

                                                <div key={task.taskId} className='mb-3 p-3 bg-white rounded-md space-y-4'>

                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <h3 className="text-sm font-semibold">{task.taskName}</h3>
                                                        </div>

                                                        <div>

                                                            <div className="relative inline-block text-left">

                                                                <button onClick={() => toggleDropdown(task.taskId)} type="button" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900  rounded-lg"
                                                                    aria-haspopup="true" aria-expanded={openTaskId === task.taskId ? 'true' : 'false'} style={{ position: 'relative' }}>

                                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.5 10C5.4 10 4.5 10.9 4.5 12C4.5 13.1 5.4 14 6.5 14C7.6 14 8.5 13.1 8.5 12C8.5 10.9 7.6 10 6.5 10ZM18.5 10C17.4 10 16.5 10.9 16.5 12C16.5 13.1 17.4 14 18.5 14C19.6 14 20.5 13.1 20.5 12C20.5 10.9 19.6 10 18.5 10ZM12.5 10C11.4 10 10.5 10.9 10.5 12C10.5 13.1 11.4 14 12.5 14C13.6 14 14.5 13.1 14.5 12C14.5 10.9 13.6 10 12.5 10Z" fill="black" fill-opacity="0.56" />
                                                                    </svg>

                                                                </button>

                                                                {openTaskId === task.taskId && (
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full top-0'} mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M12.6666 13.3336H3.33329C3.15648 13.3336 2.98691 13.4038 2.86188 13.5288C2.73686 13.6538 2.66662 13.8234 2.66662 14.0002C2.66662 14.177 2.73686 14.3466 2.86188 14.4716C2.98691 14.5967 3.15648 14.6669 3.33329 14.6669H12.6666C12.8434 14.6669 13.013 14.5967 13.138 14.4716C13.263 14.3466 13.3333 14.177 13.3333 14.0002C13.3333 13.8234 13.263 13.6538 13.138 13.5288C13.013 13.4038 12.8434 13.3336 12.6666 13.3336ZM3.33329 12.0002H3.39329L6.17329 11.7469C6.47782 11.7166 6.76264 11.5824 6.97995 11.3669L12.98 5.3669C13.2128 5.12088 13.3387 4.79257 13.3299 4.45392C13.3212 4.11527 13.1786 3.7939 12.9333 3.56023L11.1066 1.73356C10.8682 1.50963 10.5558 1.38114 10.2288 1.37253C9.90187 1.36393 9.58314 1.47581 9.33329 1.6869L3.33329 7.6869C3.1178 7.90421 2.98362 8.18903 2.95329 8.49356L2.66662 11.2736C2.65764 11.3712 2.67031 11.4696 2.70373 11.5618C2.73715 11.654 2.79049 11.7377 2.85995 11.8069C2.92225 11.8687 2.99612 11.9176 3.07735 11.9507C3.15857 11.9839 3.24555 12.0007 3.33329 12.0002ZM10.18 2.6669L12 4.4869L10.6666 5.7869L8.87995 4.00023L10.18 2.6669Z" fill="#033F73" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Modifier </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3627 7.3635C14.5654 7.6475 14.6667 7.79016 14.6667 8.00016C14.6667 8.21083 14.5654 8.35283 14.3627 8.63683C13.452 9.91416 11.126 12.6668 8.00004 12.6668C4.87337 12.6668 2.54804 9.9135 1.63737 8.63683C1.43471 8.35283 1.33337 8.21016 1.33337 8.00016C1.33337 7.7895 1.43471 7.6475 1.63737 7.3635C2.54804 6.08616 4.87404 3.3335 8.00004 3.3335C11.1267 3.3335 13.452 6.08683 14.3627 7.3635Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Voir les tâches </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg className="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3626 7.36301C14.5653 7.64701 14.6666 7.78967 14.6666 7.99967C14.6666 8.21034 14.5653 8.35234 14.3626 8.63634C13.4519 9.91367 11.1259 12.6663 7.99992 12.6663C4.87325 12.6663 2.54792 9.91301 1.63725 8.63634C1.43459 8.35234 1.33325 8.20967 1.33325 7.99967C1.33325 7.78901 1.43459 7.64701 1.63725 7.36301C2.54792 6.08567 4.87392 3.33301 7.99992 3.33301C11.1266 3.33301 13.4519 6.08634 14.3626 7.36301Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Detail</span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.25006 10C6.97939 10 6.76672 9.78 6.76672 9.5V2.5C6.76672 2.22 6.97939 2 7.25006 2C7.52072 2 7.73339 2.22 7.73339 2.5V9.5C7.73339 9.78 7.52072 10 7.25006 10Z" fill="#038C4C" />
                                                                                            <path d="M7.25001 15.0002C3.78934 15.0002 0.966675 12.1802 0.966675 8.72015C0.966675 6.31015 2.37801 4.08015 4.56267 3.04015C4.80434 2.93015 5.09434 3.04015 5.20068 3.29015C5.30701 3.54015 5.20068 3.84015 4.95901 3.95015C3.11267 4.82015 1.92367 6.69015 1.92367 8.72015C1.92367 11.6302 4.31134 14.0002 7.24034 14.0002C10.1693 14.0002 12.557 11.6302 12.557 8.72015C12.557 6.70015 11.368 4.82015 9.52168 3.95015C9.40519 3.89559 9.31436 3.79549 9.26906 3.67179C9.22377 3.54809 9.2277 3.41086 9.28001 3.29015C9.38634 3.04015 9.67634 2.93015 9.91801 3.04015C12.1027 4.07015 13.514 6.30015 13.514 8.72015C13.514 12.1802 10.6913 15.0002 7.23067 15.0002H7.25001Z" fill="#038C4C" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Démarrer </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => openModal(task.taskId)} className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M4.00004 12.6667C4.00004 13.4 4.60004 14 5.33337 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4.00004V12.6667ZM12.6667 2.66667H10.3334L9.66671 2H6.33337L5.66671 2.66667H3.33337V4H12.6667V2.66667Z" fill="#C62828" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Supprimer </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div>

                                                            <button className="h-9 w-5 border-0 border-white dark:border-boxdark">
                                                                <img src={UserOne} alt="User" />
                                                            </button>

                                                            <button className="h-9 w-7 border-white dark:border-boxdark">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9 4C7.93913 4 6.92172 4.42143 6.17157 5.17157C5.42143 5.92172 5 6.93913 5 8C5 9.06087 5.42143 10.0783 6.17157 10.8284C6.92172 11.5786 7.93913 12 9 12C10.0609 12 11.0783 11.5786 11.8284 10.8284C12.5786 10.0783 13 9.06087 13 8C13 6.93913 12.5786 5.92172 11.8284 5.17157C11.0783 4.42143 10.0609 4 9 4ZM7 13C5.93913 13 4.92172 13.4214 4.17157 14.1716C3.42143 14.9217 3 15.9391 3 17V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H13C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H7ZM15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H17V10C17 9.73478 17.1054 9.48043 17.2929 9.29289C17.4804 9.10536 17.7348 9 18 9C18.2652 9 18.5196 9.10536 18.7071 9.29289C18.8946 9.48043 19 9.73478 19 10V11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H19V14C19 14.2652 18.8946 14.5196 18.7071 14.7071C18.5196 14.8946 18.2652 15 18 15C17.7348 15 17.4804 14.8946 17.2929 14.7071C17.1054 14.5196 17 14.2652 17 14V13H16C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12Z" fill="black" fillOpacity="0.6" />
                                                                </svg>
                                                            </button>

                                                        </div>

                                                        <div>

                                                            <div className="relative inline-block text-left">

                                                                <svg onClick={() => openValidateModal(task.taskId,2,'EN_COURS','#038C4C')} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11 7.5H9.5V16.5H11V7.5ZM15.5 7.5H14V16.5H15.5V7.5Z" fill="#033F73" />
                                                                    <path d="M12.5 3C14.28 3 16.0201 3.52784 17.5001 4.51677C18.9802 5.50571 20.1337 6.91131 20.8149 8.55585C21.4961 10.2004 21.6743 12.01 21.3271 13.7558C20.9798 15.5016 20.1226 17.1053 18.864 18.364C17.6053 19.6226 16.0016 20.4798 14.2558 20.8271C12.51 21.1743 10.7004 20.9961 9.05585 20.3149C7.41132 19.6337 6.00571 18.4802 5.01678 17.0001C4.02785 15.5201 3.5 13.78 3.5 12C3.5 9.61305 4.44822 7.32387 6.13604 5.63604C7.82387 3.94821 10.1131 3 12.5 3ZM12.5 1.5C10.4233 1.5 8.39323 2.11581 6.66652 3.26957C4.9398 4.42332 3.59399 6.0632 2.79927 7.98182C2.00455 9.90045 1.79661 12.0116 2.20176 14.0484C2.6069 16.0852 3.60693 17.9562 5.07538 19.4246C6.54383 20.8931 8.41476 21.8931 10.4516 22.2982C12.4884 22.7034 14.5996 22.4955 16.5182 21.7007C18.4368 20.906 20.0767 19.5602 21.2304 17.8335C22.3842 16.1068 23 14.0767 23 12C23 9.21523 21.8938 6.54451 19.9246 4.57538C17.9555 2.60625 15.2848 1.5 12.5 1.5Z" fill="#033F73" />
                                                                </svg>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div className="flex items-center gap-2">

                                                            <svg width="18" height="18" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                                                <path d="M9 6H6.5V8.5H9V6ZM8.5 0.5V1.5H4.5V0.5H3.5V1.5H3C2.445 1.5 2.005 1.95 2.005 2.5L2 9.5C2 10.05 2.445 10.5 3 10.5H10C10.55 10.5 11 10.05 11 9.5V2.5C11 1.95 10.55 1.5 10 1.5H9.5V0.5H8.5ZM10 9.5H3V4H10V9.5Z" fill="black" fillOpacity="0.56" />
                                                            </svg>

                                                            <div className="text-[9px] font-semibold ">
                                                                {<DateConverter dateStr={task.taskEndDate} />} - ({task.taskNombreHeurs} h)
                                                            </div>

                                                            <svg width="16" height="16" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.37159 2.88649C2.44702 2.88649 2.5023 2.87642 2.57259 2.82114L4.25495 1.55042C4.34045 1.49042 4.38566 1.40985 4.38566 1.32456C4.38566 1.21914 4.3353 1.13385 4.25002 1.05328C4.0593 0.882493 3.71752 0.787136 3.41645 0.787136C3.23079 0.785998 3.04675 0.821724 2.875 0.892242C2.70325 0.96276 2.5472 1.06667 2.41591 1.19794C2.28461 1.32922 2.18068 1.48525 2.11014 1.65699C2.03959 1.82873 2.00384 2.01276 2.00495 2.19842C2.00495 2.38421 2.03516 2.56999 2.0853 2.68549C2.14059 2.81106 2.25116 2.88649 2.37159 2.88649ZM10.6233 2.88649C10.7489 2.88649 10.8494 2.80614 10.9096 2.68549C10.9649 2.57514 10.9949 2.38421 10.9949 2.19842C10.9949 1.41499 10.367 0.787136 9.57866 0.787136C9.2823 0.787136 8.94095 0.882493 8.75002 1.05328C8.66452 1.13364 8.61438 1.21914 8.61438 1.32456C8.61438 1.40985 8.65959 1.49021 8.73995 1.55042L10.4225 2.82114C10.4928 2.87642 10.5481 2.88649 10.6233 2.88649ZM2.29616 11.0579C2.3326 11.095 2.37617 11.1245 2.42426 11.1445C2.47235 11.1644 2.52398 11.1744 2.57604 11.174C2.62811 11.1735 2.67954 11.1625 2.72726 11.1417C2.77497 11.1208 2.81799 11.0906 2.85373 11.0527L3.64723 10.2641C4.47304 10.8747 5.47303 11.204 6.50002 11.2036C7.56973 11.2036 8.55416 10.8521 9.35259 10.2646L10.1463 11.0531C10.3019 11.2139 10.5481 11.2139 10.6987 11.0581C10.8444 10.9124 10.8494 10.6664 10.6936 10.5155L9.9303 9.75714C10.8107 8.86264 11.3032 7.65734 11.3013 6.40228C11.3013 3.75028 9.1518 1.59564 6.50002 1.59564C3.84823 1.59564 1.69873 3.75028 1.69873 6.40206C1.69732 7.65607 2.1878 8.8606 3.0648 9.75692L2.3013 10.5155C2.15066 10.6661 2.15066 10.9119 2.29638 11.0576M6.50002 10.3447C4.3203 10.3447 2.55245 8.58178 2.55245 6.40206C2.55245 4.22749 4.3203 2.45964 6.50002 2.45964C8.67459 2.45964 10.4375 4.22749 10.4375 6.40206C10.4375 8.58178 8.67459 10.3447 6.50002 10.3447ZM4.21488 6.95471H6.49488C6.69095 6.95471 6.84652 6.80385 6.84652 6.60799V3.56449C6.8468 3.51826 6.83791 3.47244 6.82035 3.42967C6.80279 3.38691 6.77691 3.34805 6.74422 3.31536C6.71153 3.28267 6.67268 3.2568 6.62991 3.23924C6.58715 3.22168 6.54132 3.21278 6.49509 3.21306C6.29902 3.21306 6.14838 3.36864 6.14838 3.56449V6.25635H4.21488C4.01388 6.25635 3.86345 6.41214 3.86345 6.60778C3.86345 6.80385 4.01388 6.95471 4.21488 6.95471Z" fill="black" fill-opacity="0.6" />
                                                            </svg>

                                                        </div>


                                                        <div>


                                                            <div className="relative inline-block sm:text-[5px] text-left">

                                                                <button onClick={() => toggleDropdownPropriete(task.taskId)} type="button" className={`inline-flex self-center items-center pl-1 pr-1 py-1 sm:text-[10px] text-sm font-medium text-center text-gray-900 bg-white rounded border-[0px] border-[#${task.prioColor}]`}
                                                                    aria-haspopup="true" aria-expanded={openPropriete === task.taskId ? 'true' : 'false'} style={{ position: 'relative', backgroundColor: `${task.prioColor}20`, color: task.prioColor }} >

                                                                    <span className={`text-[${task.prioColor}] sm:text-[10px]  whitespace-nowrap`}> PRIORITE {task.taskPriority} </span>
                                                                    <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M16.59 8.79492L12 13.3749L7.41 8.79492L6 10.2049L12 16.2049L18 10.2049L16.59 8.79492Z" fill={task.prioColor} />
                                                                    </svg>
                                                                </button>

                                                                {openPropriete === task.taskId && (
                                                                    // bottom-0
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full'} mt-2 w-40 px-5 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            {priorities.map((priority, idx) => (

                                                                                <li key={idx} className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                    <a onClick={() => { setSelectedPriority(priority) }} href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                        <span>  {priority} </span>
                                                                                    </a>
                                                                                </li>

                                                                            ))}

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center h-32">
                                            <p className="text-gray-500">Aucune tâche en attente pour ce projet.</p>
                                        </div>
                                    )}

                                </div>
                            </div>


                            {/* Troisieme Crad */}

                            <div>
                                <div className="flex flex-col p-2 mx-auto max-w-lg h-[40rem]  text-gray-900 bg-[#EBF1FA] rounded-lg  border-gray-100 shadow dark:border-gray-600  dark:bg-gray-800 dark:text-white">

                                    <div className="mb-5 flex justify-between">

                                        <div className="flex items-center">
                                            <h3 className="text-lg text-black font-bold">Terminées</h3>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white ml-2">
                                                <span className="text-sm font-medium text-black">2</span>
                                            </div>
                                        </div>

                                        <div>


                                        </div>
                                    </div>

                                    {tasksTermines.length > 0 ? (
                                        <div className='flex flex-col'>

                                            {tasksTermines.map((task, index) => (

                                                <div key={task.taskId} className='mb-3 p-3 bg-white rounded-md space-y-4'>

                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <h3 className="text-sm font-semibold">{task.taskName}</h3>
                                                        </div>

                                                        <div>

                                                            <div className="relative inline-block text-left">

                                                                <button
                                                                    onClick={() => toggleDropdown(task.taskId)}
                                                                    type="button"
                                                                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900  rounded-lg"
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openTaskId === task.taskId ? 'true' : 'false'}
                                                                    style={{ position: 'relative' }}
                                                                >

                                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.5 10C5.4 10 4.5 10.9 4.5 12C4.5 13.1 5.4 14 6.5 14C7.6 14 8.5 13.1 8.5 12C8.5 10.9 7.6 10 6.5 10ZM18.5 10C17.4 10 16.5 10.9 16.5 12C16.5 13.1 17.4 14 18.5 14C19.6 14 20.5 13.1 20.5 12C20.5 10.9 19.6 10 18.5 10ZM12.5 10C11.4 10 10.5 10.9 10.5 12C10.5 13.1 11.4 14 12.5 14C13.6 14 14.5 13.1 14.5 12C14.5 10.9 13.6 10 12.5 10Z" fill="black" fill-opacity="0.56" />
                                                                    </svg>

                                                                </button>

                                                                {openTaskId === task.taskId && (
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full top-0'} mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M12.6666 13.3336H3.33329C3.15648 13.3336 2.98691 13.4038 2.86188 13.5288C2.73686 13.6538 2.66662 13.8234 2.66662 14.0002C2.66662 14.177 2.73686 14.3466 2.86188 14.4716C2.98691 14.5967 3.15648 14.6669 3.33329 14.6669H12.6666C12.8434 14.6669 13.013 14.5967 13.138 14.4716C13.263 14.3466 13.3333 14.177 13.3333 14.0002C13.3333 13.8234 13.263 13.6538 13.138 13.5288C13.013 13.4038 12.8434 13.3336 12.6666 13.3336ZM3.33329 12.0002H3.39329L6.17329 11.7469C6.47782 11.7166 6.76264 11.5824 6.97995 11.3669L12.98 5.3669C13.2128 5.12088 13.3387 4.79257 13.3299 4.45392C13.3212 4.11527 13.1786 3.7939 12.9333 3.56023L11.1066 1.73356C10.8682 1.50963 10.5558 1.38114 10.2288 1.37253C9.90187 1.36393 9.58314 1.47581 9.33329 1.6869L3.33329 7.6869C3.1178 7.90421 2.98362 8.18903 2.95329 8.49356L2.66662 11.2736C2.65764 11.3712 2.67031 11.4696 2.70373 11.5618C2.73715 11.654 2.79049 11.7377 2.85995 11.8069C2.92225 11.8687 2.99612 11.9176 3.07735 11.9507C3.15857 11.9839 3.24555 12.0007 3.33329 12.0002ZM10.18 2.6669L12 4.4869L10.6666 5.7869L8.87995 4.00023L10.18 2.6669Z" fill="#033F73" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Modifier </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3627 7.3635C14.5654 7.6475 14.6667 7.79016 14.6667 8.00016C14.6667 8.21083 14.5654 8.35283 14.3627 8.63683C13.452 9.91416 11.126 12.6668 8.00004 12.6668C4.87337 12.6668 2.54804 9.9135 1.63737 8.63683C1.43471 8.35283 1.33337 8.21016 1.33337 8.00016C1.33337 7.7895 1.43471 7.6475 1.63737 7.3635C2.54804 6.08616 4.87404 3.3335 8.00004 3.3335C11.1267 3.3335 13.452 6.08683 14.3627 7.3635Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Voir les tâches </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg className="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3626 7.36301C14.5653 7.64701 14.6666 7.78967 14.6666 7.99967C14.6666 8.21034 14.5653 8.35234 14.3626 8.63634C13.4519 9.91367 11.1259 12.6663 7.99992 12.6663C4.87325 12.6663 2.54792 9.91301 1.63725 8.63634C1.43459 8.35234 1.33325 8.20967 1.33325 7.99967C1.33325 7.78901 1.43459 7.64701 1.63725 7.36301C2.54792 6.08567 4.87392 3.33301 7.99992 3.33301C11.1266 3.33301 13.4519 6.08634 14.3626 7.36301Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Detail</span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.25006 10C6.97939 10 6.76672 9.78 6.76672 9.5V2.5C6.76672 2.22 6.97939 2 7.25006 2C7.52072 2 7.73339 2.22 7.73339 2.5V9.5C7.73339 9.78 7.52072 10 7.25006 10Z" fill="#038C4C" />
                                                                                            <path d="M7.25001 15.0002C3.78934 15.0002 0.966675 12.1802 0.966675 8.72015C0.966675 6.31015 2.37801 4.08015 4.56267 3.04015C4.80434 2.93015 5.09434 3.04015 5.20068 3.29015C5.30701 3.54015 5.20068 3.84015 4.95901 3.95015C3.11267 4.82015 1.92367 6.69015 1.92367 8.72015C1.92367 11.6302 4.31134 14.0002 7.24034 14.0002C10.1693 14.0002 12.557 11.6302 12.557 8.72015C12.557 6.70015 11.368 4.82015 9.52168 3.95015C9.40519 3.89559 9.31436 3.79549 9.26906 3.67179C9.22377 3.54809 9.2277 3.41086 9.28001 3.29015C9.38634 3.04015 9.67634 2.93015 9.91801 3.04015C12.1027 4.07015 13.514 6.30015 13.514 8.72015C13.514 12.1802 10.6913 15.0002 7.23067 15.0002H7.25001Z" fill="#038C4C" />
                                                                                        </svg>

                                                                                    </span>
                                                                                    <span> Démarrer </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => openModal(task.taskId)} className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M4.00004 12.6667C4.00004 13.4 4.60004 14 5.33337 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4.00004V12.6667ZM12.6667 2.66667H10.3334L9.66671 2H6.33337L5.66671 2.66667H3.33337V4H12.6667V2.66667Z" fill="#C62828" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Supprimer </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div>

                                                            <button className="h-9 w-5 border-0 border-white dark:border-boxdark">
                                                                <img src={UserOne} alt="User" />
                                                            </button>

                                                            <button className="h-9 w-7 border-white dark:border-boxdark">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9 4C7.93913 4 6.92172 4.42143 6.17157 5.17157C5.42143 5.92172 5 6.93913 5 8C5 9.06087 5.42143 10.0783 6.17157 10.8284C6.92172 11.5786 7.93913 12 9 12C10.0609 12 11.0783 11.5786 11.8284 10.8284C12.5786 10.0783 13 9.06087 13 8C13 6.93913 12.5786 5.92172 11.8284 5.17157C11.0783 4.42143 10.0609 4 9 4ZM7 13C5.93913 13 4.92172 13.4214 4.17157 14.1716C3.42143 14.9217 3 15.9391 3 17V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H13C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H7ZM15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H17V10C17 9.73478 17.1054 9.48043 17.2929 9.29289C17.4804 9.10536 17.7348 9 18 9C18.2652 9 18.5196 9.10536 18.7071 9.29289C18.8946 9.48043 19 9.73478 19 10V11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H19V14C19 14.2652 18.8946 14.5196 18.7071 14.7071C18.5196 14.8946 18.2652 15 18 15C17.7348 15 17.4804 14.8946 17.2929 14.7071C17.1054 14.5196 17 14.2652 17 14V13H16C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12Z" fill="black" fillOpacity="0.6" />
                                                                </svg>
                                                            </button>

                                                        </div>

                                                        <div>

                                                            <div className="flex items-center">
                                                                <input onClick={() => openValidateModal(task.taskId,1,'EN_COURS','#012340')} id="radio1" type="radio" name="value1" className="w-3 h-3 hidden peer" checked />
                                                                <label htmlFor="radio1" className="relative flex items-center justify-center peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-0 border-orange-500 rounded-full overflow-hidden">
                                                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10.5 20C4.977 20 0.5 15.523 0.5 10C0.5 4.477 4.977 0 10.5 0C16.023 0 20.5 4.477 20.5 10C20.5 15.523 16.023 20 10.5 20ZM9.503 14L16.573 6.929L15.16 5.515L9.503 11.172L6.674 8.343L5.26 9.757L9.503 14Z" fill="#F27F1B" />
                                                                    </svg>

                                                                </label>
                                                            </div>


                                                            <div className="relative inline-block text-left">

                                                                {openActionTaskId === task.taskId && (
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full top-0'} mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.47803 5H6.47803V11H7.47803V5ZM10.478 5H9.47803V11H10.478V5Z" fill="black" fill-opacity="0.6" />
                                                                                            <path d="M8.47803 2C9.66472 2 10.8248 2.35189 11.8115 3.01118C12.7981 3.67047 13.5672 4.60754 14.0213 5.7039C14.4754 6.80026 14.5943 8.00666 14.3627 9.17054C14.1312 10.3344 13.5598 11.4035 12.7207 12.2426C11.8816 13.0818 10.8125 13.6532 9.64857 13.8847C8.48469 14.1162 7.27829 13.9974 6.18193 13.5433C5.08557 13.0892 4.1485 12.3201 3.48921 11.3334C2.82992 10.3467 2.47803 9.18669 2.47803 8C2.47803 6.4087 3.11017 4.88258 4.23539 3.75736C5.36061 2.63214 6.88673 2 8.47803 2ZM8.47803 1C7.09356 1 5.74018 1.41054 4.58904 2.17971C3.43789 2.94888 2.54069 4.04213 2.01087 5.32122C1.48106 6.6003 1.34244 8.00776 1.61253 9.36563C1.88263 10.7235 2.54932 11.9708 3.52828 12.9497C4.50725 13.9287 5.75453 14.5954 7.1124 14.8655C8.47027 15.1356 9.87773 14.997 11.1568 14.4672C12.4359 13.9373 13.5291 13.0401 14.2983 11.889C15.0675 10.7378 15.478 9.38447 15.478 8C15.478 6.14348 14.7405 4.36301 13.4278 3.05025C12.115 1.7375 10.3345 1 8.47803 1Z" fill="black" fill-opacity="0.6" />
                                                                                        </svg>
                                                                                    </span>

                                                                                    <span> EN ATTENTE </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.62516 13.6673C3.94316 13.6673 0.958496 10.6827 0.958496 7.00065C0.958496 3.31865 3.94316 0.333984 7.62516 0.333984C11.3072 0.333984 14.2918 3.31865 14.2918 7.00065C14.2918 10.6827 11.3072 13.6673 7.62516 13.6673ZM6.9605 9.66732L11.6738 4.95332L10.7318 4.01065L6.9605 7.78198L5.0745 5.89598L4.13183 6.83865L6.9605 9.66732Z" fill="#F27F1B" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> TERMINE </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>

                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <div className="flex items-center gap-2">

                                                            <svg width="18" height="18" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                                                <path d="M9 6H6.5V8.5H9V6ZM8.5 0.5V1.5H4.5V0.5H3.5V1.5H3C2.445 1.5 2.005 1.95 2.005 2.5L2 9.5C2 10.05 2.445 10.5 3 10.5H10C10.55 10.5 11 10.05 11 9.5V2.5C11 1.95 10.55 1.5 10 1.5H9.5V0.5H8.5ZM10 9.5H3V4H10V9.5Z" fill="black" fillOpacity="0.56" />
                                                            </svg>

                                                            <div className="text-[9px] font-semibold ">
                                                                {<DateConverter dateStr={task.taskEndDate} />} - ({task.taskNombreHeurs} h)
                                                            </div>

                                                            <svg width="16" height="16" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.37159 2.88649C2.44702 2.88649 2.5023 2.87642 2.57259 2.82114L4.25495 1.55042C4.34045 1.49042 4.38566 1.40985 4.38566 1.32456C4.38566 1.21914 4.3353 1.13385 4.25002 1.05328C4.0593 0.882493 3.71752 0.787136 3.41645 0.787136C3.23079 0.785998 3.04675 0.821724 2.875 0.892242C2.70325 0.96276 2.5472 1.06667 2.41591 1.19794C2.28461 1.32922 2.18068 1.48525 2.11014 1.65699C2.03959 1.82873 2.00384 2.01276 2.00495 2.19842C2.00495 2.38421 2.03516 2.56999 2.0853 2.68549C2.14059 2.81106 2.25116 2.88649 2.37159 2.88649ZM10.6233 2.88649C10.7489 2.88649 10.8494 2.80614 10.9096 2.68549C10.9649 2.57514 10.9949 2.38421 10.9949 2.19842C10.9949 1.41499 10.367 0.787136 9.57866 0.787136C9.2823 0.787136 8.94095 0.882493 8.75002 1.05328C8.66452 1.13364 8.61438 1.21914 8.61438 1.32456C8.61438 1.40985 8.65959 1.49021 8.73995 1.55042L10.4225 2.82114C10.4928 2.87642 10.5481 2.88649 10.6233 2.88649ZM2.29616 11.0579C2.3326 11.095 2.37617 11.1245 2.42426 11.1445C2.47235 11.1644 2.52398 11.1744 2.57604 11.174C2.62811 11.1735 2.67954 11.1625 2.72726 11.1417C2.77497 11.1208 2.81799 11.0906 2.85373 11.0527L3.64723 10.2641C4.47304 10.8747 5.47303 11.204 6.50002 11.2036C7.56973 11.2036 8.55416 10.8521 9.35259 10.2646L10.1463 11.0531C10.3019 11.2139 10.5481 11.2139 10.6987 11.0581C10.8444 10.9124 10.8494 10.6664 10.6936 10.5155L9.9303 9.75714C10.8107 8.86264 11.3032 7.65734 11.3013 6.40228C11.3013 3.75028 9.1518 1.59564 6.50002 1.59564C3.84823 1.59564 1.69873 3.75028 1.69873 6.40206C1.69732 7.65607 2.1878 8.8606 3.0648 9.75692L2.3013 10.5155C2.15066 10.6661 2.15066 10.9119 2.29638 11.0576M6.50002 10.3447C4.3203 10.3447 2.55245 8.58178 2.55245 6.40206C2.55245 4.22749 4.3203 2.45964 6.50002 2.45964C8.67459 2.45964 10.4375 4.22749 10.4375 6.40206C10.4375 8.58178 8.67459 10.3447 6.50002 10.3447ZM4.21488 6.95471H6.49488C6.69095 6.95471 6.84652 6.80385 6.84652 6.60799V3.56449C6.8468 3.51826 6.83791 3.47244 6.82035 3.42967C6.80279 3.38691 6.77691 3.34805 6.74422 3.31536C6.71153 3.28267 6.67268 3.2568 6.62991 3.23924C6.58715 3.22168 6.54132 3.21278 6.49509 3.21306C6.29902 3.21306 6.14838 3.36864 6.14838 3.56449V6.25635H4.21488C4.01388 6.25635 3.86345 6.41214 3.86345 6.60778C3.86345 6.80385 4.01388 6.95471 4.21488 6.95471Z" fill="black" fill-opacity="0.6" />
                                                            </svg>

                                                        </div>


                                                        <div>


                                                            <div className="relative inline-block sm:text-[5px] text-left">

                                                                <button onClick={() => toggleDropdownPropriete(task.taskId)} type="button" className={`inline-flex self-center items-center pl-1 pr-1 py-1 sm:text-[10px] text-sm font-medium text-center text-gray-900 bg-white rounded border-[0px] border-[#${task.prioColor}]`}
                                                                    aria-haspopup="true" aria-expanded={openPropriete === task.taskId ? 'true' : 'false'} style={{ position: 'relative', backgroundColor: `${task.prioColor}20`, color: task.prioColor }} >

                                                                    <span className={`text-[${task.prioColor}] sm:text-[10px]  whitespace-nowrap`}> PRIORITE {task.taskPriority} </span>
                                                                    <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M16.59 8.79492L12 13.3749L7.41 8.79492L6 10.2049L12 16.2049L18 10.2049L16.59 8.79492Z" fill={task.prioColor} />
                                                                    </svg>
                                                                </button>

                                                                {openPropriete === task.taskId && (
                                                                    // bottom-0
                                                                    <div
                                                                        className={`z-50 origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full'} mt-2 w-40 px-5 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu" aria-orientation="vertical" aria-labelledby="dropdownMenuIconButton" style={{ position: 'absolute' }}>

                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            {priorities.map((priority, idx) => (

                                                                                <li key={idx} className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                    <a onClick={() => { setSelectedPriority(priority) }} href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                        <span>  {priority} </span>
                                                                                    </a>
                                                                                </li>

                                                                            ))}

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center h-32">
                                            <p className="text-gray-500">Aucune tâche terminées pour ce projet.</p>
                                        </div>
                                    )}

                                </div>
                            </div>


                        </div>

                </div>

            </section>

            <ActionModal
                buttonColor="#D32F2F"
                actionMessage={actionMessage}
                onDeleteMessage="OUI, SUPPRIMER"
                onCloseMessage="ANNULER"
                id={idtaches}
                onDelete={(id) => { handleDeleteTask(idtaches); }}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            <ValidateModal
                buttonColor="#D32F2F"
                actionMessage={actionMessage}
                onDeleteMessage="OUI, DEMARRER"
                onCloseMessage="ANNULER"
                id={idtaches}
                actions={position}
                states={StateSelecte}
                onDelete={() => { initRemoveUsers(idtaches,position); }}
                isOpen={isValidateModalOpen}
                onClose={closeModal}
            />

        </>

    );
};

export default TaskCard;
