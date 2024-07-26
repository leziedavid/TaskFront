import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from '../../components/FileUpload';
import SelectDepartment from '../../components/Forms/SelectGroup/SelectDepartment';
import SelectPriorite from '../../components/Forms/SelectGroup/SelectPriorite';
import SelectState from '../../components/Forms/SelectGroup/SelectState';
import SelectUsers from '../../components/Forms/SelectGroup/SelectUsers';
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


const AddProject: React.FC = () => {

    const [libelle, setLibelle] = useState('');
    const [nbDay, setNbDay] = useState<string>('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [description, setDescription] = useState('');
    const [Priority, setPriority] = useState("");
    const [state, setState] = useState("EN_ATTENTE");
    const [Department, setDepartment] = useState("");
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
        navigate('/auth/projets');
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

    useEffect(() => {

            // Calculer le nombre de jours si les dates de début et de fin sont définies
            if (dateDebut && dateFin) {
                const daysDifference = calculateDaysDifference(dateDebut, dateFin);
                setNbDay(daysDifference);
            }

            if (response && response.data && response.code === 201) {

                SetLoad(false);
                toast.success("Connexion réussie !");
                navigate('/auth/projets');

            } else if (response) {
                
                SetLoad(false);
                toast.error("Erreur lors de la connexion. Veuillez réessayer.");
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

            if (userid !== null) {
                formData.append('userId', "1");
            }

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
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="Username"> Nom du projet {Department} </label>
                                    <input value={libelle} onChange={(event) => { setLibelle(event.target.value); }} className="w-full rounded-lg border border-stroke py-2 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="Saisir le nom du projet"
                                    />
                                </div>

                                <div className="mb-5">
                                    <SelectPriorite  placeholder1={placeholder1} setPriority={setPriority} SetPrioColor={SetPrioColor} priorityValue={Priority} />
                                </div>

                                <div className="mb-5">
                                    <SelectState placeholder2={placeholder2} setState={setState} defaultDisabled={false} stateValue={state}  />
                                </div>
                                
                                <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName" > Date de debut</label>
                                        <div className="relative">
                                        {/* datetime-local */}
                                            <input className="w-full rounded border  border-stroke  py-2 pl-11.5 pr-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black"
                                                type="date"
                                                placeholder=""
                                                value={dateDebut}
                                                onChange={(e) => setDateDebut(e.target.value)}
                                                // required
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/2">

                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName" > Date de fin</label>

                                        <input
                                            className="w-full rounded border border-stroke  py-2 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black"
                                            type="date"
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
                                    </div>
                                        ) : (
                                    <div className="mb-5"> </div>
                                )}


                                <div className="mb-5">
                                    <QuillEditor value={description} onChange={setDescription} />
                                </div>

                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white">
                                    INFORMATION SUR LE DEPARTEMENT
                                </label>

                                <div className="mb-10">
                                    <SelectDepartment setDepartment={setDepartment} />
                                </div>
                                
                                    {Department ? (
                                        <div className="mb-5">
                                            <SelectUsers setUsers={setUsers} Department={Department} setTablegenerate={setTablegenerate}
                                                setDataGenerated={setDataGenerated} />
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
                                </div>

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
