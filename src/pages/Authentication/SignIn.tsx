import { Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { LOGIN } from '../../api/routes';
import { API_STATES } from '../../common/Constants';
import LogoIcon from '../../images/logo.png';

const SignIn: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setToken, setUser } = useAuth();

  async function onLogin() {
    const body = {
      userid: userId,
      password: password,
    };

    const { state, data, error } = await useFetch({
      url: LOGIN,
      method: 'POST',
      data: body,
    });

    if (state === API_STATES.ERROR) {
      setErrorMessage(error || 'Login failed. Please try again.');
    } else {
      setUser(data);
      setToken(data.userId);
    }

    console.log(state, data, error);
  }

  return (
    <>
      <div className="xl:grid xl:place-items-center h-full sm:h-[100dvh] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
        <div>
          <div className="grid min-h-screen w-full place-items-center">
            <div>
              <div className="grid place-items-center p-4 mb-4.5">
                <div className="mb-8">
                  <img
                    className="block h-50 w-80 object-contain"
                    src={LogoIcon}
                    alt="Logo"
                  />
                </div>
                <Typography variant={'h5'}>Login</Typography>
              </div>

              <div className="w-96 rounded-md bg-white p-6 shadow-lg">
                <form action="#">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                      User ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Masukan User ID"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Masukan Password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
                <div>
                  <Button
                    fullWidth
                    color={'blue'}
                    className="mt-8 normal-case"
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                </div>
              </div>

              {/* Centered error message */}
              {errorMessage && (
                <span className="mt-4 flex justify-center text-red-500">
                  {errorMessage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
