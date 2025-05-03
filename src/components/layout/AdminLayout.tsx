import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="d-flex">
      <AdminSidebar onToggle={handleSidebarToggle} />
      <main
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarCollapsed ? '60px' : '250px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          width: `calc(100% - ${isSidebarCollapsed ? '60px' : '250px'})`,
        }}
      >
        <Container fluid className="py-4">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
