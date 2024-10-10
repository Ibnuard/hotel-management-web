import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type TModalErrorProps = {
  visible: boolean;
  toggle: () => void;
  onConfirm?: () => void;
  message?: string;
};

export function ErrorModal({
  visible,
  toggle,
  onConfirm,
  message,
}: TModalErrorProps) {
  return (
    <>
      <Dialog open={visible} size={'xs'} handler={toggle}>
        <DialogHeader>Gagal</DialogHeader>
        <DialogBody>
          {message || 'Ada sesuatu yang tidak beres. mohon coba lagi!'}
        </DialogBody>
        <DialogFooter>
          <Button
            className=" w-full"
            variant={'filled'}
            color={'red'}
            onClick={onConfirm}
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
