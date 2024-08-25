import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function PasswordInput({
  value,
  setValue,
  label,
}: {
  value: string;
  setValue: any;
  label: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Masukan password"
          value={value}
          onChange={setValue}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {!showPassword ? (
            <EyeIcon className=" size-6" />
          ) : (
            <EyeSlashIcon className=" size-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
