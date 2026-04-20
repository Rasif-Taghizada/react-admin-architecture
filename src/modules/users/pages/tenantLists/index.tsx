import React, { useEffect, useState } from 'react';
import { Space, Avatar, Tag, Typography, message } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../../../../node_modules/react-i18next';

import TableLists from '../../../../common/components/shared/table';
import { type TenantData } from '../../types';
import { UsersPageHeader } from '../../components/userNav';
import AppModal from '../../../../common/components/shared/modals';
import TableFilter from '../../../../common/components/shared/tableFilter';
import { getTenantsService } from '../../../../common/libs/services/tenantService';
import InviteUsersModalContent from '../../components/modals/invitedTenant';
import { postInviteUsersService } from '../../../../common/libs/services/userService';
import { openNotification } from '../../../../common/components/shared/notification';
import { useDebounce } from '../../../../common/utils/hooks/useDebounce';

const { Text } = Typography;

const TenantLists: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination
  const currentPage = Number(searchParams.get('PageNumber')) || 1;
  const pageSize = Number(searchParams.get('PageSize')) || 20;

  // State
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Filter states
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);

  // Debounced search value
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchTenants = async () => {
    setIsLoading(true);
    try {
      const params = {
        PageNumber: String(currentPage),
        PageSize: String(pageSize),
        ...(debouncedSearchText && { name: debouncedSearchText }),
        ...(statusFilter !== undefined && { Status: statusFilter }),
      };

      const { items, itemsCount } = await getTenantsService(params);
      const indexedData = items.map((item: TenantData, index: number) => ({
        ...item,
        index: (currentPage - 1) * pageSize + index,
      }));
      setTenants(indexedData);
      setTotal(itemsCount);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize,debouncedSearchText, statusFilter]);

  const handleInviteUsers = async (data: { email: string[]; tenantId: string }) => {
    try {
      await postInviteUsersService(data);
      openNotification({
        type: 'success',
        title: t('users.success'),
        content: `${t('users.invitation_sent')} ${data.email.length} ${t('users.user')}(s)`,
      });
      setInviteModalOpen(false);
      fetchTenants();
    } catch (error) {
      console.error('Error inviting users:', error);
      message.error(t('users.failed_to_send_invitation'));
    }
  };

  const getStatusTag = (status: number) => {
    const statusConfig = {
      0: { color: 'warning', text: t('users.pending') },
      1: { color: 'success', text: t('users.active') },
      2: { color: 'default', text: t('users.inactive') },
      3: { color: 'error', text: t('users.suspended') },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: t('users.unknown') };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const handleRowClick = (record: TenantData) => {
    navigate(`/users/${record.id}`);
  };

  // Transform tenants for modal select dropdown
  const tenantsForSelect = tenants.map((tenant: any) => ({
    label: tenant.name,
    value: tenant.id,
  }));

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

  const columns: ColumnsType<TenantData> = [
    {
      title: t('users.tenant'),
      key: 'tenant',
      render: (record: any) => (
        <Space>
          <Avatar icon={<BankOutlined />} style={{ backgroundColor: '#e8e8e8', color: '#8c8c8c' }} />
          <Text>{record?.name}</Text>
        </Space>
      ),
    },
    {
      title: t('users.description'),
      dataIndex: 'description',
      key: 'description',
      render: (value: string | null) => value || '-',
    },
   {
      title: t('users.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => getStatusTag(status),
    },

    {
      title: t('users.created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
    },
    {
      title: t('users.last_updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
    },
  ];

  return (
    <>
      <UsersPageHeader pageActive={true} orgName="" onInviteClick={() => setInviteModalOpen(true)} />

      <TableFilter
        searchText={searchText}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        pageActive={true}
      />

      <TableLists
        columns={columns}
        data={tenants}
        total={total}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        loading={isLoading}
        pagination={true}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' },
        })}
      />

      <AppModal open={inviteModalOpen} onCancel={() => setInviteModalOpen(false)} title={t('users.invite_users_to_tenant')} footer={null} width={500}>
        <InviteUsersModalContent tenants={tenantsForSelect} onDone={handleInviteUsers} />
      </AppModal>
    </>
  );
};

export default TenantLists;
