import { Card, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { LogoSmall } from '@/assets/icons';
import RegisterFormItem from '@/modules/auth/components/registerForm';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className="auth">
      <Card className="auth__card">
        <Flex align="center" justify="center" gap={10}>
          <LogoSmall />
          <Title level={4}>{t('auth.content_library')}</Title>
        </Flex>
        <Flex justify="center" style={{ height: '100%', marginTop: 40 }} align="center">
          <Title level={2}>{t('auth.sign_up')}</Title>
        </Flex>

        <RegisterFormItem onFinish={onFinish} isLoading={false} />
      </Card>
    </div>
  );
};

export default Register;
