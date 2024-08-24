import React, { ReactNode } from 'react';
import { useModalStore } from '../../hooks/useModalStore';
import { ModalSelector } from '../Modals/ModalSelector';

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { visible, type, message, toggle, onConfirm } = useModal();
  return (
    <>
      {children}
      <ModalSelector
        visible={visible}
        type={type}
        message={message}
        toggle={toggle}
        onConfirm={onConfirm}
      />
    </>
  );
};

export const useModal = () => {
  return useModalStore();
};
