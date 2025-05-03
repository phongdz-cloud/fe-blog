import { Card, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <h1 className="mb-4">Welcome to Our Blog</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Latest Posts</Card.Title>
              <Card.Text>Here you can find our latest blog posts and articles.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>About Us</Card.Title>
              <Card.Text>Learn more about our blog and our mission.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
