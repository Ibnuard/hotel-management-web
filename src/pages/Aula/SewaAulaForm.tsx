import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AULA_STATUS,
  CHECK_AULA,
  DELETE_AULA,
  EDIT_SEWA_AULA,
  GET_AULA_PRICE,
  SEWA_AULA,
} from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import { getDayDiff, isStartDateAfterEndDate } from '../../utils/DateUtils';
import { formatCurrency, parseCurrency } from '../../utils/Utility';
import PaketAulaModal from '../../components/Modals/PaketAulaModal';
import { TrashIcon } from '@heroicons/react/24/outline';

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
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [ktp, setKTP] = useState<string | undefined>('');
  const [alamat, setAlamat] = useState<string | undefined>('');

  const [paket, setPaket] = useState<string | undefined>('');
  const [pax, setPax] = useState<string>('');

  const [aulaPrice, setAulaPrice] = useState<string>('');
  const [isNeedCheck, setIsNeedCheck] = useState<boolean>(false);
  const [harga, setHarga] = useState<string>('');

  const [aulaStatus, setAulaStatus] = useState<string>('');

  // paket aula modal
  const [showPaket, setShowPaket] = useState<boolean>(false);
  const [selectedPaket, setSelectedPaket] = useState<any>([]);
  const [totalPaket, setTotalPaket] = useState<any>('');

  // modal
  const { setType, toggle, setOnConfirm, setMessage } = useModal();

  const buttonIsUpdatedReady = () => {
    if (id) {
      return isNeedCheck;
    }

    return false;
  };

  const isFullfilled =
    !name ||
    !phone ||
    !ktp ||
    !alamat ||
    !selectedPaket ||
    buttonIsUpdatedReady();

  // Price Total
  const totalAulaPrice = parseInt(aulaPrice) * getDayDiff(tanggalCI, tanggalCO);
  const grandTotal = totalPaket + totalAulaPrice;

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
      setEmail(prev.penyewa.email || '');
      setPhone(prev.penyewa.phone);
      setKTP(prev.penyewa.ktp);
      setAlamat(prev.penyewa.address);
      setSelectedPaket(prev.paket_list);
      setPax(prev.jumlah_pax);

      setHarga(formatCurrency(prev.harga_paket));

      setIsReady(true);
    }
  }, [id]);

  useEffect(() => {
    getAulaPrice();
    getAulaStatus();
  }, []);

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
        setAulaPrice(id ? locationState.harga_aula : data.aula_price);
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

  async function getAulaStatus() {
    try {
      const { state, data, error } = await useFetch({
        url: AULA_STATUS(id),
        method: 'GET',
      });

      if (state == API_STATES.OK) {
        setAulaStatus(data.status);
      }
    } catch (error) {}
  }

  async function onUpdateAulaStatus() {
    setType(MODAL_TYPE.LOADING);

    try {
      const { state, data, error } = await useFetch({
        url: AULA_STATUS(id),
        method: 'POST',
      });

      if (state == API_STATES.OK) {
        setType(MODAL_TYPE.SUCCESS);
        setOnConfirm(() => {
          toggle();
          getAulaStatus();
        });
      }
    } catch (error) {
      setType(MODAL_TYPE.ERROR);
      setOnConfirm(() => {
        toggle();
      });
    }
  }

  console.log('AULA STATUS', aulaStatus);

  async function onSewaAula() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      penyewa: {
        name: name,
        email: email,
        phone: phone,
        ktp: ktp,
        address: alamat,
      },
      tgl_awal_sewa: tanggalCI,
      tgl_akhir_sewa: tanggalCO,
      paket_list: selectedPaket,
      jumlah_pax: pax,
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

  function onAddNewPaket(paket: any) {
    const extSelected = [...selectedPaket];
    extSelected.push(paket);

    setSelectedPaket(extSelected);
  }

  function onRemovePaket(id: number) {
    const extSelected = [...selectedPaket];
    const rmSelected = extSelected.filter((item) => item.id !== id);

    setSelectedPaket(rmSelected);
    setType(MODAL_TYPE.SUCCESS);
    setOnConfirm(() => toggle());
  }

  useEffect(() => {
    if (selectedPaket) {
      const ext = [...selectedPaket];

      const extTotalPaket = ext.reduce(
        (acc, item) => acc + item.total_price,
        0,
      );

      setTotalPaket(extTotalPaket);
    }
  }, [selectedPaket, pax]);

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
                          disabled={aulaStatus == 'DONE'}
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
                          disabled={aulaStatus == 'DONE'}
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
                        disabled={aulaStatus == 'DONE'}
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
                        disabled={aulaStatus == 'DONE'}
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
                        disabled={aulaStatus == 'DONE'}
                        placeholder="Masukan nomor ktp penyewa"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setKTP(e.target.value)}
                        value={ktp}
                      />
                    </div>
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email ( Opsional )
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan email"
                        disabled={aulaStatus == 'DONE'}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Alamat
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Masukan alamat"
                        disabled={aulaStatus == 'DONE'}
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
              <div>
                <div className="p-6.5">
                  {/* <SelectPaketAula
                    disabled={aulaStatus == 'DONE'}
                    value={paket}
                    setValue={setPaket}
                  /> */}

                  <div className=" flex flex-col gap-4.5">
                    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-row items-center justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Paket Aula
                        </h3>
                        {aulaStatus !== 'DONE' && (
                          <Button
                            color={'blue'}
                            size={'sm'}
                            className=" normal-case"
                            onClick={() => setShowPaket(!showPaket)}
                          >
                            Tambah
                          </Button>
                        )}
                      </div>
                      {selectedPaket.length == 0 ? (
                        <div className=" w-full h-36 flex items-center justify-center">
                          <p className=" text-sm text-body">
                            Belum ada paket dipilih.
                          </p>
                        </div>
                      ) : (
                        <List>
                          {selectedPaket.map((item: any, index: number) => {
                            return (
                              <ListItem
                                ripple={false}
                                className="py-1 pr-1 pl-4 text-sm"
                              >
                                <div className=" flex flex-col gap-2">
                                  <p>{item.nama_paket}</p>
                                  <p>
                                    @{item.harga_paket}{' '}
                                    {item.id == 1 ? '/' : 'x'} {item.qty}
                                  </p>
                                </div>

                                {aulaStatus !== 'DONE' && (
                                  <ListItemSuffix className=" flex flex-row items-center gap-4">
                                    <p className=" font-semibold text-sm">
                                      {formatCurrency(item.total_price)}
                                    </p>
                                    <IconButton
                                      onClick={() => {
                                        setType(MODAL_TYPE.CONFIRMATION);
                                        setOnConfirm(() =>
                                          onRemovePaket(item.id),
                                        );
                                        toggle();
                                      }}
                                      variant="text"
                                      color="blue-gray"
                                    >
                                      <TrashIcon className=" size-5 text-red-400" />
                                    </IconButton>
                                  </ListItemSuffix>
                                )}
                              </ListItem>
                            );
                          })}
                        </List>
                      )}
                    </div>

                    {selectedPaket.length > 0 && (
                      <p className=" font-semibold text-sm mt-4.5">
                        Total Harga Paket: {formatCurrency(totalPaket)}
                      </p>
                    )}

                    {paket == '1' && (
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Total Harga Paket
                        </label>
                        <input
                          type="text"
                          disabled={aulaStatus == 'DONE'}
                          placeholder="Masukan total harga paket"
                          value={harga}
                          onChange={handleHargaChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Detail Penyewaan Aula
                </h3>
              </div>
              <div>
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
                        {formatCurrency(totalPaket)}
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
                    {id && aulaStatus == 'BOOKED' && (
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
                        Update Data
                      </Button>
                    )}

                    {!id && (
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
                        Sewa Aula
                      </Button>
                    )}

                    {id && aulaStatus == 'BOOKED' && (
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
                  <div>
                    {id && (
                      <Button
                        onClick={() => {
                          setType(MODAL_TYPE.CONFIRMATION);
                          setOnConfirm(() => onUpdateAulaStatus());
                          toggle();
                        }}
                        disabled={aulaStatus == 'DONE'}
                        color={'blue'}
                        fullWidth
                        variant={'outlined'}
                        className={`${
                          aulaStatus == 'BOOKED' ? 'mt-4' : 'mt-8'
                        } normal-case`}
                      >
                        {aulaStatus == 'BOOKED' ? 'Selesaikan Sewa' : 'Selesai'}
                      </Button>
                    )}

                    <Button
                      onClick={() =>
                        navigate('/aula/invoice', {
                          state: {
                            ...locationState,
                            price_detail: {
                              aulaPrice: aulaPrice,
                              totalAulaPrice: totalAulaPrice,
                              totalPaketPrice: totalPaket,
                              paketList: selectedPaket,
                              grandTotal: grandTotal,
                              totalDays: getDayDiff(tanggalCI, tanggalCO),
                            },
                          },
                        })
                      }
                      disabled={isFullfilled}
                      color={'deep-orange'}
                      fullWidth
                      className=" mt-4 normal-case"
                    >
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <PaketAulaModal
        visible={showPaket}
        toggle={() => setShowPaket(!showPaket)}
        selectedItem={selectedPaket}
        value={(data: any) => onAddNewPaket(data)}
      />
    </>
  );
};

export default SewaAulaForm;
