import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../components/Provider/ModalProvider';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import useFetch from '../../hooks/useFetch';
import { GET_CHECKOUT_KAMAR, GET_KAMAR_STATS } from '../../api/routes';

const TABLE_HEAD = [
  'Nama Tamu',
  'Kamar',
  'Tanggal Check In',
  'Tangal Check Out',
  '',
];

const InHouse: React.FC = () => {
  // state
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<any>();
  const [kamarList, setKamarList] = useState([]);
  const [cari, setCari] = useState('');

  const [kamarStats, setKamarStats] = useState<any>();

  // navigation
  const navigate = useNavigate();

  // modal
  const { setType, toggle } = useModal();

  useEffect(() => {
    getAllKamar();
    getKamarStats();
  }, [page]);

  async function getAllKamar() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    const { state, data, error } = await useFetch({
      url: GET_CHECKOUT_KAMAR(page, 5, cari),
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      toggle();
      setKamarList(data.data);
      setPageInfo(data.pagination);
    } else {
      toggle();
      setKamarList([]);
      setPageInfo(null);
    }
  }

  async function getKamarStats() {
    const { state, data, error } = await useFetch({
      url: GET_KAMAR_STATS,
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      setKamarStats(data);
    } else {
      setKamarStats(null);
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setPage(1); // Reset to the first page on search
      getAllKamar();
    }
  }

  function onEditKamar(item: any) {
    navigate(`/order/checkin/edit`, { state: item });
  }

  function getNamaTamu(item: any) {
    return `${item.tamu.sex} ${item.tamu.nama_depan} ${item.tamu.nama_belakang}`;
  }

  function getNamaKamar(item: any) {
    return `${item.kamar.nama_kamar} #${item.kamar.nomor_kamar}`;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Kamar Tersedia" total={kamarStats?.ready || 0}>
          <ArchiveBoxArrowDownIcon className=" size-6" />
        </CardDataStats>
        <CardDataStats
          title="Kamar Tidak tersedia"
          total={kamarStats?.unready || 0}
        >
          <ArchiveBoxXMarkIcon className=" size-6" />
        </CardDataStats>
        <CardDataStats title="Kamar Terpakai" total={kamarStats?.used || 0}>
          <ArchiveBoxXMarkIcon className=" size-6" />
        </CardDataStats>
        <CardDataStats title="Tamu In House" total={pageInfo?.totalItems || 0}>
          <ArchiveBoxXMarkIcon className=" size-6" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-1 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Tamu In House
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Melihat informasi semua tamu in house
                </Typography>
              </div>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Cari"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                onKeyDown={handleSearchKeyDown} // Trigger search on "Enter"
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
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
                {kamarList.map((item: any, index: number) => {
                  const isLast = index === kamarList.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={item.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {getNamaTamu(item)}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {getNamaKamar(item)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.tgl_checkin} {item.waktu_checkin}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.tgl_checkout} {item?.waktu_checkout}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            onClick={() => onEditKamar(kamarList[index])}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default InHouse;
