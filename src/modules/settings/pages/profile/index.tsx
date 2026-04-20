// ProfileSettings.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Input, Button, Select, Switch, Typography, Space, Form } from 'antd';
import { GlobalOutlined, BellOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../../common/store';
import { updateNotificationAccess, updateUser } from '../../../../common/store/slices/authSlices';
import ChangePassModal from '../../components/modals/changePass';
import { changePasswordService } from '../../../../common/libs/services/authService';
import {
  updateUserNotificationAccessService,
  updateUserService,
} from '../../../../common/libs/services/userService';
import type { UpdateUserParams } from '../../../../common/types';
import { openNotification } from '../../../../common/components/shared/notification';
import { validateName } from '../../../../common/utils/helper/error';

const { Title, Text } = Typography;

const ProfileSettings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [profileForm] = Form.useForm();
  const [passForm] = Form.useForm();

  const initialProfileValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    }),
    [user?.firstName, user?.lastName]
  );

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(user?.notificationsEnabled ?? true);
  const [modalOpen, setModalOpen] = useState(false);

  const [isPassLoading, setIsPassLoading] = useState(false);
  const [isUpdatingNotification, setIsUpdatingNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!user) return;

    setNotificationsEnabled(user.notificationsEnabled ?? true);

    profileForm.setFieldsValue({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    });

    setHasChanges(false);
  }, [user, profileForm]);

  const handleFormChange = (_changed: any, allValues: any) => {
    const initialFirstName = user?.firstName || '';
    const initialLastName = user?.lastName || '';
    setHasChanges(
      (allValues.firstName ?? '') !== initialFirstName || (allValues.lastName ?? '') !== initialLastName
    );
  };

  const handlePasswordSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
  }) => {
    setIsPassLoading(true);
    try {
      await changePasswordService(values);

      openNotification({
        type: 'success',
        title: t('settings.success'),
        content: t('settings.password_changed_successfully'),
      });

      setModalOpen(false);
      passForm.resetFields();
    } catch (err) {
      console.error('Error changing password:', err);

      const apiMsg =
        (err as any)?.response?.data?.message?.[0]?.errorMessage ||
        (err as any)?.response?.data?.message ||
        t('settings.failed_to_change_password');

      openNotification({
        type: 'error',
        title: t('settings.error'),
        content: String(apiMsg),
      });
    } finally {
      setIsPassLoading(false);
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  const handleNotificationChange = async (checked: boolean) => {
    if (!user?.id) return;

    setIsUpdatingNotification(true);
    try {
      await updateUserNotificationAccessService(user.id, checked);

      setNotificationsEnabled(checked);
      dispatch(updateNotificationAccess(checked));

      openNotification({
        type: 'success',
        title: t('settings.success'),
        content: t('settings.notification_updated_successfully'),
      });
    } catch (err) {
      console.error('Error updating notification access:', err);

      const apiMsg =
        (err as any)?.response?.data?.message?.[0]?.errorMessage ||
        (err as any)?.response?.data?.message ||
        t('settings.failed_to_update_notification');

      openNotification({
        type: 'error',
        title: t('settings.error'),
        content: String(apiMsg),
      });

      // revert
      setNotificationsEnabled((prev) => !prev);
    } finally {
      setIsUpdatingNotification(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const values = await profileForm.validateFields();

      const updateData: UpdateUserParams = {
        tenantId: user.tenantId,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: user.phoneNumber,
        emailAddress: user.emailAddress,
        role: user.role,
      };

      await updateUserService(user.id, updateData);

      dispatch(
        updateUser({
          firstName: values.firstName,
          lastName: values.lastName,
        })
      );

      setHasChanges(false);

      openNotification({
        type: 'success',
        title: t('settings.success'),
        content: t('settings.profile_updated_successfully'),
      });
    } catch (err: any) {
      console.error('Error updating profile2:', err);

      const data = err?.response?.data;
      const validationMessages = Array.isArray(data?.message)
        ? data.message
          .map((m: any) => m?.errorMessage)
          .filter(Boolean)
        : [];

      const apiMsg =
        validationMessages.length > 0
          ? validationMessages.join(' ')
          : data?.message || err?.message || t('settings.failed_to_update_profile');

      openNotification({
        type: 'error',
        title: t('settings.error'),
        content: String(apiMsg),
      });
    }
    finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    profileForm.setFieldsValue({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    });
    setHasChanges(false);
  };

  return (
    <>
      <Title level={3} style={{ marginBottom: 32, fontWeight: 500 }}>
        {t('settings.profile_settings')}
      </Title>

      <Form
        form={profileForm}
        initialValues={initialProfileValues}
        onValuesChange={handleFormChange}
        layout="vertical"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ width: '50%' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Form.Item
                name="firstName"
                label={<Text type="secondary" style={{ fontSize: 12 }}>{t('settings.name')}</Text>}
                style={{ flex: 1, marginBottom: 0 }}
                rules={[
                  { required: true, message: t('settings.please_enter_name') },
                  { validator: validateName('FirstName') },
                ]}
              >
                <Input style={{ borderRadius: 8, padding: 12 }} />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={<Text type="secondary" style={{ fontSize: 12 }}>{t('settings.surname')}</Text>}
                style={{ flex: 1, marginBottom: 0 }}
                rules={[
                  { required: true, message: t('settings.please_enter_surname') },
                  { validator: validateName('LastName') },
                ]}
              >
                <Input style={{ borderRadius: 8, padding: 12 }} />
              </Form.Item>

            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary" style={{ fontSize: 12, marginBottom: 8, display: 'block' }}>
                  {t('settings.email')}
                </Text>
                <Input
                  value={user?.emailAddress || ''}
                  disabled
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: 12,
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <Text type="secondary" style={{ fontSize: 12, marginBottom: 8, display: 'block' }}>
                  {t('settings.password')}
                </Text>
                <Input.Password
                  value="************"
                  disabled
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: 12,
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <Button type="link" style={{ color: '#999', padding: 0 }} onClick={() => setModalOpen(true)}>
                {t('settings.change_password')}
              </Button>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Button
                type="primary"
                onClick={handleSaveChanges}
                loading={isSaving}
                disabled={!hasChanges || isSaving}
                style={{
                  backgroundColor: hasChanges ? '#d97757' : '#d9d9d9',
                  borderColor: hasChanges ? '#d97757' : '#d9d9d9',
                  borderRadius: 8,
                }}
              >
                {t('settings.save_changes')}
              </Button>

              <Button
                onClick={handleCancel}
                disabled={!hasChanges || isSaving}
                style={{ borderRadius: 8 }}
              >
                {t('settings.cancel')}
              </Button>
            </div>
          </div>

          <Title level={3} style={{ marginTop: 32, marginBottom: 24, fontWeight: 500 }}>
            {t('settings.general_settings')}
          </Title>

          <Card style={{ borderRadius: 12, border: '1px solid #e0e0e0', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <GlobalOutlined style={{ fontSize: 20, color: '#666' }} />
                <Text style={{ fontSize: 15 }}>{t('settings.language')}</Text>
              </Space>
              <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                style={{ width: 150 }}
                options={[
                  { value: 'en', label: t('settings.english') },
                  { value: 'az', label: t('settings.azerbaijani') },
                  { value: 'ru', label: t('settings.russian') },
                ]}
              />
            </div>
          </Card>

          <Card style={{ borderRadius: 12, border: '1px solid #e0e0e0', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <BellOutlined style={{ fontSize: 20, color: '#666' }} />
                <Text style={{ fontSize: 15 }}>{t('settings.notifications')}</Text>
              </Space>

              <Switch
                checked={notificationsEnabled}
                onChange={handleNotificationChange}
                loading={isUpdatingNotification}
                disabled={isUpdatingNotification}
                style={{ backgroundColor: notificationsEnabled ? '#d97757' : '#d9d9d9' }}
              />
            </div>
          </Card>
        </Space>
      </Form>

      <ChangePassModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        form={passForm}
        handlePasswordSubmit={handlePasswordSubmit}
        isLoading={isPassLoading}
      />
    </>
  );
};

export default ProfileSettings;
