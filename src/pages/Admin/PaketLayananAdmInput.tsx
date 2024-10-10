import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ADD_PAKET,
  ADD_PRODUCT,
  ADD_TIPE_KAMAR,
  DELETE_PAKET,
  DELETE_PRODUCT,
  EDIT_PAKET,
  EDIT_PRODUCT,
} from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import { formatCurrency } from '../../utils/Utility';

const PaketLayananAdmInput = () => {
  const [namaPaket, setNamaPaket] = useState<string>('');
  const [hargaPaket, setHargaPaket] = useState<string>('');

  // modal
  const { toggle, setType, setOnConfirm } = useModal();

  // nav
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const { id } = useParams();

  // button
  const isButtonDisabled = !namaPaket || !hargaPaket;

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHargaPaket(formatCurrency(inputValue));
  };

  useEffect(() => {
    if (id && locationState) {
      setNamaPaket(locationState.nama_paket);
      setHargaPaket(locationState.harga_paket);
    }
  }, [id]);

  async function onAdd() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      nama: namaPaket,
      harga: hargaPaket,
    };

    const { state, data, error } = await useFetch({
      url: ADD_PAKET,
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate(-1);
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  async function onEdit() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      nama: namaPaket,
      harga: hargaPaket,
    };

    const { state, data, error } = await useFetch({
      url: EDIT_PAKET(id),
      method: 'POST',
      data: body,
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate(-1);
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  async function onDelete() {
    setType(MODAL_TYPE.LOADING);

    const { state, data, error } = await useFetch({
      url: DELETE_PAKET(id),
      method: 'DELETE',
    });

    if (state == API_STATES.OK) {
      setType(MODAL_TYPE.SUCCESS);
      setOnConfirm(() => {
        navigate(-1);
        toggle();
      });
    } else {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {});
    }
  }

  return (
    <>
      <Breadcrumb pageName={id ? 'Edit Produk' : 'Tambah Produk'} />

      <div className="w-full">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Paket
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Paket
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama paket"
                    value={namaPaket}
                    onChange={(e) => setNamaPaket(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Harga Paket / pax
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan harga paket"
                    value={hargaPaket}
                    onChange={handleHargaChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className=" flex flex-row gap-4 mt-8">
                  <Button
                    disabled={isButtonDisabled}
                    color={'blue'}
                    fullWidth
                    className=" normal-case"
                    onClick={() => {
                      setType(MODAL_TYPE.CONFIRMATION);
                      setOnConfirm(() => (id ? onEdit() : onAdd()));
                      toggle();
                    }}
                  >
                    Simpan
                  </Button>
                  {id && locationState && (
                    <Button
                      color={'red'}
                      fullWidth
                      className=" normal-case"
                      onClick={() => {
                        setType(MODAL_TYPE.CONFIRMATION);
                        setOnConfirm(() => onDelete());
                        toggle();
                      }}
                    >
                      Hapus
                    </Button>
                  )}
                </div>
                <Button
                  color={'deep-orange'}
                  variant={'outlined'}
                  fullWidth
                  className=" normal-case mt-4"
                  onClick={() => navigate(-1)}
                >
                  Batalkan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaketLayananAdmInput;
