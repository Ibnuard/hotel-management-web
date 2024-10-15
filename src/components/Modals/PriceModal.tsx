import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Typography } from '@material-tailwind/react';
import { handleHargaChange, parseCurrency } from '../../utils/Utility';

const PriceModal = ({
  visible,
  toggle,
  data,
  value,
}: {
  visible: boolean;
  toggle: any;
  data: any;
  value?: any;
}) => {
  if (!visible) return null;

  // state
  const [price, setPrice] = React.useState<any>();

  function onSave() {
    value({
      ...data,
      harga_paket: price,
    });
    setPrice(null);

    toggle();
  }

  return (
    <Dialog className="bg-transparent" open={visible} handler={toggle}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark-2 p-4 w-full">
        <div className=" flex flex-row justify-between items-center border-b border-blue-gray-800 pt-2 pb-4 mb-4.5">
          <Typography variant={'h6'} color={'black'}>
            Masukan Harga
          </Typography>
          <XMarkIcon className=" w-5 h-5 cursor-pointer" onClick={toggle} />
        </div>
        <div className="mb-4.5">
          <input
            type={'text'}
            placeholder="Masukan harga"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={price}
            onChange={(e) => handleHargaChange(e, setPrice)}
          />
        </div>
        <Button
          disabled={!price}
          color={'blue'}
          fullWidth
          className=" mt-4 normal-case"
          onClick={() => {
            toggle();
            onSave();
          }}
        >
          Simpan
        </Button>
      </div>
    </Dialog>
  );
};

export default PriceModal;
