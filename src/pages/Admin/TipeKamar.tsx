import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  BuildingOfficeIcon,
  PencilIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { GET_ALL_TIPE_KAMAR } from '../../api/routes';
import { API_STATES, MODAL_TYPE } from '../../common/Constants';
import { useModal } from '../../components/Provider/ModalProvider';

const TABLE_HEAD = ['Tipe Kamar', ''];

const TipeKamar = () => {
  // state
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<any>();
  const [list, setList] = useState([]);
  const [cari, setCari] = useState('');

  // navigation
  const navigate = useNavigate();

  // modal
  const { setType, toggle } = useModal();

  useEffect(() => {
    getAllList();
  }, [page]);

  async function getAllList() {
    setType(MODAL_TYPE.LOADING);
    toggle();

    const { state, data, error } = await useFetch({
      url: GET_ALL_TIPE_KAMAR(page, 5, cari),
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

  function onEditData(item: any) {
    navigate(`/admin/tipe-kamar/${item.id}`, { state: item });
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setPage(1); // Reset to the first page on search
      getAllList();
    }
  }

  return (
    <>
      <Breadcrumb pageName="Manajemen Tipe Kamar" />

      <div className="w-full">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Daftar Tipe Kamar
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Melihat informasi semua tipe kamar yang ada
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  color={'blue'}
                  className="flex items-center gap-3 normal-case"
                  size="sm"
                  onClick={() => navigate('/admin/tipe-kamar/input')}
                >
                  <BuildingOfficeIcon strokeWidth={2} className="h-4 w-4" />{' '}
                  Tambah Tipe Kamar Baru
                </Button>
              </div>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Cari tipe kamar"
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
                {list?.map(({ id, tipe }, index) => {
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
                              {tipe}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            onClick={() => onEditData(list[index])}
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

export default TipeKamar;
