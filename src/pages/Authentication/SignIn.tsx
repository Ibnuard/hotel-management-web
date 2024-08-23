import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const { token, setToken } = useAuth();

  function onLogin() {
    setToken('ABCD');
  }

  console.log('TOKENS', token);

  return (
    <>
      <div className=" xl:grid xl:place-items-center h-full sm:h-[100dvh] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedar">
        <div>
          <div className=" grid min-h-screen w-full place-items-center">
            <div>
              <div className="grid place-items-center p-4 mb-4.5">
                <div className=" mb-8">
                  <img
                    className="block h-40 w-40 object-contain"
                    src={`https://cdn-icons-png.flaticon.com/512/5084/5084259.png`}
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
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={'password'}
                        placeholder="Masukan Password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </form>
                <div>
                  <Button
                    fullWidth
                    color={'blue'}
                    className=" mt-8 normal-case"
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
