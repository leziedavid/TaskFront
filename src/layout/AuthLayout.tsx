import React, { useEffect,ReactNode } from 'react';
import {useNavigate } from 'react-router-dom';


const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      navigate('/auth/dashboard');

    } else {
      
    }
  }, [navigate]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <main>
          <div className="">
            {children}
          </div>
        </main>
    </div>
  );
};

export default AuthLayout;
