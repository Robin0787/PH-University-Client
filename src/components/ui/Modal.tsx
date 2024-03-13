import { Modal } from "antd";
import { ReactNode } from "react";

type TModalProps = {
  button: ReactNode;
  children: ReactNode;
  openModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const ModalBox = ({
  button,
  children,
  openModal,
  handleOk,
  handleCancel,
}: TModalProps) => {
  return (
    <>
      {button}
      <Modal
        title="Basic Modal"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalBox;
