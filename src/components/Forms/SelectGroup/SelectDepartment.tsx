import React, { useState, useEffect, useRef } from 'react';
import { Id, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseResponse } from '../../../interfaces/ApiResponse';
import { Department } from '../../../interfaces/Department';
import { getAllDepartments } from '../../../services/ProjectService';

interface SelectDepartmentProps {
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
}


const SelectDepartment: React.FC<SelectDepartmentProps> = ({ setDepartment }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [response, setResponse] = useState<BaseResponse<Department[]> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const fetchDepartments = async () => {
      try {
        const apiResponse = await getAllDepartments();
        setResponse(apiResponse);
      } catch (error) {
        console.error('Error fetching departments:', error);
        toast.error('Failed to fetch departments');
      }
    };

    fetchDepartments();
  }, []);

  const handleToggleDropdown = () => {

    setIsDropdownOpen(!isDropdownOpen);
    setDepartment("");
    if (!isDropdownOpen && selectRef.current) {

      const input = selectRef.current.querySelector<HTMLInputElement>('input');

      if (input) {
        input.focus();
      }
    }
  };

  // const changeTextColor = () => {
  //   setIsOptionSelected(true);
  // };

  const changeDepartment = (value: string,Id:string) => {
    setSelectedOption(value);
    setIsOptionSelected(true);
    setDepartment(Id);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Filtered departments based on search term
  const filteredDepartments = response?.data?.filter(
    department => department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div ref={selectRef} className="relative z-20 bg-white dark:bg-form-input">
        <div
          onClick={handleToggleDropdown}
          className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-[#03233F] active:border-[#03233F] dark:border-form-strokedark cursor-pointer"
        >
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className={`block truncate ${isOptionSelected ? 'text-black dark:text-white' : ''}`}>
                {selectedOption ? selectedOption : 'Sélectionnez un département'}
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
            <input
              type="text"
              placeholder="Rechercher un département..."
              className="w-full rounded-t border-b border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-[#03233F] active:border-[#03233F] dark:border-form-strokedark dark:bg-form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredDepartments?.length ? (
                filteredDepartments.map((department) => (
                  <div
                    key={department.departmentId}
                    onClick={() => changeDepartment(department.departmentName,department.departmentId)}
                    className="cursor-pointer py-2 px-5 hover:bg-gray-100 dark:hover:bg-form-input-dark"
                  >
                    {department.departmentName}
                  </div>
                ))
              ) : (
                <div className="py-2 px-5">Aucun département trouvé</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectDepartment;
