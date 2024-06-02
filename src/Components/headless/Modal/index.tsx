import {
  Button,
  ButtonContainer,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from './modalComponent';

const Modal = ({ onClose, onSave, children }: ModalProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <ButtonContainer>
          <Button type='button' onClick={() => onClose()} btnType='danger'>
            Close
          </Button>
          <Button
            type='button'
            onClick={(e: any) => onSave(e)}
            btnType='default'>
            Save
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
