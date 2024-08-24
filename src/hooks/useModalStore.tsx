import { create } from 'zustand';
import { MODAL_TYPE } from '../common/Constants';

interface ModalState {
  visible: boolean;
  message: string;
  type: MODAL_TYPE | null;
  toggle: () => void;
  onConfirm: () => void;
  setOnConfirm: (onConfirm: () => void) => void;
  setMessage: (message: string) => void;
  setType: (type: MODAL_TYPE) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  visible: false,
  message: '',
  type: null as MODAL_TYPE | null,
  onConfirm: () => {},
  setOnConfirm: (onConfirm: () => void) => set({ onConfirm }),
  toggle: () => set((state) => ({ visible: !state.visible })),
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
}));
