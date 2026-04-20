import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface OtherPreviewProps {
  title?: string;
}

const OtherPreview: React.FC<OtherPreviewProps> = () => {
  return (
    <div className="fp-wrapper fp-other" style={{ textAlign: 'center', padding: 24 }}>
      <Text type="secondary">Bu fayl tipi tapilmadi.</Text>
    </div>
  );
};

export default OtherPreview;
