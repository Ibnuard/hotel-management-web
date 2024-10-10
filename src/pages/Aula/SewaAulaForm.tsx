import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CHECK_AULA,
  CREATE_CHECKIN,
  DELETE_AULA,
  EDIT_SEWA_AULA,
  GET_AULA_PRICE,
  GET_PAKET_BY_ID,
  SEWA_AULA,
} from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import SelectPaketAula from '../../components/Forms/SelectGroup/SelectPaketAUla';
import { getDayDiff, isStartDateAfterEndDate } from '../../utils/DateUtils';
import { formatCurrency, parseCurrency } from '../../utils/Utility';

const SewaAulaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const locationState = useLocation().state;

  // data state
  const [tanggalCI, setTanggalCI] = useState<any>();
  const [tanggalCO, setTanggalCO] = useState<any>();
  const [isReady, setIsReady] = useState<boolean>(false);

  // user
  const [name, setName] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [ktp, setKTP] = useState<string | undefined>('');
  const [alamat, setAlamat] = useState<string | undefined>('');

  const [paketDetail, setPaketDetail] = useState<any>();
  const [paket, setPaket] = useState<string | undefined>('');
  const [pax, setPax] = useState<string>('');

  const [aulaPrice, setAulaPrice] = useState<string>('');
  const [isNeedCheck, setIsNeedCheck] = useState<boolean>(false);
  const [harga, setHarga] = useState<string>('');

  // modal
  const { setType, toggle, setOnConfirm, setMessage } = useModal();

  const buttonIsUpdatedReady = () => {
    if (id) {
      return isNeedCheck;
    }

    return false;
  };

  const buttonIsPrasmanan = () => {
    if (paket == '1') {
      return !harga;
    }

    return false;
  };

  const isFullfilled =
    !name ||
    !phone ||
    !ktp ||
    !alamat ||
    !paket ||
    !pax ||
    !paketDetail ||
    buttonIsPrasmanan() ||
    buttonIsUpdatedReady();

  // Price Total
  const paketTotal =
    paket == '1'
      ? parseInt(parseCurrency(harga))
      : parseInt(parseCurrency(paketDetail?.harga_paket || 0)) *
        parseInt(pax || '0');
  const totalAulaPrice = parseInt(aulaPrice) * getDayDiff(tanggalCI, tanggalCO);
  const totalPPN = ((paketTotal + totalAulaPrice) * 11) / 100;
  const grandTotal = paketTotal + totalAulaPrice + totalPPN;

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHarga(formatCurrency(inputValue));
  };

  async function onCheckAula() {
    const validateDate = isStartDateAfterEndDate(tanggalCI, tanggalCO);
    if (validateDate) {
      toggle();
      alert('Tanggal Akhir sewa harus lebih dari tanggal Awal sewa.');
      return;
    }
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
      setIsNeedCheck(false);
    } else {
      setType(MODAL_TYPE.ERROR);
      setMessage(error);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  useEffect(() => {
    if (id && locationState) {
      const prev = locationState;

      setTanggalCI(prev.tgl_awal_sewa);
      setTanggalCO(prev.tgl_akhir_sewa);

      setName(prev.penyewa.name);
      setPhone(prev.penyewa.phone);
      setKTP(prev.penyewa.ktp);
      setAlamat(prev.penyewa.address);

      setPaket(prev.paket.id);
      setPax(prev.jumlah_pax);

      setHarga(formatCurrency(prev.harga_paket));

      setIsReady(true);
    }
  }, [id]);

  useEffect(() => {
    getPaketDetail();
  }, [paket]);

  useEffect(() => {
    getAulaPrice();
  }, []);

  async function getPaketDetail() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    try {
      const { state, data, error } = await useFetch({
        url: GET_PAKET_BY_ID(paket),
        method: 'GET',
      });

      if (state == API_STATES.OK) {
        toggle();
        setPaketDetail(data);
      }
    } catch (error) {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  async function getAulaPrice() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    try {
      const { state, data, error } = await useFetch({
        url: GET_AULA_PRICE,
        method: 'GET',
      });

      if (state == API_STATES.OK) {
        toggle();
        setAulaPrice(data.aula_price);
        if (id) {
          setPax(locationState.jumlah_pax);
        } else {
          setPax('0');
        }
      }
    } catch (error) {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  async function onSewaAula() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      penyewa: {
        name: name,
        phone: phone,
        ktp: ktp,
        address: alamat,
      },
      tgl_awal_sewa: tanggalCI,
      tgl_akhir_sewa: tanggalCO,
      paket_id: paket,
      jumlah_pax: pax,
      harga_paket:
        paket == '1'
          ? parseCurrency(harga)
          : parseCurrency(paketDetail.harga_paket),
    };

    try {
      const { state, data, error } = await useFetch({
        url: id ? EDIT_SEWA_AULA(id) : SEWA_AULA,
        method: 'POST',
        data: body,
      });

      if (state == API_STATES.OK) {
        setType(MODAL_TYPE.SUCCESS);
        setOnConfirm(() => {
          toggle();
          navigate(-1);
        });
      } else {
        setType(MODAL_TYPE.ERROR);
        setOnConfirm(() => {
          toggle();
        });
      }
    } catch (error) {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  async function onDeleteSewa() {
    setType(MODAL_TYPE.LOADING);

    try {
      const { state, data, error } = await useFetch({
        url: DELETE_AULA(id),
        method: 'DELETE',
      });

      if (state == API_STATES.OK) {
        setType(MODAL_TYPE.SUCCESS);
        setOnConfirm(() => {
          toggle();
          navigate(-1);
        });
      } else {
        setType(MODAL_TYPE.ERROR);
        setOnConfirm(() => {
          toggle();
        });
      }
    } catch (error) {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  function clearState() {
    if (id) {
      setIsNeedCheck(true);
      return;
    }

    setIsReady(false);
    setName('');
    setPhone('');
    setKTP('');
    setAlamat('');
    setPaket('');
    setPax('');
  }

  return (
    <>
      <Breadcrumb pageName="Form Sewa Aula" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="w-full">
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
                            clearState();
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
                            clearState();
                            setTanggalCO(val);
                          }}
                        />
                      </div>
                    </div>
                    {!id ? (
                      <Button
                        onClick={() => {
                          setType(MODAL_TYPE.CONFIRMATION);
                          setOnConfirm(() => onCheckAula());
                          toggle();
                        }}
                        disabled={isReady || !tanggalCI || !tanggalCO}
                        color={'blue'}
                        fullWidth
                        variant={isReady ? 'outlined' : 'filled'}
                        className=" mt-8 normal-case"
                      >
                        {isReady ? 'Tersedia' : 'Cek Jadwal'}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setType(MODAL_TYPE.CONFIRMATION);
                          setOnConfirm(() => onCheckAula());
                          toggle();
                        }}
                        disabled={!isNeedCheck}
                        color={'blue'}
                        fullWidth
                        className=" mt-8 normal-case"
                        variant={!isNeedCheck ? 'outlined' : 'filled'}
                      >
                        {!isNeedCheck ? 'Tersedia' : 'Ganti Jadwal'}
                      </Button>
                    )}
                  </div>
                </div>
                {isReady && (
                  <div className=" flex flex-col gap-4.5 mt-8">
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Nama Penyewa
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan nama penyewa"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>

                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        No. Telp
                      </label>
                      <input
                        type="number"
                        placeholder="Masukan nomor telp penyewa"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>

                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        No. KTP
                      </label>
                      <input
                        type="number"
                        placeholder="Masukan nomor ktp penyewa"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setKTP(e.target.value)}
                        value={ktp}
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
                        onChange={(e) => setAlamat(e.target.value)}
                        value={alamat}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        {/* <!-- Contact Form --> */}
        {isReady && (
          <div className=" flex flex-col gap-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Paket Penyewaan Aula
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <SelectPaketAula value={paket} setValue={setPaket} />

                  <div className=" flex flex-col gap-4.5">
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Jumlah Pax
                      </label>
                      <input
                        type="number"
                        placeholder="Masukan jumlah pax"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setPax(e.target.value)}
                        value={pax}
                      />
                    </div>

                    {paket == '1' && (
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Total Harga Paket
                        </label>
                        <input
                          type="text"
                          placeholder="Masukan total harga paket"
                          value={harga}
                          onChange={handleHargaChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Detail Penyewaan Aula
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                      <p className=" text-sm text-body">
                        Harga sewa aula @ {getDayDiff(tanggalCI, tanggalCO)}{' '}
                        Hari
                      </p>
                      <p className=" text-sm font-semibold text-black">
                        {formatCurrency(String(totalAulaPrice))}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className=" text-sm text-body">Total Harga Paket</p>
                      <p className=" text-sm font-semibold text-black">
                        {formatCurrency(String(paketTotal))}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className=" text-sm text-body">PPN 11%</p>
                      <p className=" text-sm font-semibold text-black">
                        {formatCurrency(String(totalPPN))}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className=" text-sm text-black font-semibold">
                        Grand Total
                      </p>
                      <p className=" text-sm font-semibold text-black">
                        {formatCurrency(String(grandTotal))}
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-row gap-x-4">
                    <Button
                      onClick={() => {
                        setType(MODAL_TYPE.CONFIRMATION);
                        setOnConfirm(() => onSewaAula());
                        toggle();
                      }}
                      disabled={isFullfilled}
                      color={'blue'}
                      fullWidth
                      className=" mt-8 normal-case"
                    >
                      {id ? 'Update Data' : 'Sewa Aula'}
                    </Button>

                    {id && (
                      <Button
                        onClick={() => {
                          setType(MODAL_TYPE.CONFIRMATION);
                          setOnConfirm(() => onDeleteSewa());
                          toggle();
                        }}
                        color={'red'}
                        fullWidth
                        className=" mt-8 normal-case"
                      >
                        Hapus Data
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SewaAulaForm;
