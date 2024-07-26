import React, { useState } from 'react';
import UserOne from '../../images/user/user-01.png';
import { Users } from '../../interfaces/Users';


interface TableUsersSelecteProps {
  Tablegenerate: Users[];
  setTablegenerate: React.Dispatch<React.SetStateAction<Users[]>>;
  setDataGenerated: React.Dispatch<React.SetStateAction<{ usersId: number[]; leaderId: number; }>>;
  // setDataGenerated: React.Dispatch<React.SetStateAction<{ usersIds: number[]; leaderId: number; }>>;
}


// interface Users {
//   userId: number;
//   lastname: string;
//   firstname: string;
//   phone: string;
//   email: string;
//   username: string;
//   password: string;
//   fonction: string;
//   genre: string;
//   usersCreatedAt: Date;
//   usersUpdatedAt: Date;
// }

const TableUsersSelecte: React.FC<TableUsersSelecteProps> = ({ Tablegenerate, setTablegenerate,setDataGenerated}) => {

  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);

  
  const handleDeleteUser = (userId: number) => {
    const updatedTable = Tablegenerate.filter(user => user.userId !== userId);
    setTablegenerate(updatedTable);
    setSelectedUserIndex(-1); // Réinitialiser l'utilisateur sélectionné lors de la suppression
  };

  const handleCheckboxChange = (index: number, userId: number) => {

    if (selectedUserIndex === index) {
      
      setSelectedUserIndex(-1); // Décocher si déjà sélectionné
      setDataGenerated(prevData => ({
        ...prevData,
          ...prevData.usersId,
          leaderId:0, // Réinitialiser le leaderId à -1 lorsqu'aucun utilisateur n'est sélectionné
        
      }));
    } else {

      setSelectedUserIndex(index); // Sélectionner cet utilisateur
      setDataGenerated(prevData => ({
        ...prevData,
        ...prevData.usersId,
        leaderId: userId, // Mettre à jour le leaderId avec l'userId sélectionné
        
      }));
    }

  };
  

  return (
    <div className="mb-5">
      {Tablegenerate.length > 0 && (
        <table className="mb-10 min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-form-input-dark">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Utilisateur
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Fonctions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Responsable du groupe
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Tablegenerate.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-form-input-dark">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={UserOne} alt="Avatar" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{`${user.firstname} ${user.lastname}`}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm text-gray-500">{user.fonction}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                    <input
                      type='checkbox'
                      name='autoSaver'
                      className='sr-only'
                      checked={selectedUserIndex === index}
                      onChange={() => handleCheckboxChange(index,user.userId)}
                    />
                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${selectedUserIndex === index ? 'bg-primary' : 'bg-[#CCCCCE]'}`}>
                      <span className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${selectedUserIndex === index ? 'translate-x-6' : ''}`}></span>
                    </span>
                  </label>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button type='button' onClick={() => handleDeleteUser(user.userId)} className="text-red-600 hover:text-red-900">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5 6.91L18.09 5.5L12.5 11.09L6.91 5.5L5.5 6.91L11.09 12.5L5.5 18.09L6.91 19.5L12.5 13.91L18.09 19.5L19.5 18.09L13.91 12.5L19.5 6.91Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableUsersSelecte;
