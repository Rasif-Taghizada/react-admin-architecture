import { Button, Result } from 'antd';
import React from 'react';
import { useTranslation } from '../../../../../node_modules/react-i18next';

interface ErrorPageProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();
  return (
    <Result
      status="error"
      title={t('errors.something_went_wrong')}
      subTitle={error.message}
      extra={[
        <Button type="primary" onClick={resetErrorBoundary} key="reset">
          {t('errors.try_again')}
        </Button>,
        <Button type="link" onClick={() => alert(error.stack)} key="details">
          {t('errors.show_error_details')}
        </Button>,
      ]}
    />
  );
};

export default ErrorPage;
