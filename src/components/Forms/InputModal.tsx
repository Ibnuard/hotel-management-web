import React from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

type TInputModalProps = {
  title: string;
  placeholder: string;
  value: string;
  onClick: () => void;
  onXClick: () => void;
  disabled?: boolean; // Add disabled prop
};

const InputModal: React.FC<TInputModalProps> = ({
  title,
  placeholder,
  value,
  onClick,
  onXClick,
  disabled = false, // Default to false
}) => {
  const textColor = value ? 'text-black' : 'text-bodydark2';
  const cursorStyle = disabled ? 'cursor-default' : 'cursor-pointer';
  const textColorStyle = disabled ? 'text-gray-400' : textColor;
  const borderColor = disabled ? 'border-gray-300' : 'border-stroke';
  const bg = disabled ? 'opacity-50' : '';

  function _renderRightIcon() {
    if (disabled) {
      return;
    }

    if (value) {
      return <XMarkIcon onClick={onXClick} className="size-6 cursor-pointer" />;
    }

    return <ChevronDownIcon className={`size-6 ${cursorStyle}`} />;
  }

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">{title}</label>

      <div className={`relative z-20 bg-transparent dark:bg-form-input ${bg}`}>
        <div
          onClick={!disabled ? onClick : undefined}
          className={`${textColorStyle} ${cursorStyle} min-h-12 w-full rounded ${borderColor} border-[1.5px] bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
        >
          {value || placeholder}
        </div>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          {_renderRightIcon()}
        </span>
      </div>
    </div>
  );
};

export default InputModal;
