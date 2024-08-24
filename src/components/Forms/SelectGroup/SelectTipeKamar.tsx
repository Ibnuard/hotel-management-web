import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useFetch from '../../../hooks/useFetch';
import { GET_ALL_TIPE_KAMAR } from '../../../api/routes';
import { API_STATES } from '../../../common/Constants';

type TProps = {
  value: string;
  setValue: (val: string) => void;
};

const SelectTipeKamar: React.FC<TProps> = ({ value, setValue }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [list, setList] = useState([]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const { state, data, error } = await useFetch({
      url: GET_ALL_TIPE_KAMAR(1, 100, ''),
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      setList(data.data);
    } else {
      setList(data);
    }
  }

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Tipe Kamar
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Tipe Kamar
          </option>
          {list?.map((item: any, index: number) => {
            return (
              <option value={item.id} className="text-body dark:text-bodydark">
                {item.tipe}
              </option>
            );
          })}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <ChevronDownIcon className=" size-6" />
        </span>
      </div>
    </div>
  );
};

export default SelectTipeKamar;
