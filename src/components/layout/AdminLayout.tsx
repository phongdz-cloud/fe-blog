import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar.tsx';

const AdminLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark text-white p-3 min-vh-100">
          <AdminSidebar />
        </Col>
        <Col md={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
