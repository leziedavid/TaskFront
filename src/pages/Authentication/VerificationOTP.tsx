import React, { useEffect, useState ,useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardAuth from '../../components/CardAuth';
import Loading from '../../common/Loader/Loading';

import { verifyOTP,sendOTP } from '../../services/ApiService';
import { BaseResponse } from '../../interfaces/ApiResponse';

const VerificationOTP: React.FC = () => {

  interface UserData {
    code: number;
    otp: string;
    message: string;
  }

  const [email, setEmail] = useState("lezie@gmail.com");
  const navigate = useNavigate();
  const [response, setResponse] = useState<BaseResponse<UserData> | null>(null);
  const [response2, setResponse2] = useState<BaseResponse<UserData> | null>(null);

  const [Load, SetLoad] = useState(false);

  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (refs.current && refs.current[0]) {
      refs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      if (index < 3 && value.length === 1 && refs.current[index + 1]) {
        refs.current[index + 1]?.focus();
      } else if (value === '' && index > 0 && refs.current[index - 1]) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {

    if (response && response.data && response.code === 200) {
      SetLoad(false);
      toast.success("Votre OTP est valide");
      setTimeout(() => {
          setOtpDigits(['', '', '', '']);
          if (refs.current && refs.current[0]) {
              refs.current[0].focus();
          }
        navigate('/auth/changePassword');

      }, 3000);

    } else if (response) {
      SetLoad(false);
      setOtpDigits(['', '', '', '']);
        if (refs.current && refs.current[0]) {
            refs.current[0].focus();
        }
        toast.error(`Le code OTP que vous avez saisi n'est pas correct. Merci de vérifier votre e-mail : ${email}`);
    }

  }, [response, history]);

  const handleVerify = async () => {

    const otpCode = otpDigits.join('');
    if (!otpCode) {
        SetLoad(false);
        toast.error("Veuillez saisir le code SVP");
        return;
      }
      SetLoad(true);
    try {
      const apiResponse = await verifyOTP(email,otpCode);
      setResponse(apiResponse);
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const Validate = async () => {
    try {
      const apiResponse = await sendOTP(email);
      // setResponse(apiResponse);
      toast.success("Veuillez consulter votre email, un code de validation vous a été transmis. Ce code expirera dans 3 minutes.");
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <>
      
      <ToastContainer position="top-right" autoClose={9000} />
      <div className="rounded-sm">
        <div className="flex flex-wrap ">
          <CardAuth />
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className="text-center">
                <h1 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Verifiez votre E-mail
                </h1>
                <span className="mb-10 block font-medium">
                  S'il vous plait entrez le code à 4 chiffres envoyé à{' '}
                  <button className="text-primary">{email}</button> {' '}
                    <h1 className="text-center  mb-3 text-1xl font-bold text-black text-[#cd2f2f] dark:text-white sm:text-title-xl1">
                      Ce code expire dans 3 minutes.
                  </h1>
                </span>
              </div>


              <div className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">

                  <form>
                    <div className="flex flex-col items-center gap-5.5">
                      {/* Centrer les inputs horizontalement */}
                      <div className="flex justify-center gap-4.5 mb-5">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            ref={(input) => { refs.current[index] = input; }}
                            className="w-18 rounded-md border-[1.5px] border-stroke bg-transparent p-2 text-center text-2xl font-medium text-black outline-none transition focus:border-[#03233F] active:border-[#03233F] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#03233F]"
                          />
                        ))}
                      </div>


                      {Load ? (

                      <Loading/>

                        ) : (

                          <>
                              <button onClick={handleVerify} type="button" className="flex w-full justify-center rounded-md bg-[#03233F] p-[13px] font-bold text-gray hover:bg-opacity-90"> VERIFIER</button>
                            </>
                          )}

                      <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">
                        Vous n'avez pas reçu de code ?{' '}
                        <button type="button"  onClick={Validate} className="text-primary">Renvoyez-le</button>
                      </p>

                      <span className="mt-5 block text-red">
                        Ne communiquez le code de vérification à personne !
                      </span>
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

export default VerificationOTP;
