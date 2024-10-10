import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHECK_AULA, CREATE_CHECKIN } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';

const SewaAulaForm = () => {
  const navigate = useNavigate();

  // data state
  const [tanggalCI, setTanggalCI] = useState<any>();
  const [tanggalCO, setTanggalCO] = useState<any>();
  const [isReady, setIsReady] = useState<boolean>(false);

  // modal
  const { setType, toggle, setOnConfirm } = useModal();

  console.log('CI', tanggalCI);
  console.log('CO', tanggalCO);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  };

  async function onCheckAula() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      startDate: tanggalCI,
      endDate: tanggalCO,
    };

    const { state, data, error } = await useFetch({
      url: CHECK_AULA,
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      toggle();
      setIsReady(true);
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  return (
    <>
      <Breadcrumb pageName="Form Pemesanan Kamar" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-row gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Penyewaan Aula
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className=" mb-4.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Tanggal Sewa
                    </h3>
                  </div>
                  <div className="flex flex-col p-6.5">
                    <div className="flex flex-col gap-6 xl:flex-row mb-4.5">
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkin-date"
                          title="Tanggal Sewa Awal"
                          value={tanggalCI}
                          onChange={(val: string) => {
                            setIsReady(false);
                            setTanggalCI(val);
                          }}
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkout-date"
                          title="Tanggal Sewa Akhir"
                          value={tanggalCO}
                          onChange={(val: string) => {
                            setIsReady(false);
                            setTanggalCO(val);
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setType(MODAL_TYPE.CONFIRMATION);
                        setOnConfirm(() => onCheckAula());
                        toggle();
                      }}
                      disabled={isReady || !tanggalCI || !tanggalCO}
                      color={'blue'}
                      fullWidth
                      className=" mt-8 normal-case"
                    >
                      {isReady ? 'Tersedia' : 'Cek Jadwal'}
                    </Button>
                  </div>
                </div>
                <div className=" flex flex-col gap-4.5 mt-8">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Penyewa
                    </label>
                    <input
                      type="text"
                      placeholder="Masukan nama penyewa"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => {}}
                      value={''}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      No. Telp
                    </label>
                    <input
                      type="text"
                      placeholder="Masukan nomor telp penyewa"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => {}}
                      value={''}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      No. KTP
                    </label>
                    <input
                      type="text"
                      placeholder="Masukan nomor ktp penyewa"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => {}}
                      value={''}
                    />
                  </div>
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alamat
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Masukan alamat"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => {}}
                      value={''}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Form Data Penyewa Aula
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className=" flex flex-row gap-x-4">
                <Button
                  onClick={() => {
                    setType(MODAL_TYPE.CONFIRMATION);
                    setOnConfirm(() => onCheckAula());
                    toggle();
                  }}
                  disabled={isReady || !tanggalCI || !tanggalCO}
                  color={'blue'}
                  fullWidth
                  className=" mt-8 normal-case"
                >
                  {isReady ? 'Tersedia' : 'Cek Jadwal'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SewaAulaForm;
