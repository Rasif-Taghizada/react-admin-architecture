import type { ActivityItem, UserData } from '../../../modules/users/types';

const mockData: UserData[] = [
  {
    id: '1',
    organization: 'Kapital Bank',
    status: 'Active',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 25,
    additionalUsers: 19,
    dateAdded: '03.06.2025',
  },
  {
    id: '2',
    organization: 'Pasha Bank',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 12,
    additionalUsers: 6,
    dateAdded: '03.06.2025',
  },
  {
    id: '3',
    organization: 'Unibank',
    status: 'Active',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 6,
    dateAdded: '03.06.2025',
  },
  {
    id: '4',
    organization: 'AccessBank',
    status: 'Pending Activation',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 16,
    additionalUsers: 10,
    dateAdded: '03.06.2025',
  },
  {
    id: '5',
    organization: 'International Bank of Azerbaijan (ABB)',
    status: 'Active',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 18,
    additionalUsers: 12,
    dateAdded: '03.06.2025',
  },
  {
    id: '6',
    organization: 'Xalq Bank',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 5,
    additionalUsers: 1,
    dateAdded: '03.06.2025',
  },
  {
    id: '7',
    organization: 'Bank Respublika',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 14,
    additionalUsers: 8,
    dateAdded: '03.06.2025',
  },
  {
    id: '8',
    organization: 'Rabitabank',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 10,
    additionalUsers: 4,
    dateAdded: '03.06.2025',
  },
  {
    id: '9',
    organization: 'Bank of Baku',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 2,
    dateAdded: '03.06.2025',
  },
  {
    id: '10',
    organization: 'Yelo Bank',
    status: 'Inactive',
    lastActivity: 'Today, 15:00',
    numberOfUsers: 10,
    additionalUsers: 4,
    dateAdded: '03.06.2025',
  },
];

const activityData: ActivityItem[] = [
  {
    id: '1',
    time: 'Today, 12:30',
    description: 'Downloaded 2 items from Mastercard Black Edition – Banner Set',
    files: [
      { name: 'MBE – Banner Set', type: 'pdf' },
      { name: 'MBE – Banner Set', type: 'pdf' },
    ],
  },
  {
    id: '2',
    time: 'Today, 11:45',
    description: 'Gained access to the campaign Contactless payment',
    files: [],
  },
];


export { mockData, activityData};
