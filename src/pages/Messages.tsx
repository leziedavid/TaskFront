import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import UserOne from '../images/user/user-01.png';
import { NotificationDTO } from '../interfaces/Notification';
import { getNotificationsById, getUnreadNotifications } from '../services/NotifService';


export default function Messages() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);
    const [response, setResponse] = useState<NotificationDTO[] | null>(null);
    const { id } = useParams<{ id: string }>();

    const extractHour = (isoString: string): string => {
        const date = new Date(isoString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const getNotifications = async () => {
        try {
            const resp = await getNotificationsById(id!);
            setResponse(resp.data)

        } catch (error) {

            console.error('Erreur lors de la récupération du message :', error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [id!]);

    
    return (

    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

    <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            <div className="flex max-h-full flex-col overflow-auto p-5">
            <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">

                <div className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">

                <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                    <img src={UserOne}  alt="profile" className="h-full w-full object-cover object-center" />
                </div>

                <div className="w-full">
                    <h5 className="text-sm font-medium text-black dark:text-white">Henry Dholi</h5>
                    <p className="text-sm">I came across your profile and...</p>
                </div>

                </div>

            </div>
            </div>
        </div>

        <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">

            <div className="flex h-full flex-col p-6">

                <div className="mb-6 flex flex-col gap-5 overflow-y-auto">
                    <div className="flex flex-col items-start">
                    <div className="relative h-11 w-full max-w-11 rounded-full">
                        <img src={UserOne}   alt="profile" className="h-full w-full object-cover object-center" />
                    </div>
                    <p className="text-sm">I came across your profile and...</p>

                    <div className="mt-2 rounded-lg bg-gray-2 px-5 py-3 text-sm text-black dark:bg-boxdark-2 dark:text-white">
                        Hi! I saw your post and would like to know more.
                    </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </div>
    
    </div>


    )
}
