import { useState, useEffect } from "react";

const LoginWithOtp = ({setEnableEmailOtp, credentials, handleChange, handleGenrateOtp, handleOtpLogin}) =>{
    const [timer, setTimer] = useState(120);
    const [canReSendOtp, setCanReSendOtp] = useState(false);


    useEffect(() => {
      let countDownInterval;

      if(timer > 0) {
        countDownInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000)
      } else {
         setCanReSendOtp(true);
         clearInterval(countDownInterval);  
      }
      return () => clearInterval(countDownInterval)
    },[timer])

    const handleResendOtp = async () => {
         try {
           await handleGenrateOtp();
           setTimer(120);
           setCanReSendOtp(false); 
         } catch (error) {
            console.log('error during resending OTP', error.message);
         }  
    }
    return (<>
       <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
              <form  className="mt-8 space-y-6" onSubmit={handleOtpLogin}>
                 <div className="space-y-4">
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                             Email/Username
                         </label>
                         <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-500"
                            autoComplete="false"
                            value={credentials?.email}
                            // readonly={credentials?.email}
                            disabled
                         />
                      </div>
                      <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                             Enter Your OTP
                          </label>
                          <input
                             type="password"
                             name="OTP"
                             id="OTP"
                             required
                             className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                             onChange={handleChange}
                             autoComplete="false"
                            />
                        </div>
                 </div>
                 <div>
                    <button disabled={credentials?.OTP?.length < 6} type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                       Sign in
                     </button>
                 </div>
                 <div>
                    <span onClick={handleResendOtp} className={`cursor-pointer text-blue-600 text-xl ${!canReSendOtp && 'pointer-events-none text-gray-500'}`}>
                        Resend OTP <br/>
                        {!canReSendOtp && (
                            <span className="text-gray-500 text-sm">
                                 {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                            </span>
                        )}
                    </span>   
                 </div>
              </form>
          </div> 
       </div>
    </>)
}

export default LoginWithOtp;