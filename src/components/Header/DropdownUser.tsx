import { useState } from 'react';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';
import { PowerIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setUser, setToken } = useAuth();

  function onLogout(e: any) {
    e.preventDefault();
    setUser(null);
    setToken(null);
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Thomas Anree
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <ChevronDownIcon className=" size-6" />
      </div>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <button
            onClick={onLogout}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <PowerIcon className=" size-6" />
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
