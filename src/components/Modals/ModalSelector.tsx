import { MODAL_TYPE } from '../../common/Constants';
import { ConfirmationModal } from './ConfirmationModal';
import { LoadingModal } from './LoadingModal';
import { SuccessModal } from './SuccessModal';

type TModalSelector = {
  type: MODAL_TYPE | null;
  visible: boolean;
  toggle: () => void;
  message?: string;
  onConfirm?: () => void;
};

export function ModalSelector({
  type,
  visible,
  toggle,
  message,
  onConfirm,
}: TModalSelector) {
  if (type == MODAL_TYPE.CONFIRMATION) {
    return (
      <ConfirmationModal
        visible={visible}
        toggle={toggle}
        onConfirm={onConfirm}
      />
    );
  }

  if (type == MODAL_TYPE.SUCCESS) {
    return (
      <SuccessModal visible={visible} toggle={toggle} onConfirm={onConfirm} />
    );
  }

  return <LoadingModal visible={visible} toggle={toggle} />;
}
