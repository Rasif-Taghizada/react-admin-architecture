import React, { useState } from 'react';
import { Input, Select, Button, Tag, Space, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import type { InviteUsersModalContentProps } from '@/modules/users/types';
import { validateEmail } from '@/common/utils/helper';
import { useTranslation } from 'react-i18next';


const InviteUsersModalContent: React.FC<InviteUsersModalContentProps> = ({ 
  tenants = [], 
  onDone 
}) => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState('');
  const [email, setEmail] = useState<string[]>([]);
  const [tenantId, setTenantId] = useState<string>('');

  const handleAddEmail = () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) {
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      message.error(t('users.please_enter_a_valid_email_address'));
      return;
    }

    if (email.includes(trimmedEmail)) {
      message.warning(t('users.this_email_is_already_added'));
      return;
    }

    setEmail([...email, trimmedEmail]);
    setEmailInput('');
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmail(email.filter(email => email !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleDone = () => {
    if (email.length === 0) {
      message.error(t('users.please_add_at_least_one_email'));
      return;
    }

    if (!tenantId) {
      message.error(t('users.please_select_a_tenant'));
      return;
    }

    onDone({ email, tenantId });
    
    // Reset form
    setEmailInput('');
    setEmail([]);
    setTenantId('');
  };

  const isFormValid = email.length > 0 && tenantId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Email Input */}
      <div>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder={t('users.enter_email_and_press_enter')}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyPress={handleKeyPress}
            size="large"
            style={{ borderRadius: '6px 0 0 6px' }}
          />
          <Button 
            type="primary" 
            size="large"
            onClick={handleAddEmail}
            style={{ borderRadius: '0 6px 6px 0' }}
          >
            {t('users.add')}
          </Button>
        </Space.Compact>
      </div>

      {/* Email Tags */}
      {email.length > 0 && (
        <div
          style={{
            padding: '12px',
            background: '#fafafa',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          <Space size={[8, 8]} wrap>
            {email.map((email) => (
              <Tag
                key={email}
                closable
                onClose={() => handleRemoveEmail(email)}
                closeIcon={<CloseCircleOutlined />}
                style={{
                  padding: '4px 8px',
                  fontSize: '13px',
                  borderRadius: '4px',
                }}
              >
                {email}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      {/* Tenant Select */}
      <Select
        placeholder={t('users.select_a_tenant')}
        value={tenantId || undefined}
        onChange={setTenantId}
        size="large"
        style={{ width: '100%' }}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={tenants.map(tenant => ({
          value: tenant.value,
          label: tenant.label,
        }))}
      />

      {/* Done Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Button
          type="primary"
          size="large"
          onClick={handleDone}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? 'var(--color--primary)' : undefined,
            borderColor: isFormValid ? 'var(--color--primary)' : undefined,
            minWidth: '100px',
            borderRadius: '6px',
          }}
          onMouseEnter={(e) => {
            if (isFormValid) {
              e.currentTarget.style.backgroundColor = 'var(--color--primary-hover)';
              e.currentTarget.style.borderColor = 'var(--color--primary-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid) {
              e.currentTarget.style.backgroundColor = 'var(--color--primary)';
              e.currentTarget.style.borderColor = 'var(--color--primary)';
            }
          }}
        >
          {t('users.done')}
        </Button>
      </div>
    </div>
  );
};

export default InviteUsersModalContent;