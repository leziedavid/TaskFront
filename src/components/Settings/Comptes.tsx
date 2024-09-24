import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getAllUsersService, updateUsersRoles } from '../../services/UsersService';
import ToggleSwitch from '../ToggleSwitch';
import { User } from '../../interfaces/Global';
import { Link } from 'react-router-dom';
import ActionModal from '../Modal/ActionModal';
import AddLeaveModal from '../Modal/AddLeaveModal';

const Comptes: React.FC = () => {


    const [response, setResponse] = useState<User[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [isModalOpenleave, setIsModalOpenleave] = useState(false);
    const [userId, setUserId] = useState(Number);
    const [leaveId, setleaveId] = useState(Number);
    const [leaveMessage, setleaveMessage] = useState('');
    const [onDeleteMessage, setOnDeleteMessage] = useState('');
    const [isdisabled, setIsdisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const closeModalleave = () => {
        setIsModalOpenleave(false);
        setUserId(0);
        setleaveId(0);
    };

    const openModalleave = () => {

        setIsModalOpenleave(true);
        setleaveMessage("Formulaire de Congés");
        setOnDeleteMessage('VALIDER');
    };

    const openModalleaveEdit = (userIds: number | null,leaveIds: number | null) => {

        setIsdisabled(false);
        setIsShow(false);
        setUserId(userIds!);
        setleaveId(leaveIds!);
        setIsModalOpenleave(true);

        if(leaveIds){
            setleaveMessage("Detail du congés");
            setIsShow(true);
        }else{
            setleaveMessage("Formulaire de congés");
        }

        setOnDeleteMessage('MODIFIER');
    };
    
    const fetchAllUser = async () => {

        try {

            const token = localStorage.getItem('token');

            if (token) {

                const response = await getAllUsersService();
                setResponse(response.data);

            } else {
                toast.error("Token introuvable dans le localStorage.");
            }

            } catch (error) {

                console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                toast.error("Erreur lors de la récupération de l'utilisateur.");

            }
    };

    useEffect(() => {
        fetchAllUser();
    }, []);

    const handleCheckboxChange = async (userId: number, currentValue: number) => {
        const newValue = currentValue === 0 ? 1 : 0;
    
        // Appeler votre fonction pour mettre à jour l'utilisateur
        const res = await updateUsersRoles(userId, newValue);
    
        if (res.code === 200) {
            // Afficher un message de succès
            toast.success(res.messages);
            // Mettre à jour l'état des utilisateurs
            setResponse(prev =>
                prev ? prev.map(user =>
                    user.userId === userId ? { ...user, isValid: newValue } : user
                ) : null
            );
        } else {
            // Gérer les erreurs de mise à jour si nécessaire
            toast.error("Une erreur est survenue.");
        }
    };


    const openModal = (id: number) => {
        setUserId(id);
        setIsModalOpen(true);
        setModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalOpen(false);
    };

    const handleDeleteUser = async (id:number | null) => {
        console.log(`Deleting project with ID: ${id}`);
        try {
            if (id){

                const apiResponse = await deleteUser(id);
                setResponse(apiResponse);

                if (apiResponse && apiResponse.code === 200) {
                    toast.success("compte supprimé avec succès !");
                    fetchAllUser();

                } else {
                    toast.error("Erreur lors de la suppression du compte. Veuillez réessayer.");
                }
            }

        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
            toast.error("Erreur lors de la connexion. Veuillez réessayer.");
        }
        closeModal();
    };

    return (

        <>
            <ToastContainer position="top-right" autoClose={5000} />

            <div className="border bg-white border-white dark:border-gray-700  mb-8">
                <div className="flex-grow flex items-end justify-end p-2">
                    <Link to={`/auth/Admin/Users/comptes`}
                    className="rounded-xl border text-nowrap flex items-center gap-2 bg-[#012340] py-2 px-4.5 font-medium text-white hover:bg-opacity-90" >
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""></path>
                    </svg>
                    AJOUTER UN UTILISATEUR
                    </Link>
                </div>
            </div>

            <section className="container px-8 mx-auto bg-white">

                <div className=" bg-white p-3">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-white dark:border-gray-700 mb-8">
                                    
                                {/* divide-y */}
                                    <table className="shadow-lg min-w-full  border border-gray-900">
                                        
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="px-5 py text-sm font-normal text-left rtl:text-left text-gray-500 dark:text-gray-400">ID</th>
                                                <th scope="col" className="px-5 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Noms</th>
                                                <th scope="col" className="px-5 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Département</th>
                                                <th scope="col" className="px-5 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Fonctions</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">E-mail</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Contacts</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Disponibilité</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Rôles</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                                <th scope="col" className="px-4 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className=" mb-5 bg-white divide-gray-10 dark:divide-gray-700 dark:bg-gray-900">

                                            {response && response.length > 0 ? (

                                                response.map((user, index) => (

                                                    <tr key={user.userId}>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{user.userId}</div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{user.firstname} {user.lastname} </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">
                                                                {user.departments.length > 0 ? (
                                                                    user.departments.map(department => (
                                                                        <div key={department.departmentId} className="text-gray-700 whitespace-nowrap">
                                                                            {department.departmentName}
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    'Aucun département'
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{user.fonction} </div>
                                                        </td>
                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{user.email} </div>
                                                        </td>
                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">{user.phone} </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">

                                                                {user.leaves.length> 0 ? (
                                                                    <div onClick={() => openModalleaveEdit(user.userId,user.leaves[0].leaveId)}  className=" px-2.5 py-0.5  rounded-full text-white nline-flex items-center bg-red-700 gap-x-3">Indisponible</div>
                                                                ) : (
                                                                    <div className=" px-2.5 py-0.5  rounded-full text-white inline-flex items-center bg-green-700 gap-x-3">Disponible</div>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">

                                                            <span className={`text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${
                                                                user.role === 'ADMIN' ? 'bg-[#D32F2F]' : // Red
                                                                user.role === 'GLOBAL_ADMIN' ? 'bg-[#F57C00]' : // Blue
                                                                user.role === 'USER' ? 'bg-[#033F73]' : // Green
                                                                user.role === 'MANAGER' ? 'bg-[#038C4C]' : // Orange
                                                                'bg-gray-500' // Default gray for unknown roles
                                                            }`}>
                                                                {user.role}
                                                            </span>
                                                            
                                                            </div>

                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <ToggleSwitch isChecked={user.isValid === 1}   onChange={() => handleCheckboxChange(user.userId, user.isValid)}  />
                                                            </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">

                                                            <Link to={`/auth/Admin/Users/update/${user.userId}`}   className="focus:outline-none" aria-label="Icon 1">
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.49878 17.7505V21.5005H7.24878L18.3088 10.4405L14.5588 6.69055L3.49878 17.7505ZM21.2088 7.54055C21.5988 7.15055 21.5988 6.52055 21.2088 6.13055L18.8688 3.79055C18.4788 3.40055 17.8488 3.40055 17.4588 3.79055L15.6288 5.62055L19.3788 9.37055L21.2088 7.54055Z" fill="#003D63" />
                                                                </svg>
                                                            </Link>

                                                            <button onClick={() => openModal(user.userId)} className="focus:outline-none" aria-label="Icon 2">
                                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.5 16.5C1.5 17.6 2.4 18.5 3.5 18.5H11.5C12.6 18.5 13.5 17.6 13.5 16.5V4.5H1.5V16.5ZM14.5 1.5H11L10 0.5H5L4 1.5H0.5V3.5H14.5V1.5Z" fill="#C62828" />
                                                                </svg>
                                                            </button>

                                                            <button onClick={() => openModalleaveEdit(user.userId,0)}  className="focus:outline-none" aria-label="Icon 3" >
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.5 9.5C11.7044 9.5 10.9413 9.81607 10.3787 10.3787C9.81607 10.9413 9.5 11.7044 9.5 12.5C9.5 13.2956 9.81607 14.0587 10.3787 14.6213C10.9413 15.1839 11.7044 15.5 12.5 15.5C13.2956 15.5 14.0587 15.1839 14.6213 14.6213C15.1839 14.0587 15.5 13.2956 15.5 12.5C15.5 11.7044 15.1839 10.9413 14.6213 10.3787C14.0587 9.81607 13.2956 9.5 12.5 9.5ZM12.5 17.5C11.1739 17.5 9.90215 16.9732 8.96447 16.0355C8.02678 15.0979 7.5 13.8261 7.5 12.5C7.5 11.1739 8.02678 9.90215 8.96447 8.96447C9.90215 8.02678 11.1739 7.5 12.5 7.5C13.8261 7.5 15.0979 8.02678 16.0355 8.96447C16.9732 9.90215 17.5 11.1739 17.5 12.5C17.5 13.8261 16.9732 15.0979 16.0355 16.0355C15.0979 16.9732 13.8261 17.5 12.5 17.5ZM12.5 5C7.5 5 3.23 8.11 1.5 12.5C3.23 16.89 7.5 20 12.5 20C17.5 20 21.77 16.89 23.5 12.5C21.77 8.11 17.5 5 12.5 5Z" fill="black" />
                                                                </svg>
                                                            </button>

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



            <AddLeaveModal
                userId={userId}
                leaveId={leaveId}
                isdisabled={isdisabled}
                isShow={isShow}
                buttonColor="#D32F2F"
                leaveMessage={leaveMessage}
                onDeleteMessage={onDeleteMessage} // Texte du bouton de suppression
                onCloseMessage="ANNULER" // Texte du bouton d'annulation
                idModale="static-modal" // ID du modal (peut être utilisé pour les tests d'automatisation ou de styles CSS spécifiques)
                fetchAllUser={fetchAllUser} // Fonction appelée lors de la suppression
                isOpen={isModalOpenleave} // État d'ouverture du modal
                onClose={closeModalleave} // Fonction de fermeture du modal
                />

            <ActionModal
                buttonColor="#D32F2F"
                actionMessage=" Êtes-vous sûr de vouloir supprimer ce compte ?"
                onDeleteMessage="OUI, SUPPRIMER"
                onCloseMessage="ANNULER"
                id={userId}
                onDelete={() => { handleDeleteUser(userId); }}
                isOpen={isModalOpen}
                onClose={closeModal}
            />




        </>

    );
};

export default Comptes;
