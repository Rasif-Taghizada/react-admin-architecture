import React, { useEffect, useState } from 'react';
import { Space, Avatar, Tag, Typography, Row, Col } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import TableLists from '@/common/components/shared/table';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ApiUser, UserActivity, UserDetailData, UserDocumentShare } from '@/modules/users/types';
import { UsersPageHeader } from '@/modules/users/components/userNav';
import TableFilter from '@/common/components/shared/tableFilter';
import { getUserByIdService, getUsersService } from '@/common/libs/services/userService';
import { useDebounce } from '@/common/utils/hooks/useDebounce';
import UserInfo from '@/modules/users/components/userInfo';
import { openNotification } from '@/common/components/shared/notification';
import { getDocumentAccessService } from '@/common/libs/services/documentAccessService';
import { getAuditsService } from '@/common/libs/services/auditService';
import { getTenantsByIdService } from '@/common/libs/services/tenantService';

const { Text } = Typography;

const UserLists: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination
  const currentPage = Number(searchParams.get('PageNumber')) || 1;
  const pageSize = Number(searchParams.get('PageSize')) || 20;

  // State
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetailData | null>(null);
  const [userDocumentShare, setUserDocumentShare] = useState<UserDocumentShare[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tenantName, setTenantName] = useState<string>('');

  // Filter states
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

  // Debounced search value
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = {
        TenantId: id,
        PageNumber: String(currentPage),
        PageSize: String(pageSize),
        ...(debouncedSearchText && { name: debouncedSearchText }),
        ...(statusFilter !== undefined && { Status: statusFilter }),
      };
      const { items, itemsCount } = await getUsersService(params);
      const indexedData = items.map((item: ApiUser, index: number) => ({
        ...item,
        index: (currentPage - 1) * pageSize + index,
      }));
      setUsers(indexedData);
      setTotal(itemsCount);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTenant = async () => {
    if (!id) return;
    try {
      const tenant = await getTenantsByIdService(id);
      setTenantName(tenant?.name || '');
    } catch (error) {
      console.error('Error fetching tenant:', error);
    }
  };

  useEffect(() => {
    fetchTenant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, debouncedSearchText, statusFilter, id]);

  const fetchOrganizationUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUserByIdService(selectedUserId as string);
      setSelectedUser(response);
    } catch (error) {
      console.error('Error fetching organization users:', error);
      openNotification({
        type: 'error',
        title: t('users.error'),
        content: t('users.failed_to_load_users'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDocumentShare = async () => {
    if (!selectedUserId) return;
    setIsLoading(true);
    try {
      const response = await getDocumentAccessService(selectedUserId);
      setUserDocumentShare(response);
    } catch (error) {
      console.error('Error fetching organization users:', error);
      openNotification({
        type: 'error',
        title: t('users.error'),
        content: t('users.failed_to_load_users'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserActivity = async () => {
    setIsLoading(true);
    try {
      const params = { userId: selectedUserId };
      const { items } = await getAuditsService(params);
      setUserActivity(items);
    } catch (error) {
      console.error('Error fetching organization users:', error);
      openNotification({
        type: 'error',
        title: t('users.error'),
        content: t('users.failed_to_load_users'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchOrganizationUsers();
      fetchUserDocumentShare();
      fetchUserActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  const handleRowClick = (record: ApiUser) => {
    // navigate(`/users/${record.id}`);
    setSelectedUserId(record.id);
  };

  // Pagination change
  const handlePageChange = (page: number, newPageSize: number) => {
    const isPageSizeChanged = newPageSize !== pageSize;
    setSearchParams({
      PageNumber: isPageSizeChanged ? '1' : page.toString(),
      PageSize: newPageSize.toString(),
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    // Reset to first page when searching
    setSearchParams({
      PageNumber: '1',
      PageSize: pageSize.toString(),
    });
  };

  const handleStatusChange = (value: number | undefined) => {
    setStatusFilter(value);
    // Reset to first page when filtering
    setSearchParams({
      PageNumber: '1',
      PageSize: pageSize.toString(),
    });
  };

  const getStatusTag = (status: number) => {
    const statusConfig = {
      0: { color: 'default', text: t('users.inactive') },
      1: { color: 'success', text: t('users.active') },
      2: { color: 'error', text: t('users.suspended') },
      3: { color: 'magenta', text: t('users.deleted') },
      4: { color: 'warning', text: t('users.pending_activation') },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: 'default',
      text: t('users.unknown'),
    };

    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: ColumnsType<ApiUser> = [
    {
      title: t('users.first_name'),
      dataIndex: 'firstName',
      key: 'firstName',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('users.last_name'),
      dataIndex: 'lastName',
      key: 'lastName',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('users.user'),
      key: 'user',
      render: (record: ApiUser) => (
        <Space>
          <Avatar icon={<BankOutlined />} style={{ backgroundColor: '#e8e8e8', color: '#8c8c8c' }} />
          <Text>{record.firstName && record.lastName ? `${record.firstName} ${record.lastName}` : record.emailAddress}</Text>
        </Space>
      ),
    },
    {
      title: t('users.email'),
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    },
    {
      title: t('users.phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('users.role'),
      dataIndex: 'roleName',
      key: 'roleName',
      render: (value: string | null) => value || '-',
    },
    {
      title: t('users.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => getStatusTag(status),
    },
    {
      title: t('users.last_activity'),
      dataIndex: 'lastModifiedAt',
      key: 'lastModifiedAt',
      render: (value: string | null, record: ApiUser) => {
        const date = value || record.creationAt;
        return date ? new Date(date).toLocaleString() : '-';
      },
    },
    {
      title: t('users.date_added'),
      dataIndex: 'creationAt',
      key: 'creationAt',
      render: (value: string) => (value ? new Date(value).toLocaleDateString() : '-'),
    },
  ];

  return (
    <Row gutter={0}>
      <Col span={selectedUser ? 16 : 24}>
        <UsersPageHeader pageActive={false} orgName={tenantName} onBack={() => navigate('/users')} />

        <TableFilter
          searchText={searchText}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          pageActive={false}
        />

        <div
          style={
            selectedUser
              ? {
                  width: '95%',
                  overflowX: 'auto',
                  height: '100vh',
                }
              : {
                  width: '100%',
                }
          }>
          <TableLists
            columns={columns}
            data={users}
            total={total}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            loading={isLoading}
            pagination={true}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: {
                cursor: 'pointer',
                backgroundColor: record.id === selectedUser?.id ? '#f5f5f5' : '',
              },
            })}
            scroll={selectedUser ? { x: 'max-content' } : undefined}
          />
        </div>
      </Col>

      {selectedUser && <UserInfo user={selectedUser} userDocumentShare={userDocumentShare} userActivity={userActivity} />}
    </Row>
  );
};

export default UserLists;
