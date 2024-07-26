import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardAuth from '../../components/CardAuth';
import Loading from '../../common/Loader/Loading';

import { sendOTP } from '../../services/ApiService';
import { BaseResponse } from '../../interfaces/ApiResponse';

  const ResetPassword: React.FC = () => {

    interface UserData {
      code: number;
      otp: string;
      message: string;
    }


  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState<BaseResponse<UserData> | null>(null);
  const [Load, SetLoad] = useState(false);

useEffect(() => {

  if (response && response.data && response.code === 201) {

    SetLoad(false);
    toast.success("Veuillez consulter votre email, un code de validation vous a été transmis. Ce code expirera dans 3 minutes.");
    localStorage.setItem('link', email);
    localStorage.setItem('otp', response.data.otp);
    setTimeout(() => {
      navigate('/auth/verificationOTP');
      }, 4000);

  } else if (response) {
    SetLoad(false);
      toast.error("L'adresse e-mail que vous avez saisie n'existe pas dans notre base de données.Merci de vérifier l'adresse que vous avez entrée");
    }
}, [response, history]);

const Validate = async () => {
    SetLoad(true);

    if (!email) {
      SetLoad(false);
      toast.error("Veuillez saisir l'email et le mot de passe.");
      return;
    }
    try {
      const apiResponse = await sendOTP(email);
      setResponse(apiResponse);
    } catch (error) {
      console.error('Sign up failed:', error);
    }
};

  return (
    <>
      <ToastContainer position="top-right" autoClose={9000} />
      

      <div className="rounded-sm">
        
        <div className="flex flex-wrap">
        
        <CardAuth />

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2" >
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            
            <div className="text-center" >

                  <h1 className="mb-10 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                      Mot de passe oublié ?
                  </h1>

                  <div className="block font-medium text-1xl ">
                  Veuillez saisir l'e-mail utilisé lors de votre inscription
                    </div>
                    <div className="block font-medium text-1xl ">
                    afin de recevoir un code OTP et réinitialiser votre mot de passe.
                    </div>

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
                                  <g opacity="0.5">
                                    <path
                                      d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                      fill=""
                                    />
                                  </g>
                                </svg>
                              </span>
                              
                              <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-14 pr-6 text-black outline-none focus:border-[#012340] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={email} onChange={(event) => { setEmail(event.target.value); }}
                              />
                          </div>

                        </div>

                        {Load ? (

                          <Loading/>

                            ) : (
                              <div className="mb-5">
                                <button onClick={Validate} type="button" className="flex w-full justify-center rounded-md bg-[#03233F] p-[13px] font-bold text-gray hover:bg-opacity-90"> REINITIALISER VOTRE MOT DE PASSE </button>
                              </div>
                          )}

                          <div className="mt-6 text-center">
                            <p> Souviens toi ? {' '}
                              <Link to="/auth/signin" className="text-primary">  Se connecter ici  </Link>
                            </p>
                          </div>

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

export default ResetPassword;
