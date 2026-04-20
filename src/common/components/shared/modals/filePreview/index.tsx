import React from 'react';
import type { FileType } from '../../../../../modules/trash/types';
import ImagePreview from '../../filePreviewLists/image';
import DocumentPreview from '../../filePreviewLists/document';
import VideoPreview from '../../filePreviewLists/video';
import AudioPreview from '../../filePreviewLists/audio';
import TextPreview from '../../filePreviewLists/text';
import OtherPreview from '../../filePreviewLists/other';
import AppModal from '..';



interface FilePreviewModalProps {
  open: boolean;
  onCancel: () => void;
  width?: any;

  fileType: FileType | number | null;
  src: string | null;
  text?: string | null;
  title?: string;
}


const FilePreviewContent: React.FC<Omit<FilePreviewModalProps, 'open' | 'onCancel' | 'width'>> = ({
  fileType,
  src,
  text,
  title,
}) => {


  if (fileType === null) return null;

  switch (fileType) {
    case 1: // Image
      return src ? <ImagePreview src={src} title={title} /> : null;

    case 2: // Document
      return src ? <DocumentPreview src={src} title={title} /> : null;

    case 3: // Video
      return src ? <VideoPreview src={src} title={title} /> : null;

    case 4: // Audio
      return src ? <AudioPreview src={src} title={title} /> : null;

    case 5: // Text
      return text ? <TextPreview text={text} title={title} /> : null;

    case 99: // Other
      return <OtherPreview />;

    default:
      return null;
  }
};

const FilePreview: React.FC<FilePreviewModalProps> = ({
  open,
  onCancel,
  width = 800,
  fileType,
  src,
  text,
  title,
}) => {
  return (
    <AppModal open={open} onCancel={onCancel} footer={null} width={width}>
      <FilePreviewContent fileType={fileType} src={src} text={text} title={title} />
    </AppModal>
  );
};

export default FilePreview;
