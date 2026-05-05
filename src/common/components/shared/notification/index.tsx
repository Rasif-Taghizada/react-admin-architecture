import { notification } from 'antd';
import type { NotificationOptions } from '@/common/types';
// import { SmileOutlined } from '@ant-design/icons';

export const openNotification = ({ type, width, title, content }: NotificationOptions): void => {
  try {
    notification[type]({
      message: title,
      description: content,
      placement: 'topRight',
      style: {
        // border: '1px solid #b5f5ec',
        width: width || 350,
      },
      //duration: 3,
      //icon: <SmileOutlined/>,
    });
  } catch (error) {
    notification.error({
      message: title,
      description: content,
      placement: 'topRight',
      style: {
        width: width || 350,
      },
    });
  }
};