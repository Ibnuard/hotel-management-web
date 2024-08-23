import flatpickr from 'flatpickr';
import { useEffect } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

type TimePickerProps = {
  selector: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
};

const TimePicker: React.FC<TimePickerProps> = ({
  selector,
  title,
  value,
  onChange,
  defaultValue = '',
  disabled,
}) => {
  const GET_SELECTOR = `.${selector}`;

  useEffect(() => {
    const timePickerInstance = flatpickr(GET_SELECTOR, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i', // Time format as HH:mm
      time_24hr: true, // 24-hour format
      defaultDate: defaultValue, // Set default value if provided
      onChange: (selectedDates, dateStr) => {
        onChange(dateStr); // Call the onChange handler with the selected time
      },
    });

    return () => {
      if (Array.isArray(timePickerInstance)) {
        timePickerInstance.forEach((instance) => instance.destroy());
      } else {
        timePickerInstance.destroy();
      }
    };
  }, [defaultValue, onChange]);

  return (
    <div>
      <label className="mb-2.5 block text-black dark:text-white">{title}</label>
      <div className="relative">
        <input
          disabled={disabled}
          className={`${selector} w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          placeholder="HH:mm" // Placeholder for time format
          data-class="flatpickr-right"
          defaultValue={value} // Set initial value from props
          readOnly // Prevent direct editing, as flatpickr handles the input
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <ClockIcon className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
