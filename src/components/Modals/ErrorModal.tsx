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
};

export function ErrorModal({ visible, toggle, onConfirm }: TModalErrorProps) {
  return (
    <>
      <Dialog open={visible} size={'xs'} handler={toggle}>
        <DialogHeader>Gagal</DialogHeader>
        <DialogBody>Ada sesuatu yang tidak beres. mohon coba lagi!</DialogBody>
        <DialogFooter>
          <Button
            className=" w-full"
            variant={'filled'}
            color={'red'}
            onClick={() => {
              toggle();
              onConfirm ? onConfirm() : null;
            }}
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
