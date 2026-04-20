import React from 'react';
import { Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TextPreviewProps {
  text: string;
  title?: string;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, title }) => {
  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <FileTextOutlined style={{ marginRight: 8 }} />
        <Text strong>{title || 'Text preview'}</Text>
      </div>

      <pre className="fp-text">{text}</pre>
    </div>
  );
};

export default TextPreview;
