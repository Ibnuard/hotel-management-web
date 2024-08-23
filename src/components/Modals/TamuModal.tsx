import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  List,
  ListItem,
  Typography,
} from '@material-tailwind/react';

const SAMPLE_TAMU = [
  {
    nama: 'Mr. Iben',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
  {
    nama: 'Mr. Bono',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
  {
    nama: 'Mr. Juno',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
  {
    nama: 'Mr. Iben',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
  {
    nama: 'Mr. Bono',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
  {
    nama: 'Mr. Juno',
    alamat: {
      kabupaten: 'cil',
      provinsi: 'jaw',
      jalan: 'maw',
    },
    ktp: '11212121212',
    fotoktp: '121212',
    region: 'indonesia',
    nohp: '0857',
    email: 'email@gmail.com',
  },
];

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

  React.useEffect(() => {
    if (!data.length) {
      getBankList();
    }
  }, [visible]);

  async function getBankList() {
    setData(SAMPLE_TAMU);
  }

  function onFiltered(key: string) {
    const filtered = data.filter(
      (item: { nama: string; alamat: object; ktp: string }) => {
        return item.nama.toLowerCase().includes(key.toLowerCase());
      },
    );
    return filtered;
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
          />
        </div>
        <List className=" max-h-90 overflow-y-auto">
          {onFiltered(search) &&
            onFiltered(search).map((item: any, index: number) => {
              return (
                <div onClick={() => onSaveButtonPress(item)}>
                  <ListItem className=" text-black">{item?.nama}</ListItem>
                </div>
              );
            })}
        </List>
        <Button
          color={'blue'}
          fullWidth
          className=" mt-4 normal-case"
          variant="outlined"
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
