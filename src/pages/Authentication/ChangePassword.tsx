import React, { useEffect,useState } from 'react';
import CardAuth from '../../components/CardAuth';
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../common/Loader/Loading';

import { changePassword} from '../../services/ApiService';
import { BaseResponse } from '../../interfaces/ApiResponse';

interface UserData {
  code: number;
  message: string;
}

const ChangePassword: React.FC = () => {

  const [email, Setemail] = useState(localStorage.getItem('link'));
  const [otp, SetOtp] = useState(localStorage.getItem('otp'));
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [password, setPassword] = useState("");
  const [Confirmepassword, setConfirmePassword] = useState("");
  const [Load, SetLoad] = useState(false);

  const [response, setResponse] = useState<BaseResponse<UserData> | null>(null);

  useEffect(() => {
    
    if (response && response.data && response.code === 200) {

        SetLoad(false);
        localStorage.removeItem('token');
        localStorage.removeItem('link');
        localStorage.removeItem('otp');
        toast.success("Votre OTP est valide");

      setTimeout(() => {
        navigate('/auth/signin');
        }, 4000);


    } else if (response) {
        SetLoad(false);
        toast.error(`Le code OTP que vous avez saisi n'est pas correct. Merci de vérifier votre e-mail : ${email}`);
    }

  }, [response, history]);

    const Validate = async () => {

      if (password !== Confirmepassword) {
        SetLoad(false);
        toast.error("Les deux mots de passe ne sont pas identiques.");
        return;
      }
      
      try {
        const apiResponse = await changePassword(email ?? "",password,otp ?? "");
          setResponse(apiResponse);
        toast.success("Veuillez consulter votre email, un code de validation vous a été transmis. Ce code expirera dans 3 minutes.");
      } catch (error) {
        console.error('Sign up failed:', error);
      }
  
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={6000} />
      

      <div className="rounded-sm">
        
        <div className="flex flex-wrap">
        
        <CardAuth />

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2" >
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            
            <div className="text-center" >

                <h1 className="mb-3 text-2xl font-bold text-black text-[#34D399] dark:text-white sm:text-title-xl1">
                    REINITIALISER LE MOT DE PASSE
                </h1>

              {/* <div className="block font-medium text-1xl ">
                  Veuillez définir un nouveau mot de passe
              </div> */}

            </div>

            <div className=" border-stroke bg-white dark:border-strokedark dark:bg-boxdark">

                <div className="flex flex-col gap-5.5 p-6.5">
                    <form>

                    <div className="mb-4">

                      <div className="relative">

                          <span className="absolute left-4 top-3">
                              <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill=""
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill=""
                                />
                              </svg>
                          </span>

                          <input type={showPassword ? "text" : "password"} placeholder="Nouveau mot de passe" className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-14 pr-16 text-black outline-none focus:border-[#012340] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={password} onChange={(event) => { setPassword(event.target.value); }} />

                          <button
                            type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-4">
                            {showPassword ? (
                              <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill=""
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill=""
                                />
                              </svg>
                            ) : (
                              <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill=""
                                />
                              </svg>
                            )}
                          </button>

                      </div>
                      </div>

                        <div className="mb-4">

                            <div className="relative">

                                <span className="absolute left-4 top-3">
                                    <svg
                                      className="fill-current"
                                      width="22"
                                      height="22"
                                      viewBox="0 0 22 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                        fill=""
                                      />
                                      <path
                                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                        fill=""
                                      />
                                    </svg>
                                </span>

                                <input type={showPassword ? "text" : "password"} placeholder="Confirmer le mot de passe" className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-14 pr-16 text-black outline-none focus:border-[#012340] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  value={Confirmepassword} onChange={(event) => { setConfirmePassword(event.target.value); }} />

                                <button
                                  type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-4">
                                  {showPassword ? (
                                    <svg
                                      className="fill-current"
                                      width="22"
                                      height="22"
                                      viewBox="0 0 22 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                        fill=""
                                      />
                                      <path
                                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                        fill=""
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="fill-current"
                                      width="22"
                                      height="22"
                                      viewBox="0 0 22 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                        fill=""
                                      />
                                    </svg>
                                  )}
                                </button>

                            </div>
                        </div>

                        {Load ? (

                          <Loading/>

                            ) : (

                              
                              <div className="mb-5">
                                <button onClick={Validate} type="button" className="flex w-full justify-center rounded-md bg-[#03233F] p-[13px] font-bold text-gray hover:bg-opacity-90">REINITIALISER </button>
                              </div>
                          )}

                    </form>

                </div>

            </div>

            </div>
          </div>
        </div>

          
      </div>
    </>
  );
};

export default ChangePassword;
