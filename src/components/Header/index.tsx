// import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
// import DropdownNotification from './DropdownNotification';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DropdownUser from './DropdownUser';
// import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void;}) => {
  
  const location = useLocation();
  const { pathname } = location;

  const segments = pathname.split('/').filter(segment => segment !== '');

  let formattedPathname = '';

  
  if (segments.length > 0) {
    let segmentToFormat = '';
    
    switch (segments.length) {
      case 2:

        segmentToFormat = segments[1];
        break;
      case 3:

      case 4:
        segmentToFormat = segments[segments.length - 1];
        break;

        case 5:
        segmentToFormat = segments[segments.length - 2];
        break;

      default:
        segmentToFormat = segments[0];
        break;
    }
    
    const formattedSegment = segmentToFormat.charAt(0).toUpperCase() + segmentToFormat.slice(1);
    formattedPathname = ` ${formattedSegment}`;
  }

  return (

    <header className="sticky top-0 z-10 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">

              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setSidebarOpen(!props.sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                  <span className="du-block absolute right-0 h-full w-full">
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && '!w-full delay-300'
                      }`}
                    ></span>
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && 'delay-400 !w-full'
                      }`}
                    ></span>
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && '!w-full delay-500'
                      }`}
                    ></span>
                  </span>
                    <span className="absolute right-0 h-full w-full rotate-45">
                      <span className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${ !props.sidebarOpen && '!h-0 !delay-[0]'}`}>
                      </span>
                    <span
                      className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && '!h-0 !delay-200'
                      }`}
                    ></span>
                  </span>
                </span>
              </button>

              <Link className="block flex-shrink-0 lg:hidden" to="/">
                <img src={LogoIcon} alt="Logo" />
              </Link>
            </div>

            <div className="hidden sm:block">
              {formattedPathname == "Dashboard" ? (
                <>
                  <div className="block font-medium text-1xl "> Bienvenue sur  </div>
                  <h1 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2"> MobiTask</h1>
                </>
                ) : (
                  <>
                    <div className="block font-medium text-1xl ">  </div>
                    <h1 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">  {decodeURIComponent(formattedPathname)}</h1>
                  </>
                )}

            </div>

            <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    {/* <DarkModeSwitcher /> */}
                    <DropdownMessage />
                  
                </ul>
                <DropdownUser />
            </div>


        </div>
    </header>

  );

};

export default Header;
