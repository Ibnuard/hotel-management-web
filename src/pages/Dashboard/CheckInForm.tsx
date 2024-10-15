import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TamuModal from '../../components/Modals/TamuModal';
import { useEffect, useState } from 'react';
import InputModal from '../../components/Forms/InputModal';
import SelectJumlahTamuDewasa from '../../components/Forms/SelectGroup/SelectJumlahTamuDewasa';
import SelectJumlahTamuAnak from '../../components/Forms/SelectGroup/SelectJumlahTamuAnak';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import TimePicker from '../../components/Forms/DatePicker/TimePicker';
import { Button, Chip, Typography } from '@material-tailwind/react';
import { formatDate, isStartDateAfterEndDate } from '../../utils/DateUtils';
import { formatCurrency } from '../../utils/Utility';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import { CREATE_CHECKIN } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';

const CheckInForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // parameter
  const stateParameter = location.state;
  const currentDate = new Date();

  // state

  // modal state
  const [tamuVisible, setTamuVisible] = useState(false);

  // data state
  const [tamu, setTamu] = useState<any>();
  const [jmlTamuDewasa, setJmlTamuDewasa] = useState('');
  const [jmlTamuAnak, setJmlTamuAnak] = useState('');
  const [tanggalCI, setTanggalCI] = useState<any>();
  const [waktuCI, setWaktuCI] = useState<any>();
  const [tanggalCO, setTanggalCO] = useState<any>();
  const [waktuCO, setWaktuCO] = useState<any>();
  const [deposit, setDeposit] = useState<string>('');

  // modal
  const { setType, toggle, setOnConfirm } = useModal();

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDeposit(formatCurrency(inputValue));
  };

  // useEffect(() => {
  //   setTanggalCI(formatDate(currentDate));
  // }, []);

  async function onCheckIn() {
    const validateDate = isStartDateAfterEndDate(tanggalCI, tanggalCO);
    if (validateDate) {
      toggle();
      alert('Tanggal Check Out harus lebih dari tanggal Check In.');
      return;
    }

    setType(MODAL_TYPE.LOADING);

    const body = {
      tamu_id: tamu?.id,
      jumlah_dewasa: jmlTamuDewasa,
      jumlah_anak: jmlTamuAnak,
      jumlah_deposit: deposit,
      tgl_checkin: tanggalCI,
      waktu_checkin: waktuCI,
      tgl_checkout: tanggalCO,
      waktu_checkout: waktuCO,
      kamar_id: stateParameter?.id,
    };
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
                Kamar Dipilih : {stateParameter?.nama_kamar} #
                {stateParameter?.nomor_kamar}
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <InputModal
                  title="Tamu"
                  placeholder="Pilih Tamu"
                  value={
                    tamu
                      ? `${tamu.sex} ${tamu.nama_depan} ${tamu.nama_belakang}`
                      : ''
                  }
                  onClick={() => setTamuVisible(!tamuVisible)}
                  onXClick={() => setTamu(null)}
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuDewasa
                      type={'user'}
                      value={jmlTamuDewasa}
                      setValue={setJmlTamuDewasa}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuAnak
                      type={'user'}
                      value={jmlTamuAnak}
                      setValue={setJmlTamuAnak}
                    />
                  </div>
                </div>

                <div className="mb-9">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Jumlah Deposit ( Rp )
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan jumlah deposit"
                    value={deposit}
                    onChange={handleDepositChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className=" mb-4.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Waktu Check In
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="flex flex-col gap-6 xl:flex-row mb-4.5">
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkin-date"
                          title="Tanggal Check In"
                          value={tanggalCI}
                          onChange={(val: string) => setTanggalCI(val)}
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <TimePicker
                          selector="checkin-time"
                          title="Waktu Check In"
                          value={waktuCI}
                          onChange={(val: string) => setWaktuCI(val)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Waktu Check Out
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="flex flex-col gap-6 xl:flex-row mb-4.5">
                      <div className="w-full xl:w-1/2">
                        <DatePicker
                          selector="checkout-date"
                          title="Tanggal Check Out"
                          value={tanggalCO}
                          onChange={(val: string) => setTanggalCO(val)}
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <TimePicker
                          selector="checkout-time"
                          title="Waktu Check Out"
                          value={waktuCO}
                          onChange={(val: string) => setWaktuCO(val)}
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
                    Check In
                  </Button>
                  <Button
                    onClick={() => navigate('/order/checkin')}
                    color={'red'}
                    fullWidth
                    className=" mt-8 normal-case"
                  >
                    Batalkan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          {tamu && (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Detail Tamu
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama
                    </label>
                    <input
                      value={
                        tamu
                          ? `${tamu.sex} ${tamu.nama_depan} ${tamu.nama_belakang} ( ${tamu.alias} )`
                          : ''
                      }
                      disabled
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Identitas
                    </label>
                    <div className=" flex flex-row gap-x-4">
                      <input
                        value={tamu ? tamu.tipe_identitas : ''}
                        disabled
                        type="text"
                        className=" w-1/5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <input
                        value={tamu ? tamu.nomor_identitas : ''}
                        disabled
                        type="text"
                        className=" w-4/5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        No. Telpon
                      </label>
                      <input
                        value={tamu ? tamu.no_telp : ''}
                        disabled
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        value={tamu ? tamu.email : ''}
                        disabled
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className=" mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alamat
                    </label>
                    <textarea
                      value={tamu ? tamu.alamat : ''}
                      rows={2}
                      disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Kabupaten / Kota
                      </label>
                      <input
                        value={tamu ? tamu.kabupaten : ''}
                        disabled
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Provinsi
                      </label>
                      <input
                        value={tamu ? tamu.provinsi : ''}
                        disabled
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Detail Kamar
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className=" mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Kamar
                  </label>
                  <div className=" flex flex-col gap-y-1">
                    <Typography variant={'small'}>
                      {stateParameter.nama_kamar} #{stateParameter.nomor_kamar}
                    </Typography>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tipe Kamar
                  </label>
                  <Chip
                    variant="ghost"
                    value={stateParameter?.tipeKamar?.tipe || 'Tipe Kamar'}
                    color={'blue'}
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ketentuan
                  </label>
                  <div className=" flex flex-col gap-y-1">
                    <Typography variant={'small'}>
                      Maksimal Orang Dewasa: {stateParameter?.max_dewasa} Orang
                    </Typography>
                    <Typography variant={'small'}>
                      Maksimal Anak - anak : {stateParameter?.max_anak} Orang
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TamuModal
        visible={tamuVisible}
        toggle={() => setTamuVisible(!tamuVisible)}
        value={(val: string) => setTamu(val)}
      />
    </>
  );
};

export default CheckInForm;
