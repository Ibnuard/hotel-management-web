import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type TModalConfirmationProps = {
  visible: boolean;
  toggle: () => void;
  onConfirm?: () => void;
};

export function ConfirmationModal({
  visible,
  toggle,
  onConfirm,
}: TModalConfirmationProps) {
  return (
    <>
      <Dialog open={visible} size={'xs'} handler={toggle}>
        <DialogHeader>Konfirmasi</DialogHeader>
        <DialogBody>Apakah anda yakin ingin melanjutkan aksi ini?</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggle} className="mr-1">
            <span>Batalkan</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onConfirm}>
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
