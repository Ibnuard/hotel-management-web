import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type TJumlahTamuProps = {
  type: 'user' | 'admin';
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean; // Added disabled prop
};

const SelectJumlahTamuDewasa: React.FC<TJumlahTamuProps> = ({
  type,
  value,
  setValue,
  disabled = false, // Default to false
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {type == 'user' ? 'Jumlah Tamu Dewasa' : 'Maksimal Jumlah Tamu Dewasa'}
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
          } ${disabled ? 'opacity-70 cursor-default' : ''}`}
          disabled={disabled} // Set disabled attribute
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Tamu dewasa
          </option>
          <option value={1} className="text-body dark:text-bodydark">
            1 Orang
          </option>
          <option value={2} className="text-body dark:text-bodydark">
            2 Orang
          </option>
          <option value={3} className="text-body dark:text-bodydark">
            3 Orang
          </option>
          <option value={4} className="text-body dark:text-bodydark">
            4 Orang
          </option>
          <option value={5} className="text-body dark:text-bodydark">
            5 Orang
          </option>
        </select>

        {!disabled && (
          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
            <ChevronDownIcon className=" size-6" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectJumlahTamuDewasa;
