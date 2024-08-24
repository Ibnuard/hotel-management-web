import { Dialog } from '@material-tailwind/react';

interface ILoadingModal {
  visible: boolean;
  toggle: () => void;
}

export function LoadingModal({ visible, toggle }: ILoadingModal) {
  return (
    <Dialog
      className="bg-transparent grid place-items-center shadow-transparent"
      open={visible}
      handler={toggle}
      dismiss={{
        enabled: false,
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white p-4 lg:p-5 rounded-md shadow-md w-18 h-18 grid place-items-center"
      >
        <div
          className="inline-block w-8 h-8 
            border-t-2
            border-t-indigo-500  
            rounded-full 
            animate-spin"
        ></div>
      </div>
    </Dialog>
  );
}
