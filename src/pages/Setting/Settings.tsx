import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useModal } from '../../components/Provider/ModalProvider';
import { formatCurrency } from '../../utils/Utility';
import PasswordInput from '../../components/PasswordInput';
import useFetch from '../../hooks/useFetch';
import { GET_SA, UPDATE_SA } from '../../api/routes';

const SettingsForm = () => {
  // data state
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  const buttonDisabled = !email || !emailPassword;

  useEffect(() => {
    getSAData();
  }, []);

  async function getSAData() {
    const { state, data, error } = await useFetch({
      url: GET_SA,
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      setEmail(data.email);
      setEmailPassword(data.email_password);
    }
  }

  async function updateSA() {
    setType(MODAL_TYPE.LOADING);

    const body = { password, email, email_password: emailPassword };
    const { state, data, error } = await useFetch({
      url: UPDATE_SA,
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => toggle());
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => toggle());
    }
  }

  // modal
  const { setType, toggle, setOnConfirm } = useModal();

  return (
    <>
      <Breadcrumb pageName="Pengaturan Admin" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Pengaturan Parameter Akun
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <PasswordInput
                  label={'Password Akun Admin'}
                  value={password}
                  setValue={(e: any) => setPassword(e.target.value)}
                />

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Pengirim Invoice
                  </label>
                  <input
                    type="email"
                    placeholder="Masukan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <PasswordInput
                  label={'Password Google App'}
                  value={emailPassword}
                  setValue={(e: any) => setEmailPassword(e.target.value)}
                />
                <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    Cara mendapatkan Google App password:
                  </span>
                  <ul className="mt-2 list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      Pastikan akun google telah mengaktifkan 2 Factor
                      Authentication
                    </li>
                    <li>
                      Buka{' '}
                      <a
                        href="https://security.google.com/settings/security/apppasswords"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        https://security.google.com/settings/security/apppasswords
                      </a>
                    </li>
                    <li>
                      Login akun google lalu pilih tambahkan aplikasi baru.
                    </li>
                    <li>Lalu copy password yang muncul.</li>
                  </ul>
                </div>
                <div className=" flex flex-row gap-x-4">
                  <Button
                    disabled={buttonDisabled}
                    onClick={() => {
                      setType(MODAL_TYPE.CONFIRMATION);
                      setOnConfirm(() => updateSA());
                      toggle();
                    }}
                    color={'blue'}
                    fullWidth
                    className=" mt-8 normal-case mb-8"
                  >
                    Simpan
                  </Button>
                </div>
                <span className=" text-sm">
                  *Password yang sedang digunakan tidak akan diperlihatakan.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsForm;
