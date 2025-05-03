import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Posts</Card.Title>
              <Card.Text className="display-4">150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">45</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Comments</Card.Title>
              <Card.Text className="display-4">320</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
