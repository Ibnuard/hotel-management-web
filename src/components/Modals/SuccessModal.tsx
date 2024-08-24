import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type TModalSuccessProps = {
  visible: boolean;
  toggle: () => void;
  onConfirm?: () => void;
};

export function SuccessModal({
  visible,
  toggle,
  onConfirm,
}: TModalSuccessProps) {
  return (
    <>
      <Dialog open={visible} size={'xs'} handler={toggle}>
        <DialogHeader>Sukses</DialogHeader>
        <DialogBody>Aksi telah sukses dilakukan.</DialogBody>
        <DialogFooter>
          <Button
            className=" w-full"
            variant={'filled'}
            color={'blue'}
            onClick={onConfirm}
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
