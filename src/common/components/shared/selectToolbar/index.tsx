import React from 'react';
import { Button, Checkbox, Space, Tooltip, Typography } from 'antd';
import {
  EyeOutlined,
  RollbackOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LinkOutlined,
  ShareAltOutlined,
  InboxOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import type {
  SelectionBarProps as BaseSelectionBarProps,
  SelectionBarAction,
} from '@/common/types';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface ExtendedSelectionBarProps extends BaseSelectionBarProps {
  actions: SelectionBarAction[];
  disableWhenMultiSelect?: SelectionBarAction[];
}

const SelectionBar: React.FC<ExtendedSelectionBarProps> = ({
  selectedCount,
  totalCount,
  onAction,
  actions,
  disableWhenMultiSelect,
}) => {
  const { t } = useTranslation();
  
  if (!selectedCount) return null;

  const allSelected = selectedCount === totalCount;
  const isMultiSelected = selectedCount > 1;

  const actionMap: Partial<Record<
    SelectionBarAction,
    {
      icon: React.ReactNode;
      tooltip: string;
      danger?: boolean;
    }
  >> = {
    view: { icon: <EyeOutlined />, tooltip: t('common.view') },
    archive: { icon: <InboxOutlined />, tooltip: t('common.archive') },
    unarchive: { icon: <RollbackOutlined />, tooltip: t('common.unarchive') },
    restore: { icon: <RollbackOutlined />, tooltip: t('common.restore') },
    download: { icon: <DownloadOutlined />, tooltip: t('common.download') },
    'copy-link': { icon: <LinkOutlined />, tooltip: t('common.copy_link') },
    share: { icon: <ShareAltOutlined />, tooltip: t('common.share') },
    move: { icon: <FolderOutlined />, tooltip: t('common.move') },
    delete: { icon: <DeleteOutlined />, tooltip: t('common.delete'), danger: true },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 999,
        padding: '6px 16px',
        marginBottom: 12,
      }}
    >
      <Space size="middle">
        {/* Clear Selection Button */}
        <Button
          type="text"
          onClick={() => onAction('clear')}
          style={{ paddingInline: 4 }}
        >
          ✕
        </Button>

        {/* Selected Count Text */}
        <Text>
          {t('common.selected')} {selectedCount} {selectedCount === 1 ? t('common.item') : t('common.items')}
        </Text>

        {/* Action Buttons */}
        <Space size="small">
          {actions.map((actionKey) => {
            const actionData = actionMap[actionKey];
            if (!actionData) return null;

            const isDisabledByMultiSelect =
              isMultiSelected && disableWhenMultiSelect?.includes(actionKey);

            const disabled = isDisabledByMultiSelect;

            return (
              <Tooltip title={actionData.tooltip} key={actionKey}>
                <Button
                  type="text"
                  danger={actionData.danger}
                  icon={actionData.icon}
                  onClick={() => onAction(actionKey)}
                  disabled={disabled}
                />
              </Tooltip>
            );
          })}
        </Space>
      </Space>

      {/* Right: select all */}
      <Space>
        <Checkbox
          checked={allSelected}
          indeterminate={selectedCount > 0 && !allSelected}
          onChange={(e) =>
            onAction('toggle-select-all', {
              checked: e.target.checked,
            })
          }
        />
        <Text>{t('common.select_all')}</Text>
      </Space>
    </div>
  );
};

export default SelectionBar;
