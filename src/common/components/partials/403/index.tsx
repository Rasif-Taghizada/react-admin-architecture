import React from "react";

import { Button, Result } from "antd";
import { useMoveBack } from "@/common/utils/hooks/useMoveBack";
import { useTranslation } from 'react-i18next';


const Forbidden403: React.FC = () => {
  const { t } = useTranslation();
  const navigateBack = useMoveBack();
  return (
    <Result
      status="403"
      title={t('common.forbidden')}
      subTitle={t('common.forbidden_description')}
      extra={
        <Button type="primary" onClick={navigateBack}>
          {t('common.back_home')}
        </Button>
      }
    />
  );
};

export default Forbidden403;
