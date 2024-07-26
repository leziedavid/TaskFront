import React, { useEffect, useState } from 'react';
import { Projects } from '../../interfaces/Projects'; // Assurez-vous d'importer correctement l'interface Projects
import { BaseResponse } from '../../interfaces/ApiResponse';
import ActionModal from '../../components/Modal/ActionModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteProject ,changePriority,changeState} from '../../services/ProjectService';
import { Link } from 'react-router-dom';

interface ProjectProps {
    response: Projects[] | null; // Utilisation de l'interface Project pour le tableau de projets
    fetchProjects: () => void;
}

const TableProject: React.FC<ProjectProps> = ({ response,fetchProjects }) => {

    const [openProjectId, setOpenProjectId] = useState<number | null>(null);

    const toggleDropdown = (projectId: number) => {
        setOpenProjectId(openProjectId === projectId ? null : projectId);
    };

    const [openState, setOpenState] = useState<number | null>(null);
    const [selectedStates, setSelectedStates] = useState<string>('MOYENNE');
    const states = ['EN_COURS', 'EN_ATTENTE', 'TERMINER'];

    const [openPropriete, setOpenPropriete] = useState<number | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<string>('MOYENNE');
    const priorities = ['MOYENNE', 'FAIBLE', 'ELEVEE'];

    const toggleDropdownPropriete = (projectId: number) => {
        setOpenPropriete(openPropriete === projectId ? null : projectId);
    };

    const formatProjectState = (state: string): string => {
        return state.replace('_', ' ');
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const [projectIdToDelete, setProjectIdToDelete] = useState<number | null>(null);
    const [responses, setResponses] = useState<BaseResponse<Projects> | null>(null);
    const [selectedColors, setSelectedColors] = useState<string>('');


    const toggleDropdownState = (projectId: number) => {
        setOpenState(openState === projectId ? null : projectId);
    };

    const openModal = (id: number) => {
        setId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProject = async () => {

        console.log(`Deleting project with ID: ${id}`);
        try {
            if (id){

                const apiResponse = await deleteProject(id);
                setResponses(apiResponse);

                if (apiResponse && apiResponse.code === 200) {

                    toast.success("Projet supprimé avec succès !");
                    fetchProjects(); // Appel de la fonction fetchProjects après la suppression réussie

                } else {
                    
                    toast.error("Erreur lors de la suppression du projet. Veuillez réessayer.");
                }
            }

        } catch (error) {
            console.error('Erreur lors de la suppression du projet :', error);
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
        closeModal();
    };


    const SelectedPriority = (id: number,priority :string) => {
        setId(id);
        setSelectedPriority(priority);
    };
    const changeProjectPriority = async () => {

        console.log(`change Project Priority: ${id}`);

        if (selectedPriority == "ELEVEE") {
            setSelectedColors('#033F73');
        } else if (selectedPriority == "MOYENNE") {
            setSelectedColors('#F27F1B');
        } else if (selectedPriority == "FAIBLE") {
            setSelectedColors('#F27F1B');
        }
        

        try {

            if (id){

                const apiResponse = await changePriority(id,selectedPriority,selectedColors);
                setResponses(apiResponse);

                if (apiResponse && apiResponse.code === 200) {

                    toast.success("Priorité mise à jour avec succès !");
                    fetchProjects();

                } else {
                    
                    toast.error("Erreur lors de la mise à jour de la priorité. Veuillez réessayer");
                }
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour de la priorité :', error);
            toast.error("Erreur lors de la mise à jour de la priorité. Veuillez vérifier votre connexion.");
        }

    };

    const SelectedState = (id: number,state:string) => {
        setId(id);
        setSelectedStates(state);
    };
    const changeStateProject= async () => {

        if (selectedStates == "EN_COURS") {
            setSelectedColors('#038C4C');
        } else if (selectedStates == "EN_ATTENTE") {
            setSelectedColors('#F27F1B');
        } else if (selectedStates == "TERMINER") {
            setSelectedColors('#012340');
        }

        console.log(selectedColors);
        
        try {

            if (id){

                const apiResponse = await changeState(id,selectedStates,selectedColors);
                setResponses(apiResponse);

                if (apiResponse && apiResponse.code === 200) {

                    toast.success("Status mise à jour avec succès!");
                    fetchProjects();

                } else {
                    
                    toast.error("Erreur lors de la mise à jour de du status. Veuillez réessayer");
                }
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour du status:', error);
            toast.error("Erreur lors de la mise à jour du status. Veuillez vérifier votre connexion.");
        }

    };

    useEffect(() => {

    if(selectedPriority){
        changeProjectPriority();
    }
    
    }, [selectedPriority]);


    useEffect(() => {

        if(selectedStates){
            changeStateProject();
        }
        
        }, [selectedStates]);


    return (

        <>
            <ToastContainer position="top-right" autoClose={5000} />

            <section className="container px-8 mx-auto bg-white">

                <div className=" bg-white p-3">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-white dark:border-gray-700 mb-8">
                                    <table className="shadow-lg min-w-full divide-y border border-gray-900">
                                        
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>ID</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Code</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Nb jours</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Projet</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Statut</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Priorité</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date de début</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date de fin</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className=" mb-8 bg-white divide-gray-10 dark:divide-gray-700 dark:bg-gray-900">
                                            {response && response.length > 0 ? (
                                                response.map((project, index) => (
                                                
                                                    <tr key={project.projectId}>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{project.projectId}</div>
                                                        </td>
                                                        <td className={`px-12 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{project.projectCodes}</div>
                                                        </td>
                                                        <td className={`px-12 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{project.projectNombreJours}</div>
                                                        </td>

                                                        <td className={`px-12 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{project.projectName}</div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="relative inline-block text-left">
                                                                
                                                                <button
                                                                    onClick={() => toggleDropdownState(project.projectId)}
                                                                    type="button"
                                                                    className={`space-x-2 inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 rounded border-[0px]`}
                                                                    aria-haspopup="true" aria-expanded={openState === project.projectId ? 'true' : 'false'}
                                                                    // style={{ position: 'relative', borderColor:project.prioColor, color: project.prioColor }}
                                                                    >

                                                                        <div  style={{color:project.stateColor,backgroundColor: `${project.prioColor}`, }} className={`w-2.5 h-2.5 bg-[${project.stateColor}] rounded-full`}> </div>
                                                                        <span className={`text-[${project.prioColor}]`}> {formatProjectState(project.projectState)} </span>

                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M16.59 8.79492L12 13.3749L7.41 8.79492L6 10.2049L12 16.2049L18 10.2049L16.59 8.79492Z" fill="#033F73"/>
                                                                        </svg>
                                                                </button>

                                                                    {openState === project.projectId && (
                                                                    
                                                                    <div
                                                                        className={`origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full bottom-0' } mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu"
                                                                        aria-orientation="vertical"
                                                                        aria-labelledby="dropdownMenuIconButton"
                                                                        style={{ position: 'absolute' }}>
                                                                            
                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                        {states.map((state, idx) => (
                                                                            <li  key={idx}  className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => { SelectedState(project.projectId,state) }} href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>   {formatProjectState(state)} </span>
                                                                                </a>
                                                                            </li>
                                                                        ))}

                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="relative inline-block text-left">
                                                                
                                                                <button
                                                                    onClick={() => toggleDropdownPropriete(project.projectId)}
                                                                    type="button"
                                                                    className={`inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded border-[1.5px] border-[${project.prioColor}]`}
                                                                    aria-haspopup="true" aria-expanded={openPropriete === project.projectId ? 'true' : 'false'}
                                                                    style={{ position: 'relative', borderColor:project.prioColor, color: project.prioColor }}
                                                                    >
                                                                        <span className={`'text-[${project.prioColor}]`}> PRIORITE {project.projectPriority} </span>
                                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M16.59 8.79492L12 13.3749L7.41 8.79492L6 10.2049L12 16.2049L18 10.2049L16.59 8.79492Z" fill="#033F73"/>
                                                                    </svg>
                                                                </button>

                                                                    {openPropriete === project.projectId && (
                                                                    
                                                                    <div
                                                                        className={`origin-top-left absolute ${index === 0 || index === 1 ? 'left-full top-0' : 'right-full bottom-0' } mt-2 w-40 px-5 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu"
                                                                        aria-orientation="vertical"
                                                                        aria-labelledby="dropdownMenuIconButton"
                                                                        style={{ position: 'absolute' }}>
                                                                            
                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                        {priorities.map((priority, idx) => (

                                                                            <li  key={idx}  className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => { SelectedPriority(project.projectId ,priority) }} className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>  {priority} </span>
                                                                                </a>
                                                                            </li>

                                                                        ))}

                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'}`}>{new Date(project.projectStartDate).toLocaleDateString()}</td>
                                                        <td className={`px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'}`}>{new Date(project.projectEndDate).toLocaleDateString()}</td>
                                                        
                                                        <td className={`px-4 py-4 text-sm whitespace-nowrap ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'}`}>
                                                            <div className="relative inline-block text-left">
                                                                <button onClick={() => toggleDropdown(project.projectId)}
                                                                    type="button"
                                                                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900  rounded-lg"
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openProjectId === project.projectId ? 'true' : 'false'}
                                                                    style={{ position: 'relative' }}>

                                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 4 15">
                                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                                    </svg>
                                                                </button>
                                                                {openProjectId === project.projectId && (
                                                                    <div
                                                                        className={`origin-top-left absolute ${index === 0 || index === 1 ? 'right-full top-0' : 'right-full bottom-0' } mt-2 w-40 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                                                                        role="menu"
                                                                        aria-orientation="vertical"
                                                                        aria-labelledby="dropdownMenuIconButton"
                                                                        style={{ position: 'absolute' }}>
                                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M12.6666 13.3336H3.33329C3.15648 13.3336 2.98691 13.4038 2.86188 13.5288C2.73686 13.6538 2.66662 13.8234 2.66662 14.0002C2.66662 14.177 2.73686 14.3466 2.86188 14.4716C2.98691 14.5967 3.15648 14.6669 3.33329 14.6669H12.6666C12.8434 14.6669 13.013 14.5967 13.138 14.4716C13.263 14.3466 13.3333 14.177 13.3333 14.0002C13.3333 13.8234 13.263 13.6538 13.138 13.5288C13.013 13.4038 12.8434 13.3336 12.6666 13.3336ZM3.33329 12.0002H3.39329L6.17329 11.7469C6.47782 11.7166 6.76264 11.5824 6.97995 11.3669L12.98 5.3669C13.2128 5.12088 13.3387 4.79257 13.3299 4.45392C13.3212 4.11527 13.1786 3.7939 12.9333 3.56023L11.1066 1.73356C10.8682 1.50963 10.5558 1.38114 10.2288 1.37253C9.90187 1.36393 9.58314 1.47581 9.33329 1.6869L3.33329 7.6869C3.1178 7.90421 2.98362 8.18903 2.95329 8.49356L2.66662 11.2736C2.65764 11.3712 2.67031 11.4696 2.70373 11.5618C2.73715 11.654 2.79049 11.7377 2.85995 11.8069C2.92225 11.8687 2.99612 11.9176 3.07735 11.9507C3.15857 11.9839 3.24555 12.0007 3.33329 12.0002ZM10.18 2.6669L12 4.4869L10.6666 5.7869L8.87995 4.00023L10.18 2.6669Z" fill="#033F73"/>
                                                                                    </svg>

                                                                                    </span>
                                                                                    <span> Modifier </span>
                                                                                </a>
                                                                            </li>
                                                                            
                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <Link to={`/auth/detail/projet/${project.projectCodes}`}  className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">

                                                                                    <span>
                                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M14.3627 7.3635C14.5654 7.6475 14.6667 7.79016 14.6667 8.00016C14.6667 8.21083 14.5654 8.35283 14.3627 8.63683C13.452 9.91416 11.126 12.6668 8.00004 12.6668C4.87337 12.6668 2.54804 9.9135 1.63737 8.63683C1.43471 8.35283 1.33337 8.21016 1.33337 8.00016C1.33337 7.7895 1.43471 7.6475 1.63737 7.3635C2.54804 6.08616 4.87404 3.3335 8.00004 3.3335C11.1267 3.3335 13.452 6.08683 14.3627 7.3635Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                        <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                    </svg>
                                                                                    </span>
                                                                                    <span> Voir les tâches </span>
                                                                                </Link>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <Link to={`/auth/detail/projet/${project.projectCodes}`}  className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                        <svg className="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.3626 7.36301C14.5653 7.64701 14.6666 7.78967 14.6666 7.99967C14.6666 8.21034 14.5653 8.35234 14.3626 8.63634C13.4519 9.91367 11.1259 12.6663 7.99992 12.6663C4.87325 12.6663 2.54792 9.91301 1.63725 8.63634C1.43459 8.35234 1.33325 8.20967 1.33325 7.99967C1.33325 7.78901 1.43459 7.64701 1.63725 7.36301C2.54792 6.08567 4.87392 3.33301 7.99992 3.33301C11.1266 3.33301 13.4519 6.08634 14.3626 7.36301Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                            <path d="M10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8Z" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                                        </svg>
                                                                                    </span>
                                                                                    <span> Detail</span>
                                                                                </Link>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a href="#" className="space-x-2 flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M7.25006 10C6.97939 10 6.76672 9.78 6.76672 9.5V2.5C6.76672 2.22 6.97939 2 7.25006 2C7.52072 2 7.73339 2.22 7.73339 2.5V9.5C7.73339 9.78 7.52072 10 7.25006 10Z" fill="#038C4C"/>
                                                                                        <path d="M7.25001 15.0002C3.78934 15.0002 0.966675 12.1802 0.966675 8.72015C0.966675 6.31015 2.37801 4.08015 4.56267 3.04015C4.80434 2.93015 5.09434 3.04015 5.20068 3.29015C5.30701 3.54015 5.20068 3.84015 4.95901 3.95015C3.11267 4.82015 1.92367 6.69015 1.92367 8.72015C1.92367 11.6302 4.31134 14.0002 7.24034 14.0002C10.1693 14.0002 12.557 11.6302 12.557 8.72015C12.557 6.70015 11.368 4.82015 9.52168 3.95015C9.40519 3.89559 9.31436 3.79549 9.26906 3.67179C9.22377 3.54809 9.2277 3.41086 9.28001 3.29015C9.38634 3.04015 9.67634 2.93015 9.91801 3.04015C12.1027 4.07015 13.514 6.30015 13.514 8.72015C13.514 12.1802 10.6913 15.0002 7.23067 15.0002H7.25001Z" fill="#038C4C"/>
                                                                                    </svg>

                                                                                    </span>
                                                                                    <span> Démarrer </span>
                                                                                </a>
                                                                            </li>

                                                                            <li className="border-b border-[#f0f0f0] last:border-b-0">
                                                                                <a onClick={() => openModal(project.projectId)} className="space-x-2 flex px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                    <span>
                                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M4.00004 12.6667C4.00004 13.4 4.60004 14 5.33337 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4.00004V12.6667ZM12.6667 2.66667H10.3334L9.66671 2H6.33337L5.66671 2.66667H3.33337V4H12.6667V2.66667Z" fill="#C62828"/>
                                                                                    </svg>
                                                                                    </span>
                                                                                    <span> Supprimer </span>
                                                                                </a>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap items-center text-center">
                                                        Aucun projet trouvé
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
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


                </div>

            </section>

            <ActionModal
                buttonColor="#D32F2F"
                actionMessage=" Êtes-vous sûr de vouloir supprimer ce projet ?"
                onDeleteMessage="OUI, SUPPRIMER"
                onCloseMessage="ANNULER"
                id={projectIdToDelete}
                onDelete={(id) => { handleDeleteProject(); }}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

        </>

    );
};

export default TableProject;
