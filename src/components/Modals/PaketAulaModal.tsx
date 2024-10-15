import React from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from '@material-tailwind/react';
import { parseCurrency } from '../../utils/Utility';
import useFetch from '../../hooks/useFetch';
import { GET_ALL_PAKET } from '../../api/routes';
import { API_STATES } from '../../common/Constants';
import PriceModal from './PriceModal';

const PaketAulaModal = ({
  visible,
  toggle,
  dismissOnBackdrop,
  value,
  selectedItem,
}: {
  visible: boolean;
  toggle: any;
  dismissOnBackdrop?: boolean;
  value?: any;
  selectedItem: any;
}) => {
  if (!visible) return null;

  const [list, setList] = React.useState<any>([]);

  // price mocal
  const [selectedPaket, setSelectedPaket] = React.useState<any>(null);

  React.useEffect(() => {
    if (!list.length) {
      getList();
    }
  }, [visible]);

  async function getList(key: string = '') {
    const { state, data, error } = await useFetch({
      url: GET_ALL_PAKET(1, 10, ''),
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      const idMapping = selectedItem.map((item: any) => {
        return item.id;
      });

      const result = [...data.data];

      if (idMapping.length > 0) {
        const filteredResult = result.filter((item) => {
          return !idMapping.includes(item.id);
        });

        setList(filteredResult);
      } else {
        setList(data.data);
      }
    } else {
      setList([]);
    }
  }

  function onAddItem(paket: any) {
    setSelectedPaket(paket);
  }

  function onAddFromPrice(paket: any) {
    value(paket);
    toggle();
  }

  return (
    <Dialog className="bg-transparent" open={visible} handler={toggle}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark-2 p-4 w-full">
        <div className=" flex flex-row justify-between items-center border-b border-blue-gray-800 pt-2 pb-4 mb-4.5">
          <Typography variant={'h6'} color={'black'}>
            Pilih Paket Aula
          </Typography>
          <XMarkIcon className=" w-5 h-5 cursor-pointer" onClick={toggle} />
        </div>
        <div className="w-full max-h-90 overflow-y-auto">
          <List>
            {list.map((item: any, index: number) => {
              return (
                <ListItem ripple={false} className="p-4 text-sm">
                  {item.nama_paket} @ {item.harga_paket} / pax
                  <ListItemSuffix>
                    <Button
                      onClick={() => onAddItem(item)}
                      size={'sm'}
                      color={'blue'}
                      className=" normal-case"
                    >
                      Tambah
                    </Button>
                  </ListItemSuffix>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <PriceModal
        visible={selectedPaket}
        data={selectedPaket}
        toggle={() => setSelectedPaket(null)}
        value={(data: any) => onAddFromPrice(data)}
      />
    </Dialog>
  );
};

export default PaketAulaModal;
