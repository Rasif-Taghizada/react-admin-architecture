import React from "react";
import { Button, Typography } from "antd";
import AppModal from "..";
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

type DeleteModalProps = {
  open: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  itemName,
  onConfirm,
  onCancel,
  confirmLoading,
}) => {
  const { t } = useTranslation();
  const title = t('common.delete_permanently');

  const description = itemName
    ? t('common.the_object_name_will_be_permanently_deleted').replace('{name}', itemName)
    : t('common.the_object_will_be_permanently_deleted');

  return (
    <AppModal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <Text>{description}</Text>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <Button
          type="primary"
          style={{ backgroundColor: 'var(--color--primary)', borderColor: 'var(--color--primary)' }}
          onClick={onCancel}
        >
          {t('common.cancel')}
        </Button>

        <Button
          danger
          ghost
          loading={confirmLoading}
          onClick={onConfirm}
        >
          {t('common.delete')}
        </Button>
      </div>
    </AppModal>
  );
};

export default DeleteModal;
