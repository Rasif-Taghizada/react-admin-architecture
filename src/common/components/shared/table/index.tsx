import { Pagination, Table } from 'antd';
import React from 'react';
import type { TableProps as AntTableProps } from 'antd';
import type { TableProps } from '../../../types'; 

// const TableLists: React.FC<TableProps & { onRow?: AntTableProps<any>['onRow'] }> = (props) => {
//   const { 
//     columns, 
//     data, 
//     total, 
//     handlePageChange, 
//     currentPage, 
//     pageSize, 
//     loading, 
//     pagination, 
//     rowSelection, 
//     rowKey,
//     onRow,                        
//   } = props;

//   return (
//     <>
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={false}
//         bordered
//         loading={loading}
//         rowSelection={rowSelection}
//         rowKey={rowKey || 'id'}
//         onRow={onRow}     
//       />
//       {pagination && (
//         <div style={{ marginTop: '20px' }}>
//           <Pagination
//             current={currentPage}
//             pageSize={pageSize}
//             onChange={handlePageChange}
//             total={total}
//             showSizeChanger
//             align="end"
//             pageSizeOptions={['20', '30', '50']}
//           />
//         </div>
//       )}
//     </>
//   );
// };


const TableLists: React.FC<
  TableProps & { 
    onRow?: AntTableProps<any>['onRow'];
    scroll?: AntTableProps<any>['scroll'];
  }
> = (props) => {
  const { 
    columns, 
    data, 
    total, 
    handlePageChange, 
    currentPage, 
    pageSize, 
    loading, 
    pagination, 
    rowSelection, 
    rowKey,
    onRow,
    scroll, 
  } = props;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        loading={loading}
        rowSelection={rowSelection}
        rowKey={rowKey || 'id'}
        onRow={onRow}
        scroll={scroll} 
      />
      {pagination && (
        <div style={{ marginTop: '20px' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePageChange}
            total={total}
            showSizeChanger
            align="end"
            pageSizeOptions={['20', '30', '50']}
          />
        </div>
      )}
    </>
  );
};


export default TableLists;
