import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Typography } from '@material-tailwind/react';
import { parseCurrency } from '../../utils/Utility';

const QtyModal = ({
  visible,
  toggle,
  dismissOnBackdrop,
  value,
  selectedItem,
  type,
}: {
  visible: boolean;
  toggle: any;
  dismissOnBackdrop?: boolean;
  value?: any;
  selectedItem: any;
  type: 'ADD' | 'EDIT';
}) => {
  if (!visible) return null;

  // state
  const [qty, setQty] = React.useState<any>();

  function onSaveButtonPress() {
    value({
      ...selectedItem,
      qty: qty,
      total_price:
        parseInt(qty) * parseInt(parseCurrency(selectedItem.harga_product)),
    });
    // toggle modal
    toggle();
  }

  React.useEffect(() => {
    if (type == 'EDIT') {
      setQty(selectedItem.qty);
    }
  }, [selectedItem]);

  return (
    <Dialog className="bg-transparent" open={visible} handler={toggle}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark-2 p-4 w-full">
        <div className=" flex flex-row justify-between items-center border-b border-blue-gray-800 pt-2 pb-4 mb-4.5">
          <Typography variant={'h6'} color={'black'}>
            {type == 'ADD' ? 'Masukan Jumlah' : 'Edit Jumlah'}
          </Typography>
          <XMarkIcon className=" w-5 h-5 cursor-pointer" onClick={toggle} />
        </div>
        <div className="mb-4.5">
          <input
            type={'number'}
            placeholder="Masukan jumlah"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <Button
          disabled={!qty || qty == '0'}
          color={'blue'}
          fullWidth
          className=" mt-4 normal-case"
          onClick={() => {
            toggle();
            onSaveButtonPress();
          }}
        >
          Tambahkan Produk
        </Button>
      </div>
    </Dialog>
  );
};

export default QtyModal;
