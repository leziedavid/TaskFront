import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectPriorite from '../../components/Forms/SelectGroup/SelectPriorite';
import SelectState from '../../components/Forms/SelectGroup/SelectState';

import SelectOneUsers from '../../components/Forms/SelectGroup/SelectOneUsers';
import SelectAllUsers from '../../components/Forms/SelectGroup/SelectAllUsers';
import QuillEditor from '../../components/QuillEditor';

import { BaseResponse } from '../../interfaces/ApiResponse';
import { Donnees } from '../../interfaces/Donnees';
import { Users } from '../../interfaces/Users';
import { UserState } from '../../interfaces/UserState';

import { differenceInDays, parseISO } from 'date-fns';
import Loading from '../../common/Loader/Loading';
import { SaveTask } from '../../services/TaskService';

const AddTask: React.FC = () => {

    const [libelle, setLibelle] = useState('');
    const [heurs, setHeurs] = useState(2);
    const [nbDay, setNbDay] = useState<string>('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [description, setDescription] = useState('');
    const [Priority, setPriority] = useState("");
    const [state, setState] = useState("EN_ATTENTE");
    const [Department, setDepartment] = useState("");
    const [User, setUsers] = useState('');
    const [userid, setUserid] = useState(localStorage.getItem('token'));
    const [projectId, setprojectId] = useState(useParams<{ id: string }>());
    const [Tablegenerate, setTablegenerate] = useState<Users[]>([]);
    const [DataGenerated, setDataGenerated] = useState<UserState>({usersId: [], leaderId: 0  });
    const [Load, SetLoad] = useState(false);
    const [titles, setTitles] = useState('');
    const [placeholder1, setPlaceholder1] = useState("Selectionnez la priorité");
    const [placeholder2, setPlaceholder2] = useState("Selectionnez le status");

    const [stateColor, SetStateColor] = useState("#2196F3");
    const [prioColor, SetPrioColor] = useState("#F27F1B");

    const [response, setResponse] = useState<BaseResponse<Donnees> | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleAddTask = () => {
        navigate(`/auth/detail/projet/${id}`);
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
        setState('EN_COURS');
        SetStateColor('#038C4C');
    };

    const handleNonClick = () => {
        setIsOuiSelected(false);
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
                navigate(`/auth/detail/projet/${id}`);
            } else if (response) {
                SetLoad(false);
                toast.error("Erreur lors de la connexion. Veuillez réessayer.");
            }
        }, [response, history,dateDebut, dateFin]);

        const AddData = async () => {
            try {
                if (!libelle) {
                    toast.error("Le nom du projet est requis.");
                    return;
                }

                if (!Priority) {
                    toast.error("La priorité est requise.");
                    return;
                }
                if (!state) {
                    toast.error("L'état du projet est requis.");
                    return;
                }
                if (!dateDebut) {
                    toast.error("La date de début est requise.");
                    return;
                }
                if (!dateFin) {
                    toast.error("La date de fin est requise.");
                    return;
                }
                if (!description) {
                    toast.error("La description est requise.");
                    return;
                }
                if (!heurs) {
                    toast.error("L'heurs du projet est requis.");
                    return;
                }
                if (!User) {
                    toast.error("L'Attribuer la tâche à un membre de l'équipe est requise.");
                    return;
                }

                SetLoad(true);

                const taskData = {
                    taskName: libelle,
                    taskNombreHeurs: heurs,
                    taskPriority: Priority,
                    taskStartDate: dateDebut,
                    taskEndDate: dateFin,
                    taskDescription: description,
                    taskState: state,
                    taskNombreJours: nbDay,
                    prioColor: prioColor,
                    stateColor: stateColor,
                    progress: '0',
                    assigned: User,
                    projectCodes: id, // Ajout de projectId ici
                    userId: "1"    // Ajout de userId ici
                };

                const apiResponse = await SaveTask(taskData);
                setResponse(apiResponse);
                SetLoad(false);

            } catch (error) {

                console.error('Erreur lors de l\'ajout du projet :', error);
                toast.error(`Erreur lors de l'ajout du projet :`);
                SetLoad(false);
            };
        };

    return (

        <>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="b-10 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className=" mb-10 col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="text-title-md2 font-semibold text-black dark:text-white"> Ajouter une tâche   </h3>
                        </div>

                        <div className="p-7">

                            <form>

                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white"> INFORMATION SUR LA TACHE </label>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="Username">Nom de la tâche <span className="text-red-700">  *</span></label>
                                    <input value={libelle} onChange={(event) => { setLibelle(event.target.value); }} className="w-full rounded-lg border border-stroke py-2 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="text" name="Libelet" placeholder="Saisir le nom du projet"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="Username">Priorité <span className="text-red-700">  *</span></label>
                                    <SelectPriorite  placeholder1={placeholder1} setPriority={setPriority} SetPrioColor={SetPrioColor} />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="Username">Status </label>
                                    <SelectState placeholder2={placeholder2} setState={setState}  defaultDisabled={true}  />
                                </div>
                                
                                <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Date de debut <span className="text-red-700"> *</span> </label>
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

                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Date de fin <span className="text-red-700">  *</span>  </label>
                                        <input className="w-full rounded border border-stroke  py-2 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black"
                                            type="date" placeholder="" value={dateFin} onChange={(e) => setDateFin(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {nbDay ? (
                                    <div className="mb-5">
                                        <p> La durée estimée de cette tâche est de {nbDay} Jours </p>
                                    </div>
                                        ) : (
                                    <div className="mb-5"> </div>
                                )}


                                <div className="mb-5">
                                <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Description <span className="text-red-700">  *</span>  </label>
                                    <QuillEditor value={description} onChange={setDescription} />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="Username">Nombre d'heures estimé pour cette tâche.<span className="text-red-700">  *</span></label>
                                    <input value={heurs} onChange={() => {setHeurs}} className="w-full rounded-lg border border-stroke py-2 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-black" type="number" name="Libelet" placeholder="Saisir le nom du projet"
                                    />
                                </div>

                                <label className="mb-4.5 block text-lg font-medium text-black dark:text-white">
                                    UTILISATEUR
                                </label>
                                    <div className="mb-5">
                                        <label className="mb-3 block text-lg font-medium text-black dark:text-white" htmlFor="fullName" > Attribuer la tâche à un membre de l'équipe <span className="text-red-700">  *</span>  </label>
                                        <SelectOneUsers setUsers={setUsers} />
                                    </div>
                                    

                                {Load ? (
                                    <Loading/>
                                    ) : (
                                        <div className="mb-10 flex justify-end gap-4.5">
                                            <button className="flex justify-center rounded-lg border border-[#012340] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" onClick={handleAddTask}  type="button" >ANNULER</button>
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

export default AddTask;
