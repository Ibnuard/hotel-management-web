import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@material-tailwind/react';

const FileModal = ({
  visible,
  toggle,
  data,
}: {
  visible: boolean;
  toggle: any;
  data: string;
}) => {
  return (
    <Dialog className="bg-transparent" open={visible} handler={toggle}>
      <div className="rounded-lg border border-stroke bg-white shadow-default p-4 w-full max-h-[calc(100vh-4rem)] flex flex-col">
        {' '}
        {/* Use flex and column direction */}
        <div className="flex flex-row items-center border-b border-blue-gray-800 py-2 mb-4.5">
          <div className="flex-1">Foto Identitas</div>
          <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={toggle} />
        </div>
        {/* Make the following div take remaining space and allow overflow */}
        <div className="flex-1 overflow-auto">
          <img
            className="w-full h-full object-contain object-center"
            src={data}
            alt="preview image"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default FileModal;
