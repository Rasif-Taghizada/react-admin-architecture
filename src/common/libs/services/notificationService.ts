import type { CreateNotificationData, NotificationRecipientData } from '../../../modules/notification/utils/types';
import axios from '../axiosInstance';
import { notification } from '../constants';


 const notificationService = async () => {
  const response = await axios.get(notification.getNotifications);
  return response.data;
};
//+

 const getNotificationsByIdService = async (id: string) => {
  const response = await axios.get(notification.getNotificationById(id));
  return response.data;
};
//+
 const createNotificationService = async (data: CreateNotificationData) => {
  const response = await axios.post(notification.create, data);
  return response.data;
};
//+

 const updateNotificationService = async (id: string, data: Partial<CreateNotificationData>) => {
  const response = await axios.put(notification.update(id), data);
  return response.data;
};

 const deleteNotificationService = async (id: string) => {
  const response = await axios.delete(notification.delete(id));
  return response.data;
};

// 2) NotificationRecipient
 const createNotificationRecipientsService = async (recipients: NotificationRecipientData[]) => {
  const response = await axios.post(notification.recipientCreate, recipients);
  return response.data;
};
//+

 const sendNotificationService = async (notificationId: string) => {
  const response = await axios.post(notification.recipientSend(notificationId));
  return response.data;
};
//+

 const getUserNotificationsService = async (userId: string,query_params={}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${notification.getUserNotifications(userId)}${queryString}`);
  return response.data;
};

 const markNotificationAsReadService = async (notificationId: string, userId: string) => {
  const response = await axios.patch(notification.recipientRead(notificationId, userId));
  return response.data;
};
//+

 const markNotificationAsDeliveredService = async (notificationId: string, userId: string) => {
  const response = await axios.patch(notification.recipientDeliver(notificationId, userId));
  return response.data;
};

 const getNotificationRecipientsService = async (notificationId: string) => {
  const response = await axios.get(notification.getRecipients(notificationId));
  return response.data;
};


export {
  notificationService,
  getNotificationsByIdService,
  createNotificationService,
  updateNotificationService,
  deleteNotificationService,
  createNotificationRecipientsService,
  sendNotificationService,
  getUserNotificationsService,
  markNotificationAsReadService,
  markNotificationAsDeliveredService,
  getNotificationRecipientsService,
};