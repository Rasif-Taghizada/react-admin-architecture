import React from "react";
import { Modal as AntModal } from "antd";
import type { AppModalProps } from "@/common/components/shared/modals/type";


const AppModal: React.FC<AppModalProps> = ({
  open,
  title,
  width,
  height,
  onOk,
  onCancel,
  footer,
  children,
  modalStyle,
}) => {
  return (
    <AntModal
      open={open}
      title={title}
      width={width}
      height={height}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      centered
      maskClosable={true} //
      style={modalStyle}
    >
      {children}
    </AntModal>
  );
};

export default AppModal;
