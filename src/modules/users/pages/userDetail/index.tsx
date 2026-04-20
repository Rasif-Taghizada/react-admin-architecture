// import React, { useState, useEffect } from 'react';
// import { Space, Avatar, Typography, Dropdown, Row, Col, message, type MenuProps } from 'antd';
// import { UserOutlined, DownOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import { useParams } from 'react-router-dom';

// import TableLists from '../../../../common/components/shared/table';
// import { useMoveBack } from '../../../../common/utils/hooks/useMoveBack';
// import type { ApiUser } from '../../types';
// import { UsersPageHeader } from '../../components/userNav';
// import { getUserByIdService, updateUserStatusService } from '../../../../common/libs/services/userService';

// const { Text } = Typography;

// const UserDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigateBack = useMoveBack();

//   const [users, setUsers] = useState<ApiUser[]>([]);
//   const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchOrganizationUsers = async () => {
//     if (!id) return;

//     setIsLoading(true);
//     try {
//       const user = await getUserByIdService(id);
//       setUsers([user]);
//     } catch (error) {
//       console.error('Error fetching organization users:', error);
//       message.error('Failed to load users');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrganizationUsers();
//   }, [id]);

//   const handleStatusChange = async (record: ApiUser, action: 'activate' | 'deactivate') => {
//     try {
//       await updateUserStatusService(record.id, action);

//       const isActive = action === 'activate';
//       setUsers((prevUsers) => prevUsers.map((user) => (user.id === record.id ? { ...user, isActive } : user)));

//       if (selectedUser?.id === record.id) {
//         setSelectedUser({ ...selectedUser, isActive });
//       }

//       message.success(`User ${action}d successfully`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       message.error('Failed to update user status');
//     }
//   };

//   const getStatusMenuItems = (record: ApiUser): MenuProps['items'] => [
//     {
//       key: 'activate',
//       label: 'Activate',
//       onClick: () => handleStatusChange(record, 'activate'),
//       disabled: record.isActive,
//     },
//     {
//       key: 'deactivate',
//       label: 'Deactivate',
//       onClick: () => handleStatusChange(record, 'deactivate'),
//       disabled: !record.isActive,
//     },
//   ];


//   const handleRowClick = (record: ApiUser) => {
//     setSelectedUser(record);
//   };

//   const columns: ColumnsType<ApiUser> = [
//     {
//       title: 'User name',
//       key: 'userName',
//       render: (record: ApiUser) => (
//         <Space>
//           <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#e8e8e8', color: '#8c8c8c' }} />
//           <Text>{record.firstName && record.lastName ? `${record.firstName} ${record.lastName}` : record.emailAddress}</Text>
//         </Space>
//       ),
//     },

//     {
//       title: 'Email',
//       dataIndex: 'emailAddress',
//       key: 'emailAddress',
//     },
//     {
//       title: 'Phone number',
//       dataIndex: 'phoneNumber',
//       key: 'phoneNumber',
//       render: (value: string | null) => value ?? '-',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'isActive',
//       key: 'isActive',
//       render: (isActive: boolean, record: ApiUser) => (
//         <div
//           onClick={(e) => {
//             e.stopPropagation(); // row select olmasın
//           }}>
//           <Dropdown menu={{ items: getStatusMenuItems(record) }} trigger={['click']}>
//             <Space style={{ cursor: 'pointer' }}>
//               <Text>{isActive ? 'Active' : 'Inactive'}</Text>
//               <DownOutlined style={{ fontSize: '10px' }} />
//             </Space>
//           </Dropdown>
//         </div>
//       ),
//     },
//     {
//       title: 'Last activity',
//       dataIndex: 'lastModifiedAt',
//       key: 'lastModifiedAt',
//       render: (value: string | null, record: ApiUser) => {
//         const date = value || record.creationAt;
//         return date ? new Date(date).toLocaleString() : '-';
//       },
//     },
//     {
//       title: 'Date added',
//       dataIndex: 'creationAt',
//       key: 'creationAt',
//       render: (value: string) => (value ? new Date(value).toLocaleDateString() : '-'),
//     },
//   ];

//   return (
//     <Row gutter={0}>
//       <Col span={selectedUser ? 16 : 24}>
//         <UsersPageHeader pageActive={false} orgName="Kapital Bank" onBack={navigateBack} />

//         <TableLists
//           columns={columns}
//           data={users}
//           total={users.length}
//           currentPage={1}
//           pageSize={20}
//           handlePageChange={()=> {}}
//           loading={isLoading}
//           pagination={false}
//           rowKey="id"
//           onRow={(record) => ({
//             onClick: () => handleRowClick(record),
//             style: { cursor: 'pointer' },
//           })}
//         />
//       </Col>

     
//     </Row>
//   );
// };

// export default UserDetail;
