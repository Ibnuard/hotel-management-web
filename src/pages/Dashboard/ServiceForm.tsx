import {
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_ORDER_SERVICE, GET_ALL_PRODUCT } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useModal } from '../../components/Provider/ModalProvider';
import useFetch from '../../hooks/useFetch';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import QtyModal from '../../components/Modals/QtyModal';
import { formatCurrency, parseCurrency } from '../../utils/Utility';

const TABLE_HEAD = ['Nama Produk', 'Harga Produk', ''];

const ServiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // parameter
  const stateParameter = location.state;
  const KAMAR_DATA = stateParameter?.kamar;
  const TAMU_DATA = stateParameter?.tamu;
  const ADDITIONAL_SERVICE = stateParameter?.additional_service || [];

  // state

  // table state
  // state
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<any>();
  const [list, setList] = useState([]);
  const [cari, setCari] = useState('');

  const [additionalService, setAdditionalService] =
    useState<any>(ADDITIONAL_SERVICE);
  const [selectedProduct, setSelectedProduct] = useState<any>();

  // modal component
  const [qtyVisible, setQtyVisible] = useState(false);
  const [qtyType, setQtyType] = useState<'ADD' | 'EDIT'>('ADD');

  // modal
  const { setType, toggle, setOnConfirm } = useModal();

  console.log('DATA', additionalService);

  useEffect(() => {
    getAllList();
  }, [page]);

  async function getAllList() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    const { state, data, error } = await useFetch({
      url: GET_ALL_PRODUCT(page, 5, cari),
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      toggle();
      setList(data.data);
      setPageInfo(data.pagination);
    } else {
      toggle();
      setList([]);
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setPage(1); // Reset to the first page on search
      getAllList();
    }
  }

  function onAddProduct(data: any) {
    const findItem = additionalService.find((item: any) => item.id == data.id);

    if (qtyType == 'EDIT') {
      setAdditionalService((prev: any) =>
        prev.map((item: any) =>
          item.id === data.id
            ? {
                ...item,
                qty: parseInt(data.qty), // Update qty
                total_price: parseInt(data.total_price),
              }
            : item,
        ),
      );
    } else {
      if (findItem) {
        setAdditionalService((prev: any) =>
          prev.map((item: any) =>
            item.id === data.id
              ? {
                  ...item,
                  qty: parseInt(item.qty) + parseInt(data.qty), // Update qty
                  total_price:
                    item.total_price +
                    parseInt(data.qty) *
                      parseInt(parseCurrency(data.harga_product)), // Update total_price
                }
              : item,
          ),
        );
      } else {
        setAdditionalService((prev: any) => [...prev, data]);
      }
    }
  }

  function onDeleteProduct(id: string) {
    setAdditionalService((prev: any) =>
      prev.filter((item: any) => item.id !== id),
    );
    setType(MODAL_TYPE.SUCCESS);
    setOnConfirm(() => toggle());
  }

  async function onAddOrderService() {
    setType(MODAL_TYPE.LOADING);

    const body = {
      addOns: additionalService,
    };

    const { state, data, error } = await useFetch({
      url: ADD_ORDER_SERVICE(stateParameter.id),
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

  return (
    <>
      <Breadcrumb pageName="Layanan Kamar" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Tambahkan Layanan Untuk : {KAMAR_DATA?.nama_kamar} #
                {KAMAR_DATA?.nomor_kamar}
              </h3>
              <p className=" text-sm text-body">
                {`${TAMU_DATA.sex} ${TAMU_DATA.nama_depan} ${TAMU_DATA.nama_belakang} ( ${TAMU_DATA.alias} )`}
              </p>
            </div>
            <div>
              <div className="w-full md:w-72 p-4">
                <Input
                  label="Cari produk atau layanan"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={cari}
                  onChange={(e) => setCari(e.target.value)}
                  onKeyDown={handleSearchKeyDown} // Trigger search on "Enter"
                />
              </div>
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list?.map(({ id, nama_product, harga_product }, index) => {
                    const isLast = index === list.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {nama_product}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {harga_product}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Button
                            size={'sm'}
                            color={'blue'}
                            className=" normal-case"
                            onClick={() => {
                              setSelectedProduct(list[index]);
                              setQtyVisible(!qtyVisible);
                              setQtyType('ADD');
                            }}
                          >
                            Tambah
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Halaman {page} dari {pageInfo?.totalPages}
                </Typography>
                <div className="flex gap-2">
                  <Button
                    disabled={page == 1}
                    variant="outlined"
                    size="sm"
                    className=" normal-case"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  <Button
                    disabled={page == pageInfo?.totalPages}
                    variant="outlined"
                    size="sm"
                    className=" normal-case"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-row items-center justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Layanan Ditambahkan
              </h3>
              <Button
                onClick={() => {
                  setType(MODAL_TYPE.CONFIRMATION);
                  setOnConfirm(() => onAddOrderService());
                  toggle();
                }}
                color={'blue'}
                className=" normal-case"
              >
                Simpan
              </Button>
            </div>
            <div>
              {additionalService.length < 1 ? (
                <div className="flex flex-col justify-center items-center h-32 text-sm text-body">
                  Belum ada layanan ditambahkan.
                </div>
              ) : (
                <div>
                  <List className=" max-h-54 overflow-y-auto">
                    {additionalService.map((item: any, index: number) => {
                      return (
                        <ListItem
                          ripple={false}
                          className="py-1 pr-1 pl-4 text-sm"
                        >
                          {item.qty} x {item.nama_product} @{item.harga_product}
                          <ListItemSuffix>
                            <div className=" flex flex-row items-center gap-4">
                              <p className=" font-bold">
                                {formatCurrency(item.total_price)}
                              </p>
                              <IconButton
                                onClick={() => {
                                  setQtyType('EDIT');
                                  setSelectedProduct(item);
                                  setQtyVisible(!qtyVisible);
                                }}
                                variant="text"
                                color="blue-gray"
                              >
                                <PencilIcon className=" size-4" />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setType(MODAL_TYPE.CONFIRMATION);
                                  setOnConfirm(() => onDeleteProduct(item.id));
                                  toggle();
                                }}
                                variant="text"
                                color="blue-gray"
                              >
                                <TrashIcon className=" size-4 text-red-500" />
                              </IconButton>
                            </div>
                          </ListItemSuffix>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <QtyModal
        selectedItem={selectedProduct}
        visible={qtyVisible}
        type={qtyType}
        toggle={() => setQtyVisible(!qtyVisible)}
        value={(val: any) => {
          onAddProduct(val);
          setSelectedProduct({});
        }}
      />
    </>
  );
};

export default ServiceForm;
