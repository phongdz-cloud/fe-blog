import React, { useState } from 'react';
import { Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  House,
  FileText,
  People,
  Gear,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  PersonCircle,
  BoxArrowRight,
} from 'react-bootstrap-icons';

interface AdminSidebarProps {
  onToggle: (collapsed: boolean) => void;
}

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  submenu?: MenuItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { path: '/admin', icon: <House />, label: 'Dashboard' },
    {
      path: '/admin/posts',
      icon: <FileText />,
      label: 'Posts',
      submenu: [
        { path: '/admin/posts', icon: <FileText />, label: 'All Posts' },
        { path: '/admin/posts/create', icon: <FileText />, label: 'Create Post' },
        { path: '/admin/posts/categories', icon: <FileText />, label: 'Categories' },
      ],
    },
    {
      path: '/admin/users',
      icon: <People />,
      label: 'Users',
      submenu: [
        { path: '/admin/users', icon: <People />, label: 'All Users' },
        { path: '/admin/users/roles', icon: <People />, label: 'User Roles' },
        { path: '/admin/users/permissions', icon: <People />, label: 'Permissions' },
      ],
    },
    {
      path: '/admin/settings',
      icon: <Gear />,
      label: 'Settings',
      submenu: [
        { path: '/admin/settings/general', icon: <Gear />, label: 'General' },
        { path: '/admin/settings/security', icon: <Gear />, label: 'Security' },
        { path: '/admin/settings/notifications', icon: <Gear />, label: 'Notifications' },
      ],
    },
  ];

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle(newCollapsedState);
  };

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = location.pathname === item.path;
    const isSubmenuExpanded = expandedMenus[item.path];

    return (
      <div key={item.path}>
        <Nav.Link
          as={Link}
          to={item.path}
          className={`text-white d-flex align-items-center mb-2 ${isActive ? 'active' : ''}`}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
            transition: 'background-color 0.3s ease',
            cursor: 'pointer',
          }}
          onClick={() => item.submenu && toggleSubmenu(item.path)}
        >
          <span className="me-2" style={{ minWidth: '20px' }}>
            {item.icon}
          </span>
          {!isCollapsed && (
            <>
              <span className="flex-grow-1">{item.label}</span>
              {item.submenu && (
                <ChevronDown
                  className={`ms-2 transition-transform ${isSubmenuExpanded ? 'rotate-180' : ''}`}
                />
              )}
            </>
          )}
        </Nav.Link>
        {!isCollapsed && item.submenu && isSubmenuExpanded && (
          <div className="ms-3">
            {item.submenu.map(subItem => (
              <Nav.Link
                key={subItem.path}
                as={Link}
                to={subItem.path}
                className="text-white d-flex align-items-center mb-2"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  backgroundColor:
                    location.pathname === subItem.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <span className="me-2" style={{ minWidth: '20px' }}>
                  {subItem.icon}
                </span>
                <span>{subItem.label}</span>
              </Nav.Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`admin-sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isCollapsed ? '60px' : '250px',
        transition: 'width 0.3s ease',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '1rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!isCollapsed && <h5 className="mb-0">Admin Panel</h5>}
        <Button
          variant="link"
          className="text-white p-0"
          onClick={toggleSidebar}
          style={{ minWidth: '30px' }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <Nav className="flex-column flex-grow-1">{menuItems.map(renderMenuItem)}</Nav>

      {/* User Profile Section */}
      <div className="border-top pt-3 mt-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        {!isCollapsed ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              className="text-white d-flex align-items-center w-100 p-0"
              style={{ textDecoration: 'none' }}
            >
              <PersonCircle size={24} className="me-2" />
              <div className="text-start">
                <div className="small">Admin User</div>
                <div className="small text-white-50">admin@example.com</div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Dropdown.Item as={Link} to="/admin/profile">
                <PersonCircle className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/logout">
                <BoxArrowRight className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              className="text-white p-0"
              style={{ textDecoration: 'none' }}
            >
              <PersonCircle size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admin/profile">
                <PersonCircle className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/logout">
                <BoxArrowRight className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
