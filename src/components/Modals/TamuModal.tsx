import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  List,
  ListItem,
  Typography,
} from '@material-tailwind/react';
import useFetch from '../../hooks/useFetch';
import { GET_ALL_TAMU } from '../../api/routes';
import { API_STATES } from '../../common/Constants';
import { useNavigate } from 'react-router-dom';

const TamuModal = ({
  visible,
  toggle,
  dismissOnBackdrop,
  value,
}: {
  visible: boolean;
  toggle: any;
  dismissOnBackdrop?: boolean;
  value?: any;
}) => {
  if (!visible) return null;

  // state
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!data.length) {
      getList();
    }
  }, [visible]);

  async function getList(key: string = '') {
    const { state, data, error } = await useFetch({
      url: GET_ALL_TAMU(1, 10, key),
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      setData(data.data);
    } else {
      setData([]);
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      getList(search);
    }
  }

  function onSaveButtonPress(selected: any) {
    value(selected);
    // toggle modal
    toggle();
  }

  return (
    <Dialog className="bg-transparent" open={visible} handler={toggle}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark-2 p-4 w-full">
        <div className=" flex flex-row justify-between items-center border-b border-blue-gray-800 pt-2 pb-4 mb-4.5">
          <Typography variant={'h6'} color={'black'}>
            Pilih Tamu ( hanya menampilkan 10 terbaru )
          </Typography>
          <XMarkIcon className=" w-5 h-5 cursor-pointer" onClick={toggle} />
        </div>
        <div className="mb-4.5">
          <input
            type="text"
            placeholder="Cari Tamu"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <List className=" max-h-90 overflow-y-auto">
          {data.map((item: any, index: number) => {
            return (
              <div onClick={() => onSaveButtonPress(item)}>
                <ListItem className=" text-black">
                  {item?.nama_depan} {item?.nama_belakang} ({item?.alias})
                </ListItem>
              </div>
            );
          })}
        </List>
        <Button
          color={'blue'}
          fullWidth
          className=" mt-4 normal-case"
          variant="outlined"
          onClick={() => {
            toggle();
            navigate('/admin/tamu');
          }}
        >
          + Tambahkan Tamu Baru
        </Button>
        <Typography
          className=" text-center mt-4"
          variant={'small'}
          color={'blue-gray'}
        >
          * Tambahkan data tamu baru jika nama tamu yang dimaksud tidak
          ditemukan.
        </Typography>
      </div>
    </Dialog>
  );
};

export default TamuModal;
