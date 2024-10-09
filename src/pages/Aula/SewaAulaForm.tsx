import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_CHECKIN } from '../../api/routes';
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

  // modal
  const { setType, toggle, setOnConfirm } = useModal();

  console.log('CI', tanggalCI);
  console.log('CO', tanggalCO);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  };

  async function onCheckIn() {
    setType(MODAL_TYPE.LOADING);

    const body = {};
    const { state, data, error } = await useFetch({
      url: CREATE_CHECKIN,
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/');
        toggle();
      });
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
        <div className="flex flex-col gap-9">
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
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="flex flex-col gap-6 xl:flex-row mb-4.5">
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkin-date"
                          title="Tanggal Sewa Awal"
                          value={tanggalCI}
                          onChange={(val: string) => setTanggalCI(val)}
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkout-date"
                          title="Tanggal Sewa Akhir"
                          value={tanggalCO}
                          onChange={(val: string) => setTanggalCO(val)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-row gap-x-4">
                  <Button
                    onClick={() => {
                      setType(MODAL_TYPE.CONFIRMATION);
                      setOnConfirm(() => onCheckIn());
                      toggle();
                    }}
                    color={'blue'}
                    fullWidth
                    className=" mt-8 normal-case"
                  >
                    Cek Jadwal
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SewaAulaForm;
