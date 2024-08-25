import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import SelectTipeKamar from '../../components/Forms/SelectGroup/SelectTipeKamar';
import SelectJumlahTamuDewasa from '../../components/Forms/SelectGroup/SelectJumlahTamuDewasa';
import SelectJumlahTamuAnak from '../../components/Forms/SelectGroup/SelectJumlahTamuAnak';
import SelectKetersediaan from '../../components/Forms/SelectGroup/SelectKetersediaan';
import useFetch from '../../hooks/useFetch';
import { ADD_KAMAR, DELETE_KAMAR, EDIT_KAMAR } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import { useModal } from '../../components/Provider/ModalProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/Utility';

const KamarDetails = () => {
  const [namaKamar, setNamaKamar] = useState('');
  const [nomorKamar, setNomorKamar] = useState('');
  const [tipeKamar, setTipeKamar] = useState<string>('');
  const [maxDewasa, setMaxDewasa] = useState('');
  const [maxAnak, setMaxAnak] = useState('');
  const [ketersediaan, setKetersediaan] = useState('');
  const [harga, setHarga] = useState('');

  // modal
  const { toggle, setType, setOnConfirm } = useModal();

  // nav
  const navigate = useNavigate();
  const stateParams = useLocation().state;
  const { id } = useParams();

  // button
  const isButtonDisabled =
    !namaKamar ||
    !nomorKamar ||
    !tipeKamar ||
    !maxDewasa ||
    !maxAnak ||
    !ketersediaan ||
    !harga;

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHarga(formatCurrency(inputValue));
  };

  useEffect(() => {
    if (id) {
      setNamaKamar(stateParams.nama_kamar);
      setNomorKamar(stateParams.nomor_kamar);
      setTipeKamar(stateParams.tipe_kamar_id);
      setMaxDewasa(stateParams.max_dewasa);
      setMaxAnak(stateParams.max_anak);
      setKetersediaan(stateParams.is_tersedia);
      setHarga(formatCurrency(stateParams.harga));
    }
  }, [id]);

  console.log('tipe', tipeKamar);

  async function onEditKamar() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      nama_kamar: namaKamar,
      nomor_kamar: nomorKamar,
      tipe_kamar_id: tipeKamar,
      max_dewasa: maxDewasa,
      max_anak: maxAnak,
      is_tersedia: ketersediaan,
      harga: harga,
    };
    const { state, data, error } = await useFetch({
      url: EDIT_KAMAR(id),
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/admin/kamar');
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  async function onDeleteKamar() {
    setType(MODAL_TYPE.LOADING);

    const { state, data, error } = await useFetch({
      url: DELETE_KAMAR(id),
      method: 'DELETE',
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate('/admin/kamar');
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
                    Nama Kamar
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama kamar"
                    value={namaKamar}
                    onChange={(e) => setNamaKamar(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nomor Kamar
                  </label>
                  <input
                    type={'number'}
                    placeholder="Masukan nomor kamar"
                    value={nomorKamar}
                    onChange={(e) => setNomorKamar(e.target.value)}
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

                <div className="mb-9">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Harga per malam ( Rp )
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan harga / malam"
                    value={harga}
                    onChange={handleHargaChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectKetersediaan
                  value={ketersediaan}
                  setValue={setKetersediaan}
                />
                <div className=" flex flex-row gap-x-4">
                  <Button
                    disabled={isButtonDisabled}
                    onClick={() => {
                      setType(MODAL_TYPE.CONFIRMATION);
                      setOnConfirm(() => onEditKamar());
                      toggle();
                    }}
                    color={'blue'}
                    fullWidth
                    className=" mt-8 normal-case"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setType(MODAL_TYPE.CONFIRMATION);
                      setOnConfirm(() => onDeleteKamar());
                      toggle();
                    }}
                    color={'red'}
                    fullWidth
                    className=" mt-8 normal-case"
                  >
                    Hapus
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

export default KamarDetails;
