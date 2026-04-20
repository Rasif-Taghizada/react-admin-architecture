import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TableFilterProps } from '../../../types';
import { statusOptions } from '../../../utils/constant';
import { useTranslation } from '../../../../../node_modules/react-i18next';

const TableFilter: React.FC<TableFilterProps> = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  pageActive
}) => {
  const { t } = useTranslation();
  return (
    <Space style={{ marginBottom: '16px', width: '100%' }} size="middle">
      <Input
        placeholder={t('users.search_by_name')}
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 250 }}
      />

     {pageActive && <Select<number>
        placeholder={t('users.status')}
        style={{ width: 180 }}
        allowClear
        value={statusFilter}
        onChange={(value) => onStatusChange(value ?? undefined)}
        options={statusOptions}
      />}
    </Space>
  );
};

export default TableFilter;
