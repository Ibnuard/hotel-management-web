import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { formatCurrency } from '../../utils/Utility';
import SelectTipeKamar from '../../components/Forms/SelectGroup/SelectTipeKamar';
import SelectJumlahTamuDewasa from '../../components/Forms/SelectGroup/SelectJumlahTamuDewasa';
import SelectJumlahTamuAnak from '../../components/Forms/SelectGroup/SelectJumlahTamuAnak';
import SelectKetersediaan from '../../components/Forms/SelectGroup/SelectKetersediaan';

const KamarInput = () => {
  const [deposit, setDeposit] = useState<string>('');
  const [tipeKamar, setTipeKamar] = useState<string>('');
  const [maxDewasa, setMaxDewasa] = useState('');
  const [maxAnak, setMaxAnak] = useState('');
  const [ketersediaan, setKetersediaan] = useState('');

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDeposit(formatCurrency(inputValue));
  };

  return (
    <>
      <Breadcrumb pageName="Input Data Kamar" />

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
                    Nama Kamar
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama kamar"
                    value={deposit}
                    onChange={handleDepositChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Kamar
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nomor kamar"
                    value={deposit}
                    onChange={handleDepositChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectTipeKamar value={tipeKamar} setValue={setTipeKamar} />

                <div className="flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuDewasa
                      type={'admin'}
                      value={maxDewasa}
                      setValue={setMaxDewasa}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectJumlahTamuAnak
                      type={'admin'}
                      value={maxAnak}
                      setValue={setMaxAnak}
                    />
                  </div>
                </div>

                <SelectKetersediaan
                  value={ketersediaan}
                  setValue={setKetersediaan}
                />
                <Button color={'blue'} fullWidth className=" mt-8 normal-case">
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

export default KamarInput;
