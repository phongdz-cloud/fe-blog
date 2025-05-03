import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { Search, ArrowCounterclockwise } from 'react-bootstrap-icons';
import './PostSearch.css';

interface PostSearchProps {
  onSearch: (searchParams: PostSearchParams) => void;
}

export interface PostSearchParams {
  title?: string;
  userId?: number;
  startDate?: string;
  endDate?: string;
}

const PostSearch: React.FC<PostSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<PostSearchParams>({});
  const [showCard, setShowCard] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    setSearchParams(prev => ({
      ...prev,
      userId: isNaN(numValue) ? undefined : numValue,
    }));
  };

  const handleReset = () => {
    setSearchParams({});
    onSearch({});
  };

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="search-container">
      <Card className={`search-card ${showCard ? 'show' : 'hide'}`}>
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Search Posts</h5>
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleReset}
              title="Reset search"
            >
              <ArrowCounterclockwise />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleCard}
              title={showCard ? 'Collapse' : 'Expand'}
            >
              {showCard ? '−' : '+'}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={searchParams.title || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="userId"
                    placeholder="User ID"
                    value={searchParams.userId || ''}
                    onChange={handleUserIdChange}
                    min="1"
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={searchParams.startDate || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={searchParams.endDate || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={1} className="d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  <Search />
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostSearch;
