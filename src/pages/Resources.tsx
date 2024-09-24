import React, { useEffect, useState } from 'react'
import SelectDepartment from '../components/Forms/SelectGroup/SelectDepartment';
import SelectAllUsers from '../components/Forms/SelectGroup/SelectAllUsers';
import { Department } from '../interfaces/Department';
import { ResponseRessource } from '../interfaces/Ressource';
import Accordion from '../components/Accordion/Accordion';
import { getAllProjects, getAllProjectsEndTaskByUserId } from '../services/ProjectService';
import SelectAllUsersByRessource from '../components/Forms/SelectGroup/SelectAllUsersByRessource';
import Skeleton from '../components/Skeleton/Skeleton';
import Loader from '../components/Skeleton/Loader';


export default function Resources() {


    const [departments, setDepartment] = useState("");
    const [nomUsers, setNomUsers] = useState("");
    const [state, setState] = useState("");
    // const [users, setUsers] = useState<number[]>([]);
    const [users, setUsers] = useState<number | null>(null);
    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ResponseRessource[]>([]);

    const fetchProjects = async (userId:number) => {
        setLoading(true);
        try {
            const response = await getAllProjectsEndTaskByUserId(userId);
            if (response && response.data) {
                setResponse(response.data);
            } else {
                setResponse([]);
            }

        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if(users){
            fetchProjects(users)
        }

        console.log(users);

    }, [departments,users]);


    return (

        <>
                <div className="mb-6 z-50 flex flex-col gap-y-4 rounded-xl bg-white p-10 dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
                
                    <div className="w-full xl:w-1/2 mb-5">
                        <label className="mb-3 block text-lg font-medium text-black dark:text-white">Départements {users}</label>
                        <SelectDepartment setDepartment={setDepartment} departments={dataDepartment} />
                    </div>

                    <div className="w-full xl:w-1/2 mb-5">
                        <label className="mb-3 block text-lg font-medium text-black dark:text-white">Membre {users}</label>

                        {/* <SelectAllUsers setUsers={setUsers} departementId={departments ? parseInt(departments) : undefined} /> */}
                        <SelectAllUsersByRessource setUser={setUsers} departementId={departments ? parseInt(departments) : undefined} setNomUser={setNomUsers} />
                    </div>

                </div>




                {response && response.length ? (

                    <>

                        {nomUsers.length > 0 && (
                            <div className='text-2xl text-black font-bold mb-5'>
                                <h1> {nomUsers} est assigné à {response.length} projets</h1>
                            </div>
                        )}

                        <Accordion project={response}/>

                    </>
                    ):


                    loading ? (
                        <Loader />

                    ):
                    <div className=" mt-10 bg-white mb-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <svg className='mt-5 mb-5' fill="#000000" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.4 488.4">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
                                </g>
                            </g>
                        </svg>
                    </div>

                    }
                
        </>

    )
}
