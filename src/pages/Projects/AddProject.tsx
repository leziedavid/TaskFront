import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from '../../components/FileUpload';
import QuillEditor from '../../components/QuillEditor';
import TableUsersSelecte from '../../components/Tables/TableUsersSelecte';

import { BaseResponse } from '../../interfaces/ApiResponse';
import { Donnees } from '../../interfaces/Donnees';
import { FileObject } from '../../interfaces/FileObject';
import { Users } from '../../interfaces/Users';
import { UserState } from '../../interfaces/UserState';

import { differenceInDays, parseISO } from 'date-fns';
import Loading from '../../common/Loader/Loading';
import { SaveProject } from '../../services/ProjectService';

import { getUserIdFromToken } from '../../services/ApiService';
import { Department } from '../../interfaces/Department';
import SelectMultipleDepartment from '../../components/Forms/SelectGroup/SelectMultipleDepartment';
import SelectUsersFilter from '../../components/Forms/SelectGroup/SelectUsersFilter';
import SelectPriorite2 from '../../components/Forms/SelectGroup/SelectPriorite2';
import SelectState2 from '../../components/Forms/SelectGroup/SelectState2';

const AddProject: React.FC = () => {


    const today = new Date().toISOString().split('T')[0];

    const [msg, setMsg] = useState('');
    const [libelle, setLibelle] = useState('');
    const [nbDay, setNbDay] = useState<string>('');
    const [dateDebut, setDateDebut] = useState(today);
    const [dateFin, setDateFin] = useState(today);
    const [description, setDescription] = useState('');
    const [Priority, setPriority] = useState("");
    const [state, setState] = useState("EN_ATTENTE");
    const [Departments, setDepartment]  = useState<string[]>([]);
    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [Users, setUsers] =  useState<string[]>([]);
    
    const [userid, setUserid] = useState(localStorage.getItem('token'));
    const [Tablegenerate, setTablegenerate] = useState<Users[]>([]);
    const [DataGenerated, setDataGenerated] = useState<UserState>({usersId: [], leaderId: 0  });
    const [Load, SetLoad] = useState(false);
    const [titles, setTitles] = useState('');
    const [placeholder1, setPlaceholder1] = useState("Selectionnez la priorité");
    const [placeholder2, setPlaceholder2] = useState("Selectionnez le status");

    const [demarrer, setDemarrer] = useState("EN_ATTENTE");
    const [stateColor, SetStateColor] = useState("#2196F3");

    const [prioColor, SetPrioColor] = useState("#F27F1B");

    const [file, setFile] = useState<File | null>(null);
    
    const [fileObjects, setFileObjects] = useState<FileObject[]>([{ title: '', file: null }]);

    const [response, setResponse] = useState<BaseResponse<Donnees> | null>(null);
    const navigate = useNavigate();
    
    const handleAddProject = () => {
        navigate('/auth/Admin/projets');
    };

    const calculateDaysDifference = (date1: string, date2: string): string => {
        const parsedDate1 = parseISO(date1);
        const parsedDate2 = parseISO(date2);
        const daysDifference = differenceInDays(parsedDate2, parsedDate1)+1;
        return daysDifference.toString();
    };

    const [isOuiSelected, setIsOuiSelected] = useState(false);

    const handleOuiClick = () => {
        setIsOuiSelected(true);
        setDemarrer('EN_COURS');
        setState('EN_COURS');
        SetStateColor('#038C4C');
    };

    const handleNonClick = () => {
        setIsOuiSelected(false);
        setDemarrer('EN_ATTENTE');
        setState('EN_ATTENTE');
        SetStateColor('#2196F3');
    };

    // Utilisation de useState pour stocker l'ID de l'utilisateur
    const [userId, setUserId] = useState<number | null>(null);
    // Appel du service pour récupérer l'ID de l'utilisateur à partir du token
    const fetchUserId = async () => {

                try {
                    
                    const token = localStorage.getItem('token');
                    if (token) {
                        const response = await getUserIdFromToken(token);
    
                        if (response.code === 200 && response.data) {
    
                            setUserId(response.data);
                        } else {
    
                            toast.error("Erreur lors de la récupération de l'ID utilisateur.");
                        }
                    } else {
    
                        toast.error("Token introuvable dans le localStorage.");
                    }
                } catch (error) {
    
                    console.error('Erreur lors de la récupération de l\'ID utilisateur :', error);
                    toast.error("Erreur lors de la récupération de l'ID utilisateur.");
                    
                }
            };

    useEffect(() => {
        fetchUserId(); // Appel de la fonction au montage du composant
    }, []); // Le tableau vide [] assure que useEffect ne se déclenche qu'une fois, équivalent à componentDidMount


    useEffect(() => {
            // Calculer le nombre de jours si les dates de début et de fin sont définies
            if (dateDebut && dateFin) {
                const daysDifferenceString = calculateDaysDifference(dateDebut, dateFin);
                const daysDifference = Number(daysDifferenceString); // Convertir en nombre
        
                // Vérifier si daysDifference est négatif
                if (daysDifference < 0) {
                    
                    const daysDifferenceStr = daysDifference.toString();
                    setNbDay(daysDifferenceStr);
                    setMsg("La différence de jours est négative. Veuillez vérifier vos dates.");
                } else {
                    // Convertir en chaîne et mettre à jour le nombre de jours
                    setMsg("");
                    const daysDifferenceStr = daysDifference.toString();
                    setNbDay(daysDifferenceStr);
                }
            }

            if (response && response.data && response.code === 201) {
                
                SetLoad(false);
                toast.success("Projet créé avec succès !");
                // Ajouter un délai de 3 secondes avant la redirection
                setTimeout(() => {
                    navigate('/auth/Admin/projets');
                }, 3000); // Délai de 3000 millisecondes (3 secondes)

            } else if (response) {
                
                SetLoad(false);
                toast.error("Erreur lors de la création du projet. Veuillez réessayer.");
            }
    }, [response, history,dateDebut, dateFin]);

    const AddData = async () => {

            SetLoad(true);

            if (!libelle) {
                SetLoad(false);
                toast.error("Le nom du projet est requis.");
                return;
            }
            
            if (!Priority) {
                SetLoad(false);
                toast.error("La priorité est requise.");
                return;
            }
            
                        
            if (!state) {
                SetLoad(false);
                toast.error("L'état du projet est requis.");
                return;
            }

            if (!dateDebut) {
                SetLoad(false);
                toast.error("La date de début est requise.");
                return;
            }
            
            if (!dateFin) {
                SetLoad(false);
                toast.error("La date de fin est requise.");
                return;
            }
            
            if (!description) {
                SetLoad(false);
                toast.error("La description est requise.");
                return;
            }

            
            if (!DataGenerated) {
                SetLoad(false);
                toast.error("La liste de l'equipe du projet est requise.");
                return;
            }

            const formData = new FormData();
            formData.append('projectName', libelle);
            formData.append('projectPriority', Priority);
            formData.append('projectStartDate', dateDebut);
            formData.append('projectEndDate', dateFin);
            formData.append('projectDescription', description);
            if(demarrer){
                formData.append('projectState', demarrer);
            }else{
                formData.append('projectState', state);
            }
            formData.append('projectNombreJours', nbDay);
            formData.append('prioColor', prioColor);
            formData.append('stateColor', stateColor);
            formData.append('progress', '0');
            formData.append('users', JSON.stringify(DataGenerated));
            formData.append('userId', userId!.toString());
            
            if (fileObjects && fileObjects.length > 0) {

                formData.append('nbfiles', String(fileObjects.length));
                fileObjects.forEach((fileObject, index) => {

                    if (fileObject.file) {
                        formData.append(`fichiers${index + 1}`, fileObject.file);
                        formData.append(`title${index + 1}`, fileObject.title);
                    }
                });
            }
        
            try {

                const apiResponse = await SaveProject(formData);
                setResponse(apiResponse);

            } catch (error) {
                SetLoad(false);
                console.error('Erreur lors de l\'ajout du projet :', error);
            }
    };

    return (

        <>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className=" mb-10 col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="text-title-md2 font-semibold text-black dark:text-white">
                                Ajouter un projet
                            </h3>
                        </div>

                        <div className="p-7">

                            <form>

                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white"> INFORMATION SUR LE PROJET</label>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="Username"> Nom du projet  <span className="text-red-700"> * </span> </label>
                                    <input value={libelle} onChange={(event) => { setLibelle(event.target.value); }} className="w-full rounded-lg border border-stroke py-2 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="Saisir le nom du projet"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Priorité <span className="text-red-700"> * </span> </label>
                                    <SelectPriorite2  placeholder1={placeholder1} setPriority={setPriority} SetPrioColor={SetPrioColor} priorityValue={Priority} />
                                </div>

                                <div className="mb-5">
                                <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Status <span className="text-red-700"> * </span> </label>
                                    <SelectState2 placeholder2={placeholder2} setState={setState} defaultDisabled={false} stateValue={state}  />
                                </div>
                                
                                <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Date de debut <span className="text-red-700"> * </span> </label>
                                        <div className="relative">
                                        {/* datetime-local */}
                                            <input className="w-full rounded border  border-stroke  py-2 pl-11.5 pr-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black"
                                                type="datetime-local"
                                                placeholder=""
                                                value={dateDebut}
                                                onChange={(e) => setDateDebut(e.target.value)}
                                                // required
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/2">

                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Date de fin <span className="text-red-700"> * </span> </label>
                                        <input
                                            className="w-full rounded border border-stroke  py-2 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black"
                                            type="datetime-local"
                                            placeholder=""
                                            value={dateFin}
                                            onChange={(e) => setDateFin(e.target.value)}
                                            // required
                                        />
                                    </div>
                                </div>

                                {nbDay ? (
                                    <div className="mb-5">
                                        <p> La durée estimée de ce projet est de {nbDay} Jours </p>
                                        <span className="text-red-800"> {msg}</span>
                                    </div>
                                        ) : (
                                    <div className="mb-5"> </div>
                                )}


                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Description <span className="text-red-700"> * </span> </label>
                                    <QuillEditor value={description} onChange={setDescription} />
                                </div>

                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white">
                                    INFORMATION SUR LE DEPARTEMENT
                                </label>

                                <div className="mb-10">
                                <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Departement <span className="text-red-700"> * </span> </label>
                                    <SelectMultipleDepartment setDepartment={setDepartment} departments={dataDepartment} />
                                </div>
                                
                                    {Departments.length >0 ? (
                                        <div className="mb-5">
                                            <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Assigner à des utilisateurs  <span className="text-red-700"> * </span>  </label>
                                            <SelectUsersFilter setUsers={setUsers} Departments={Departments} setTablegenerate={setTablegenerate} setDataGenerated={setDataGenerated} />
                                        </div>
                                        ): (
                                        <div className=""> </div>
                                    )}
                                
                                    {setTablegenerate.length > 0 && <TableUsersSelecte setTablegenerate={setTablegenerate}  Tablegenerate={Tablegenerate} setDataGenerated={setDataGenerated} />}


                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white"> FICHIERS </label>
                                <div className="mb-5">
                                    <FileUpload
                                        titles={titles}
                                        setTitles={setTitles}
                                        file={file}
                                        setFile={setFile}
                                        fileObjects={fileObjects}
                                        setFileObjects={setFileObjects}
                                    />
                                </div>

                                {/* <label className="flex justify-end mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" >Voulez-vous démarrer ce projet ?  </label>
                                <div className="flex justify-end items-center">
                                    <div className="mt-5 mb-5.5 flex items-center">
                                        <label htmlFor="ouiCheckbox" className="flex cursor-pointer">
                                            <div className="relative pt-0.5">
                                                <input
                                                    type="checkbox"
                                                    id="ouiCheckbox"
                                                    className="taskCheckbox sr-only"
                                                    checked={isOuiSelected}
                                                    onChange={handleOuiClick}
                                                />
                                                <div className={`box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark ${isOuiSelected ? 'bg-[#03233F]' : 'bg-white'}`}>
                                                    <span className={`text-white ${isOuiSelected ? 'opacity-100' : 'opacity-0'}`}>
                                                        <svg className="fill-current" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z" fill=""></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                            <p>OUI</p>
                                        </label>
                                    </div>

                                    <div className="mt-5 mb-5.5 flex items-center ml-5">
                                        <label htmlFor="nonCheckbox" className="flex cursor-pointer">
                                            <div className="relative pt-0.5">
                                                <input
                                                    type="checkbox"
                                                    id="nonCheckbox"
                                                    className="taskCheckbox sr-only"
                                                    checked={!isOuiSelected}
                                                    onChange={handleNonClick}
                                                />
                                                <div className={`box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark ${!isOuiSelected ? 'bg-[#03233F]' : 'bg-white'}`}>
                                                    <span className={`text-white ${!isOuiSelected ? 'opacity-100' : 'opacity-0'}`}>
                                                        <svg className="fill-current" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z" fill=""></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                            <p>NON</p>
                                        </label>
                                    </div>
                                </div> */}

                                {Load ? (
                                    <Loading/>
                                    ) : (
                                        <div className="flex justify-end gap-4.5">
                                            <button className="flex justify-center rounded-lg border border-[#012340] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" onClick={handleAddProject}  type="button" >ANNULER</button>
                                            <button className="flex justify-center rounded-lg bg-[#012340] py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="button" onClick={AddData} >
                                                AJOUTER
                                            </button>
                                        </div>
                                    )}

                            </form>

                        </div>

                    </div>
                </div>
            </div>
            
        </>
    );

};

export default AddProject;
