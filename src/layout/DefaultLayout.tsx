import React, { useEffect,useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import {useNavigate } from 'react-router-dom';

  const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    
    } else {
      navigate('/auth/signin');
    }
  }, [navigate]);
  

  return (

    <div className="dark:bg-boxdark-2 dark:text-bodydark bg-[#EBF1FA]">

      <div className="flex h-screen overflow-hidden">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main >
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-12 bg-[#EBF1FA]">
              {children}
            </div>
          </main>
        </div>

      </div>

    </div>
  );
};

export default DefaultLayout;
