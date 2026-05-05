import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import type { UsersPageHeaderProps } from '@/modules/users/types';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export const UsersPageHeader: React.FC<UsersPageHeaderProps> = ({ pageActive, orgName, onBack, onInviteClick }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 8px 10px 0px',
      }}>
      <Button type="text" icon={id && <ArrowLeftOutlined />} onClick={onBack} style={{ paddingLeft: 0 }}>
        <Text strong>{t('users.banks')} {id && `- ${orgName}`}</Text>
      </Button>

      {pageActive && (
        <Button type="default" icon={<PlusOutlined />} onClick={onInviteClick}>
          {t('users.invite_users')}
        </Button>
      )}
    </div>
  );
};
