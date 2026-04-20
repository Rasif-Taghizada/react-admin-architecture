import React from 'react';
import { Typography } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface VideoPreviewProps {
  src: string;
  title?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src, title }) => {
  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <VideoCameraOutlined style={{ marginRight: 8 }} />
        <Text strong>{title || 'Video preview'}</Text>
      </div>

      <video src={src} controls className="fp-video" />
    </div>
  );
};

export default VideoPreview;
