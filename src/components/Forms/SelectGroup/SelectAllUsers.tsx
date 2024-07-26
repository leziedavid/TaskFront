import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserOne from '../../../images/user/user-01.png';
import { BaseResponse } from '../../../interfaces/ApiResponse';
import { Users } from '../../../interfaces/Users';
import { getAllUsersService } from '../../../services/UsersService';


interface SelectAllUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<string>>;
}

const SelectAllUsers: React.FC<SelectAllUsersProps> = ({ setUsers}) => {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<BaseResponse<Users[]> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiResponse = await getAllUsersService();
        setResponse(apiResponse);
      } catch (error) {
        console.error('Error fetching Users:', error);
        toast.error('Failed to fetch Users');
      }
    };

    fetchUsers();
  }, []);

  const handleToggleDropdown = () => {

    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen && selectRef.current) {
      const input = selectRef.current.querySelector<HTMLInputElement>('input');
      if (input) {
        input.focus();
      }
    }
  };

  const toggleUserSelection = (userId: number) => {
    const isSelected = selectedOptions.includes(userId.toString());
    let updatedSelection: string[];
  
    if (!isSelected) {
      updatedSelection = [...selectedOptions, userId.toString()];
    } else {
      updatedSelection = selectedOptions.filter(id => id !== userId.toString());
    }
  
    setSelectedOptions(updatedSelection);
  
    // Mettre à jour setUsers avec les IDs des utilisateurs sélectionnés
    setUsers(updatedSelection.join(','));
  
    // Récupérer les utilisateurs sélectionnés mis à jour
    const updatedSelectedUsers = filteredUsers?.filter(user => updatedSelection.includes(user.userId.toString())) ?? [];
  
    return updatedSelectedUsers;
  };
  
  
  

  const filteredUsers = response?.data?.filter(
    user => user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div ref={selectRef} className="relative z-20 bg-white dark:bg-form-input">
        <div
          onClick={handleToggleDropdown} className="w-full rounded border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-[#03233F] active:border-[#03233F] dark:border-form-strokedark cursor-pointer">
          <div className="relative">
            <div className="flex items-center justify-between">
            <span className=" truncate flex gap-2">
              {selectedOptions.length > 0
                ? selectedOptions.map(userId => {
                    const user = filteredUsers?.find(u => u.userId.toString() === userId);
                    return (
                      <div key={userId} onClick={() => toggleUserSelection(parseInt(userId))} className={`flex items-center ${user ? 'bg-[#dcdcdc] text-black text-[13px] px-3 py-1 rounded-full' : 'rotate-0'}`}>
                        {user ? `${user.firstname} ${user.lastname}` : ''}
                        <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M19.5 6.91L18.09 5.5L12.5 11.09L6.91 5.5L5.5 6.91L11.09 12.5L5.5 18.09L6.91 19.5L12.5 13.91L18.09 19.5L19.5 18.09L13.91 12.5L19.5 6.91Z" fill="black" fillOpacity="0.6"/>
                        </svg>
                      </div>
                    );
                  })
                : 'Sélectionnez'}
            </span>

              

              <svg
                className={`ml-2 h-4 w-4 transition transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isDropdownOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
                />
              </svg>
            </div>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="mt-1 absolute z-10 w-full bg-white dark:bg-form-input shadow-lg rounded border border-stroke">
            <input type="text" placeholder="Rechercher un utilisateur..."
              className="w-full rounded-t border-b border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-[#03233F] active:border-[#03233F] dark:border-form-strokedark dark:bg-form-input"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

            <div className="max-h-60 overflow-y-auto">
            {filteredUsers?.length ? (
                filteredUsers.map(user => (
                  <div key={user.userId} onClick={() => toggleUserSelection(user.userId)} className={`cursor-pointer py-2 px-5 hover:bg-gray-100 dark:hover:bg-form-input-dark flex items-center space-x-2 ${
                        selectedOptions.includes(user.userId.toString()) ? 'bg-gray-200 dark:bg-form-input-dark' : ''
                      }`}
                    >
                      <img src={UserOne} className="h-5 w-5 rounded-full" alt="User" />
                      <span>{user.firstname} {user.lastname}</span>
                    </div>
                  ))
                ) : (
                <div className="py-2 px-5">Aucun utilisateur trouvé</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectAllUsers;
