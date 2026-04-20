import React from 'react';
import { Image, Typography } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ImagePreviewProps {
  src: string;
  title?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, title }) => {
  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <FileImageOutlined style={{ marginRight: 8 }} />
        <Text strong>{title || 'Image preview'}</Text>
      </div>

      <Image
        src={src}
        alt={title}
        className="fp-image"
        width="100%"
        style={{ maxHeight: '70vh', objectFit: 'contain' }}
      />
    </div>
  );
};

export default ImagePreview;
