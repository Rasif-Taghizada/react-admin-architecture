import React from 'react';
import { Typography } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AudioPreviewProps {
  src: string;
  title?: string;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ src, title }) => {
  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <AudioOutlined style={{ marginRight: 8 }} />
        <Text strong>{title || 'Audio preview'}</Text>
      </div>

      <div style={{ padding: '24px' }}>
        <audio src={src} controls className="fp-audio" />
      </div>
    </div>
  );
};

export default AudioPreview;
