import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/admin" className="text-white">
        Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/posts" className="text-white">
        Posts
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/users" className="text-white">
        Users
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/settings" className="text-white">
        Settings
      </Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;
