import React from "react";
import { Button, Result } from "antd";
import { useMoveBack } from "../../../utils/hooks/useMoveBack";
import { useTranslation } from '../../../../../node_modules/react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigateBack = useMoveBack(); 

  return (
    <Result
      status="404"
      title={t('common.page_not_found')}
      subTitle={t('common.page_not_found_description')}
      extra={<Button type="primary" onClick={navigateBack}>{t('common.back_home')}</Button>}
    />
  );
};

export default NotFound;
