// ChangePassModal.tsx
import React from 'react';
import { Input, Form } from 'antd';
import AppModal from '@/common/components/shared/modals';
import AppButton from '@/common/components/shared/button';
import { useTranslation } from 'react-i18next';

interface ChangePassModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isLoading: boolean;
  form: any;
  handlePasswordSubmit: (values: { currentPassword: string; newPassword: string; newPasswordRepeat: string }) => void;
}

const ChangePassModal: React.FC<ChangePassModalProps> = ({
  modalOpen,
  setModalOpen,
  form,
  isLoading,
  handlePasswordSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <AppModal
      open={modalOpen}
      title={t('settings.change_password')}
      onCancel={() => {
        setModalOpen(false);
        form?.resetFields?.();
      }}
      width={404}
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={handlePasswordSubmit} style={{ marginTop: 20 }}>
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: t('settings.please_enter_your_old_password') }]}
        >
          <Input.Password
            placeholder={t('settings.old_password')}
            style={{ backgroundColor: '#f5f5f5', border: 'none', padding: '12px 14px' }}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: t('settings.please_enter_your_new_password') }]}
        >
          <Input.Password
            placeholder={t('settings.new_password')}
            style={{ backgroundColor: '#f5f5f5', border: 'none', padding: '12px 14px' }}
          />
        </Form.Item>

        <Form.Item
          name="newPasswordRepeat"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: t('settings.please_confirm_your_new_password') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                return Promise.reject(new Error(t('settings.passwords_do_not_match')));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t('settings.confirm_password')}
            style={{ backgroundColor: '#f5f5f5', border: 'none', padding: '12px 14px' }}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
          <AppButton
            type="submit"
            loading={isLoading}
            variant="primary"
            size="md"
            style={{
              width: '100%',
              height: 44,
              cursor: 'pointer',
              borderRadius: 999,
              backgroundColor: 'var(--color--primary)',
              borderColor: 'var(--color--primary)',
              fontWeight: 500,
            }}
          >
            {isLoading ? t('settings.doing') : t('settings.done')}
          </AppButton>
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default ChangePassModal;
