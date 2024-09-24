import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import 'react-toastify/dist/ReactToastify.css';
import UserTwo from '../../images/user/user-02.png';
import { NotificationDTO } from '../../interfaces/Notification';
import { getUnreadNotifications } from '../../services/NotifService';


const DropdownMessage = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [response, setResponse] = useState<NotificationDTO[] | null>(null);
  const { id } = useParams<{ id: string }>();


  const extractHour = (isoString: string): string => {
    // Créez un objet Date à partir de la chaîne ISO
    const date = new Date(isoString);
    
    // Obtenez l'heure et les minutes en format 24h
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    // Retournez l'heure au format HH:mm
    return `${hours}:${minutes}`;
};

  const getNotifications = async () => {
    try {
      const resp = await getUnreadNotifications();
            setResponse(resp.data)

    } catch (error) {

      console.error('Erreur lors de la récupération du message :', error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (

    <>

        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
          
          <li className="relative">
            <Link  onClick={() => { setNotifying(false); setDropdownOpen(!dropdownOpen);}} className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white" to="#">
              <span className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
                  notifying === false ? 'hidden' : 'inline' }`}>
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
              </span>

              <svg width="18" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5709 21.0781H2.09433C1.01377 21.0781 0.134766 20.1991 0.134766 19.1186C0.134766 18.5451 0.384504 18.0021 0.820009 17.6291C0.8481 17.6045 0.87824 17.5822 0.909612 17.5619C2.55342 16.1274 3.49414 14.0637 3.49414 11.8845V8.76035C3.49414 4.43811 7.0114 0.921875 11.3326 0.921875C11.5118 0.921875 11.7056 0.925156 11.8848 0.955502C12.3426 1.03157 12.6518 1.46503 12.5756 1.92185C12.4995 2.37868 12.0582 2.68788 11.6092 2.61161C11.5196 2.59705 11.4212 2.60156 11.3326 2.60156C7.93756 2.60156 5.17383 5.36407 5.17383 8.76035V11.8845C5.17383 14.59 3.98788 17.15 1.92312 18.9068C1.90631 18.9203 1.89175 18.9326 1.87371 18.9449C1.84357 18.983 1.81445 19.0413 1.81445 19.1186C1.81445 19.2707 1.94219 19.3984 2.09433 19.3984H20.5709C20.7232 19.3984 20.851 19.2707 20.851 19.1186C20.851 19.04 20.8219 18.983 20.7905 18.9449C20.7737 18.9326 20.7591 18.9203 20.7423 18.9068C18.6763 17.1487 17.4916 14.59 17.4916 11.8845V10.6641C17.4916 10.2005 17.8679 9.8243 18.3314 9.8243C18.795 9.8243 19.1713 10.2005 19.1713 10.6641V11.8845C19.1713 14.0649 20.113 16.1297 21.7591 17.5654C21.7892 17.5855 21.8184 17.6068 21.8452 17.6304C22.2809 18.0021 22.5307 18.5451 22.5307 19.1186C22.5307 20.1991 21.6517 21.0781 20.5709 21.0781Z" fill="black" fill-opacity="0.87"/>
            </svg>

            </Link>


            {dropdownOpen && (
              
              <div className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}>
                <div className="px-4.5 py-3">
                  <h5 className="font-medium text-2xl  text-bodydark2">Notification er</h5>
                </div>

                  <ul className="flex h-auto flex-col overflow-y-auto">

                  {response && response.length > 0 ? (
                        response.map((item, index) => (

                            <li>
                              <Link  onClick={() => { setNotifying(false); setDropdownOpen(!dropdownOpen);}} to={`/auth/Admin/liste/messages/${item.notificationId}`}  className="flex gap-4.5  border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                                <div className="h-12.5 w-12.5 rounded-full">
                                  <img src={UserTwo} alt="User" />
                                </div>

                                <div>
                                  <h6 className="text-sm font-medium text-black dark:text-white">
                                    {item.userAddBBy[0].firstname}  {item.userAddBBy[0].lastname}
                                  </h6>
                                  <p className="text-sm">{item.title}💪</p>
                                  <p className="text-xs"> { extractHour(item.createdAt)} min par {item.userAddBBy[0].firstname}  {item.userAddBBy[0].lastname}</p>
                                </div>
                              </Link>
                            </li>
                        ))

                    ) : (
                      <tr>
                        <td className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap items-center text-center">
                          Aucun projet trouvé
                        </td>
                      </tr>
                )}

                  </ul>
                
              </div>
            )}

          </li>
        </ClickOutside>


    </>

  );
  
};

export default DropdownMessage;
