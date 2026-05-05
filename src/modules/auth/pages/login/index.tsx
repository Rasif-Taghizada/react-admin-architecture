import { Card, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { LogoSmall } from '@/assets/icons';
import LoginFormItem from '@/modules/auth/components/loginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/common/store';
import type { LoginData } from '@/common/types';
import { login } from '@/common/store/slices/authSlices';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;

  // Get access token from Redux store
  const accessToken = useSelector((state: RootState) => state.auth.access_token);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const presetEmail = useMemo(() => {
    const raw = searchParams.get('first-loginattempBy');
    return raw?.trim() || undefined;
  }, [searchParams]);

  const onFinish = async (values: LoginData) => {
    const data = { ...values, deviceId: 'browser', deviceType: 'browser', deviceName: 'browser' };
    await dispatch(login(data));
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  return (
    <div className="auth">
      <Card className="auth__card">
        <Flex align="center" justify="center" gap={10}>
          <LogoSmall />
          <Title level={4}>Mc Caspian Project</Title>
        </Flex>
        <Flex justify="center" style={{ height: '100%', marginTop: 40 }} align="center">
          <Title level={2}>{t('auth.login_to_account')}</Title>
        </Flex>

        <LoginFormItem onFinish={onFinish} isLoading={isLoading} presetEmail={presetEmail}/>
      </Card>
    </div>
  );
};

export default Login;
