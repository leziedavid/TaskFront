import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsersService } from '../../services/UsersService';
import { User } from '../../interfaces/Global';
import { Link } from 'react-router-dom';

const Groupe: React.FC = () => {


    const [userId, setUserId] = useState<number | null>(null);
    const [response, setResponse] = useState<User[] | null>(null);


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
                    AJOUTER UN GROUPE
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
                                                <th scope="col" className="px-5 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Groupe</th>
                                                <th scope="col" className="px-5 py_5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Nombre d'utilisateur</th>
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
                                                            <div className="inline-flex items-center gap-x-3">CRUD-USERS </div>
                                                        </td>

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">Crée projet </div>
                                                        </td>
            

                                                        <td className={`px-4 py-4 text-sm font-medium ${index % 2 === 0 ? 'bg-[#EBF1FA]' : 'bg-white'} text-gray-700 whitespace-nowrap`}>
                                                            <div className="inline-flex items-center gap-x-3">


                                                            <button  className="focus:outline-none" aria-label="Icon 1">
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.49878 17.7505V21.5005H7.24878L18.3088 10.4405L14.5588 6.69055L3.49878 17.7505ZM21.2088 7.54055C21.5988 7.15055 21.5988 6.52055 21.2088 6.13055L18.8688 3.79055C18.4788 3.40055 17.8488 3.40055 17.4588 3.79055L15.6288 5.62055L19.3788 9.37055L21.2088 7.54055Z" fill="#003D63" />
                                                                </svg>
                                                            </button>
                                                            <button className="focus:outline-none" aria-label="Icon 2">
                                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.5 16.5C1.5 17.6 2.4 18.5 3.5 18.5H11.5C12.6 18.5 13.5 17.6 13.5 16.5V4.5H1.5V16.5ZM14.5 1.5H11L10 0.5H5L4 1.5H0.5V3.5H14.5V1.5Z" fill="#C62828" />
                                                                </svg>
                                                            </button>
                                                            {/* <button className="focus:outline-none" aria-label="Icon 3" >
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.5 9.5C11.7044 9.5 10.9413 9.81607 10.3787 10.3787C9.81607 10.9413 9.5 11.7044 9.5 12.5C9.5 13.2956 9.81607 14.0587 10.3787 14.6213C10.9413 15.1839 11.7044 15.5 12.5 15.5C13.2956 15.5 14.0587 15.1839 14.6213 14.6213C15.1839 14.0587 15.5 13.2956 15.5 12.5C15.5 11.7044 15.1839 10.9413 14.6213 10.3787C14.0587 9.81607 13.2956 9.5 12.5 9.5ZM12.5 17.5C11.1739 17.5 9.90215 16.9732 8.96447 16.0355C8.02678 15.0979 7.5 13.8261 7.5 12.5C7.5 11.1739 8.02678 9.90215 8.96447 8.96447C9.90215 8.02678 11.1739 7.5 12.5 7.5C13.8261 7.5 15.0979 8.02678 16.0355 8.96447C16.9732 9.90215 17.5 11.1739 17.5 12.5C17.5 13.8261 16.9732 15.0979 16.0355 16.0355C15.0979 16.9732 13.8261 17.5 12.5 17.5ZM12.5 5C7.5 5 3.23 8.11 1.5 12.5C3.23 16.89 7.5 20 12.5 20C17.5 20 21.77 16.89 23.5 12.5C21.77 8.11 17.5 5 12.5 5Z" fill="black" />
                                                                </svg>
                                                            </button> */}


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

            {/* <ActionModal
                buttonColor="#D32F2F"
                actionMessage=" Êtes-vous sûr de vouloir supprimer ce projet ?"
                onDeleteMessage="OUI, SUPPRIMER"
                onCloseMessage="ANNULER"
                id={projectIdToDelete}
                onDelete={(id) => { handleDeleteProject(); }}
                isOpen={isModalOpen}
                onClose={closeModal}
            /> */}

        </>

    );
};

export default Groupe;
