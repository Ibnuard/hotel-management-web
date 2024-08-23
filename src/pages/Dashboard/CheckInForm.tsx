import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TamuModal from '../../components/Modals/TamuModal';
import { useState } from 'react';
import InputModal from '../../components/Forms/InputModal';
import SelectJumlahTamuDewasa from '../../components/Forms/SelectGroup/SelectJumlahTamuDewasa';
import SelectJumlahTamuAnak from '../../components/Forms/SelectGroup/SelectJumlahTamuAnak';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import TimePicker from '../../components/Forms/DatePicker/TimePicker';
import { Button, Chip, Typography } from '@material-tailwind/react';
import { formatDate } from '../../utils/DateUtils';

const CheckInForm = () => {
  const location = useLocation();

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

  return (
    <>
      <Breadcrumb pageName="Form Pemesanan" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Kamar Dipilih : {stateParameter.id}
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <InputModal
                  title="Tamu"
                  placeholder="Pilih Tamu"
                  value={tamu?.nama}
                  onClick={() => setTamuVisible(!tamuVisible)}
                  onXClick={() => setTamu({})}
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuDewasa
                      value={jmlTamuDewasa}
                      setValue={setJmlTamuDewasa}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuAnak
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
                          disabled
                          title="Tanggal Check In"
                          value={tanggalCI}
                          onChange={(val: string) => setTanggalCI(val)}
                          defaultValue={formatDate(currentDate)}
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <TimePicker
                          selector="checkin-time"
                          title="Waktu Check In"
                          value={waktuCI}
                          onChange={(val: string) => setWaktuCI(val)}
                          defaultValue={formatDate(currentDate, {
                            dateFormat: 'HH:mm',
                          })}
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
                <Button color={'blue'} fullWidth className=" mt-8 normal-case">
                  Check In
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
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
                    defaultValue={'Robet Downey Jr.'}
                    disabled
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Alias
                  </label>
                  <input
                    defaultValue={'-'}
                    disabled
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Identitas
                  </label>
                  <input
                    defaultValue={'KTP | 1234567890'}
                    disabled
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      No. Telpon
                    </label>
                    <input
                      defaultValue={'085'}
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
                      defaultValue={'apa@test.com'}
                      disabled
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Detail Kamar
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tipe Kamar
                  </label>
                  <Chip
                    variant="ghost"
                    value="KAMAR EKSEKUTIF"
                    color={'blue'}
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ketentuan
                  </label>
                  <div className=" flex flex-col gap-y-1">
                    <Typography variant={'small'}>
                      Maksimal Orang Dewasa: 2 Orang
                    </Typography>
                    <Typography variant={'small'}>
                      Maksimal Anak - anak : 2 Orang
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
