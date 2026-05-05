import React from 'react';
import { Button, Space, Avatar, Typography, Col, Card, List } from 'antd';
import { UserOutlined, FolderOutlined, FilePdfOutlined } from '@ant-design/icons';
import type { UserActivity, UserDetailData, UserDocumentShare } from '@/modules/users/types';
import { formatDate } from '@/common/utils/helper/formatDate';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

interface UserInfoProps {
  user: UserDetailData;
  userDocumentShare: UserDocumentShare[];
  userActivity: UserActivity[];
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const { t } = useTranslation();
  const { user, userDocumentShare, userActivity } = props;

  const getActivityTitle = (activity: UserActivity) => {
    switch (activity.action) {
      case 'QRCodeDownload':
        return t('users.qr_code_downloaded');
      case 'Download':
        return t('users.file_downloaded');
      case 'View':
        return t('users.content_viewed');
      default:
        return activity.action;
    }
  };

  const getActivityTarget = (activity: UserActivity) => {
    if (activity.tenantName) return `${t('users.tenant_name')}:  ${activity.tenantName}`;
    if (activity.createdByName) return `${t('users.action:')}: ${activity.createdByName}`;
    if (activity.documentId) return `${t('users.document_id')}:  ${activity.documentId}`;
    if (activity.folderId) return `${t('users.folder_id')}: ${activity.folderId}`;
    return t('users.no_specific_target');
  };

  return (
    <Col
      span={8}
      style={{
        height: '100%',
        overflow: 'auto',
        borderLeft: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
      }}>
      <div style={{ padding: '24px' }}>
        {/* User Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#e8e8e8',
              color: '#8c8c8c',
              marginBottom: '16px',
            }}
          />
          <Title level={4} style={{ margin: '8px 0' }}>
            {user?.firstName} {user?.lastName}
          </Title>
          <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
            {user?.emailAddress}
          </Text>
          <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
            {user?.phoneNumber}
          </Text>
          <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
            {formatDate(user?.lastModifiedAt, true)} • {userDocumentShare?.length} {t('users.items')}
          </Text>
        </div>

        {/* Sharing Items */}
        <Card
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{t('users.sharing_items')}</Text>
              <Button type="link" size="small">
                {t('users.manage')}
              </Button>
            </div>
          }
          style={{ marginBottom: '16px' }}>
          {userDocumentShare && userDocumentShare.length > 0 ? (
            <List
              dataSource={userDocumentShare}
              split={false}
              renderItem={(doc) => (
                <List.Item
                  key={doc.id}
                  style={{
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #d9d9d9',
                  }}>
                  <Space align="start">
                    {doc.type === 'Document' ? (
                      <FilePdfOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
                    ) : (
                      <FolderOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />
                    )}

                    <div>
                      <Text style={{ display: 'block', fontSize: 13 }}>{doc.name}</Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {t('users.last_accessed')}: {formatDate(doc.lastAccessedAt, true)}
                      </Text>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {t('users.no_shared_items')}
            </Text>
          )}
        </Card>

        {/* Activity */}

        <Card
          title={t('users.activity')}
          style={{
            maxHeight: 500,
            overflowY: 'auto',
            paddingRight: 8,
          }}>
          {userActivity && userActivity.length > 0 ? (
            <List
              dataSource={userActivity}
              renderItem={(activity) => (
                <List.Item
                  key={activity.id}
                  style={{
                    padding: '12px 0',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #f0f0f0',
                  }}>
                  <Space align="start" style={{ width: '100%' }}>
                    <Avatar
                      size={32}
                      style={{
                        backgroundColor: '#e8e8e8',
                        color: '#8c8c8c',
                        flexShrink: 0,
                        fontSize: 12,
                      }}>
                      {activity.action[0]}
                    </Avatar>

                    <div style={{ flex: 1 }}>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: '11px',
                          display: 'block',
                          marginBottom: '4px',
                        }}>
                        {formatDate(activity.creationAt, true)}
                      </Text>

                      <Text
                        style={{
                          fontSize: '13px',
                          display: 'block',
                          marginBottom: '4px',
                        }}>
                        {getActivityTitle(activity)}
                      </Text>

                      <Text
                        type="secondary"
                        style={{
                          fontSize: '11px',
                          display: 'block',
                          marginBottom: '2px',
                        }}>
                        {getActivityTarget(activity)}
                      </Text>
                     { activity.createdByName &&  <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                        created by: {activity.createdByName}
                      </Text>}
                      <Text type="secondary" style={{ fontSize: '11px', display: 'block' }}>
                        IP: {activity.ipAddress}
                      </Text>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {t('users.no_activity_yet')}
            </Text>
          )}
        </Card>
      </div>
    </Col>
  );
};

export default UserInfo;
