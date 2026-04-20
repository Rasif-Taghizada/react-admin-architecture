import React from 'react';
import { Flex, Form, Input } from 'antd';
import type { FormItemProps } from '../../types';
import styles from './index.module.css';
import AppButton from '../../../../common/components/shared/button';
import { useTranslation } from '../../../../../node_modules/react-i18next';

const RegisterFormItem: React.FC<FormItemProps> = (props) => {
  const { t } = useTranslation();
  const { onFinish, isLoading } = props;

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" className={styles.form}>
      <Form.Item name="email" rules={[{ required: true, message: t('auth.please_input_email') }]}>
        <Input placeholder={t('auth.email_address')} className={styles.input} disabled={isLoading} />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: t('auth.please_input_password') }]}>
        <Input.Password className={styles.input} placeholder={t('auth.password')} disabled={isLoading} />
      </Form.Item>

      <Form.Item name="confirm__password" rules={[{ required: true, message: t('auth.please_input_confirm_password') }]}>
        <Input.Password className={styles.input} placeholder={t('auth.confirm_password')} disabled={isLoading} />
      </Form.Item>

      <Form.Item>
        <AppButton type="submit" loading={isLoading} variant="primary" size="md" className={styles.button}>
          {isLoading ? t('auth.loading') : t('auth.register')}
        </AppButton>
      </Form.Item>

      <Form.Item>
        <AppButton href="/auth/signin" variant="primary" size="md" className={styles.link}>
          {t('auth.login')}
        </AppButton>
      </Form.Item>

      <Flex align="center" justify="center">
        <p>{t('auth.all_rights_reserved')}</p>
      </Flex>
    </Form>
  );
};

export default RegisterFormItem;
