import React, { useState } from 'react';
import bgImage from '../images/logo/bg.jpeg';
// import Logo from '../images/logo/logo.svg';

const CardAuth: React.FC = () => {
  return (

    <div className="hidden w-full xl:block xl:w-1/2">
      <div  className="relative px-10 pb-10 pt-10 bg-cover bg-center h-screen bg-[url('./bg.jpeg')]"  style={{ backgroundImage: `url(${bgImage})` }}>
      
          <div className="absolute inset-0 bg-[#F27F1BB8]"></div>

          <div className="relative">
              <div className="w-full">

              {/* <img className=" dark:block" src={Logo} alt="Logo" /> */}

                  <h3 className="text-4xl font-bold text-white"> </h3>
                  <div className="text-white text-5xl mt-[10rem] font-bold">
                    
                      <div className="w-100">
                        <p className="text-xl font-bold"> </p>
                      </div>
                    </div>
              </div>
          </div>
      </div>
    </div>

  );
};

export default CardAuth;
