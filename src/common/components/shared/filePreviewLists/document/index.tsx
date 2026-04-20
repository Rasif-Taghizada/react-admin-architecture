import React from 'react';
import { Typography } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../../../../node_modules/react-i18next';

const { Text } = Typography;

interface DocumentPreviewProps {
  src: string;
  title?: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ src, title }) => {
  const { t } = useTranslation();
  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <FilePdfOutlined style={{ marginRight: 8 }} />
        <Text strong>{title || t('file_preview.document_preview')}</Text>
      </div>

      <iframe src={src} title={t('file_preview.document_preview')} className="fp-iframe" />
    </div>
  );
};

export default DocumentPreview;
