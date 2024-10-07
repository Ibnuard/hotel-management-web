import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ADD_PRODUCT,
  ADD_TIPE_KAMAR,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import { formatCurrency } from '../../utils/Utility';

const LayananKamarAdmInput = () => {
  const [namaProduk, setNamaProduk] = useState<string>('');
  const [hargaProduk, setHargaProduk] = useState<string>('');

  // modal
  const { toggle, setType, setOnConfirm } = useModal();

  // nav
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const { id } = useParams();

  // button
  const isButtonDisabled = !namaProduk || !hargaProduk;

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHargaProduk(formatCurrency(inputValue));
  };

  useEffect(() => {
    if (id && locationState) {
      setNamaProduk(locationState.nama_product);
      setHargaProduk(locationState.harga_product);
    }
  }, [id]);

  async function onAdd() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      nama: namaProduk,
      harga: hargaProduk,
    };

    const { state, data, error } = await useFetch({
      url: ADD_PRODUCT,
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
      nama: namaProduk,
      harga: hargaProduk,
    };

    const { state, data, error } = await useFetch({
      url: EDIT_PRODUCT(id),
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
      url: DELETE_PRODUCT(id),
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
                Data Produk
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nama produk"
                    value={namaProduk}
                    onChange={(e) => setNamaProduk(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Harga Produk
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan harga produk"
                    value={hargaProduk}
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
                  <Button
                    disabled={isButtonDisabled}
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
                </div>
                <Button
                  disabled={isButtonDisabled}
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

export default LayananKamarAdmInput;
