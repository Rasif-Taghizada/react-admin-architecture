import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

 type BreadcrumbItem = {
  label: string;
  path?: string; 
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
};

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  items,
  separator = '›',
  className,
}) => {
  return (
    <Breadcrumb separator={separator} className={className}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        if (item.path && !isLast) {
          return (
            <Breadcrumb.Item key={item.label}>
              <Link to={item.path}>{item.label}</Link>
            </Breadcrumb.Item>
          );
        }

        return (
          <Breadcrumb.Item key={item.label}>
            {item.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
