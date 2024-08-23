import flatpickr from 'flatpickr';
import { useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

type DatePickerProps = {
  selector: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selector,
  title,
  value,
  onChange,
  defaultValue = '',
  disabled,
}) => {
  const GET_SELECTOR = `.${selector}`;

  useEffect(() => {
    const datePickerInstance = flatpickr(GET_SELECTOR, {
      mode: 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d', // Date format as YYYY-MM-DD
      defaultDate: defaultValue, // Set default value if provided
      onChange: (selectedDates, dateStr) => {
        onChange(dateStr); // Call the onChange handler with the selected date
      },
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });

    // Cleanup: destroy the flatpickr instance(s) when the component unmounts
    return () => {
      if (Array.isArray(datePickerInstance)) {
        datePickerInstance.forEach((instance) => instance.destroy());
      } else {
        datePickerInstance.destroy();
      }
    };
  }, [defaultValue, onChange]);

  return (
    <div>
      <label className="mb-2.5 block text-black dark:text-white">{title}</label>
      <div className={`relative`}>
        <input
          disabled={disabled}
          className={`${selector} w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
          placeholder="YYYY-MM-DD" // Placeholder for date format
          data-class="flatpickr-right"
          defaultValue={value} // Set initial value from props
          readOnly // Prevent direct editing, as flatpickr handles the input
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <CalendarIcon className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
