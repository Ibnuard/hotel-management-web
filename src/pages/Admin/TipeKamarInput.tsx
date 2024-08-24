import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_TIPE_KAMAR } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';

const TipeKamarInput = () => {
  const [tipeKamar, setTipeKamar] = useState<string>('');

  // modal
  const { toggle, setType, setOnConfirm } = useModal();

  // nav
  const navigate = useNavigate();

  // button
  const isButtonDisabled = !tipeKamar;

  async function onAddTipeKamar() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      tipe: tipeKamar,
    };

    const { state, data, error } = await useFetch({
      url: ADD_TIPE_KAMAR,
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/admin/tipe-kamar');
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  return (
    <>
      <Breadcrumb pageName="Edit Data Kamar" />

      <div className="w-full">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Kamar
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tipe Kamar
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan tipe kamar"
                    value={tipeKamar}
                    onChange={(e) => setTipeKamar(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <Button
                  disabled={isButtonDisabled}
                  color={'blue'}
                  fullWidth
                  className=" normal-case mt-8"
                  onClick={() => {
                    setType(MODAL_TYPE.CONFIRMATION);
                    setOnConfirm(() => onAddTipeKamar());
                    toggle();
                  }}
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipeKamarInput;
