import React, { useEffect } from 'react';
import { Flex, Form, Input } from 'antd';
import type { FormItemProps } from '../../types';
import styles from './index.module.css';
import AppButton from '../../../../common/components/shared/button';
import { useTranslation } from '../../../../../node_modules/react-i18next';

const LoginFormItem: React.FC<FormItemProps> = (props) => {
  const { t } = useTranslation();
  const { onFinish, isLoading, presetEmail } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (presetEmail) {
      form.setFieldsValue({ emailAddress: presetEmail });
    }
  }, [presetEmail, form]);

  return (
    <Form
      name="login"
      initialValues={{ emailAddress: presetEmail, remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}>
      <Form.Item name="emailAddress" rules={[{ required: true, message: t('auth.please_input_email') }]}>
        <Input placeholder={t('auth.email_address')} className={styles.input} disabled={isLoading} />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: t('auth.please_input_password') }]}>
        <Input.Password className={styles.input} placeholder={t('auth.password')} disabled={isLoading} />
      </Form.Item>

      <Form.Item>
        <AppButton type="submit" loading={isLoading} variant="primary" size="md" className={styles.button}>
          {isLoading ? t('auth.loading') : t('auth.login')}
        </AppButton>
      </Form.Item>

      {/* <Form.Item>
        <AppButton href="/auth/create-account" variant="primary" size="md" className={styles.link}>
          {t('auth.register')}
        </AppButton>
      </Form.Item> */}

      <Flex align="center" justify="center">
        <p>{t('auth.all_rights_reserved')}</p>
      </Flex>
    </Form>
  );
};

export default LoginFormItem;
