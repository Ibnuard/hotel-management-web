import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type TProps = {
  value: string;
  setValue: (val: string) => void;
};

const SelectKetersediaan: React.FC<TProps> = ({ value, setValue }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Ketersediaan Kamar
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
            Ketersediaan Kamar
          </option>
          <option value="1" className="text-body dark:text-bodydark">
            Tersedia
          </option>
          <option value="2" className="text-body dark:text-bodydark">
            Tidak Tersedia
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <ChevronDownIcon className=" size-6" />
        </span>
      </div>
    </div>
  );
};

export default SelectKetersediaan;
