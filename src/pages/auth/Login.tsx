import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import { login } from '../../services/authService';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await login(formData);
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      toast.success('Login successful!');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="login-title">Welcome Back</h2>
                <p className="text-muted">Please login to your account</p>
              </div>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                    autoFocus
                    disabled={isLoading}
                    aria-label="Username"
                    aria-required="true"
                    aria-invalid={validated && !formData.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your username
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    disabled={isLoading}
                    aria-label="Password"
                    aria-required="true"
                    aria-invalid={validated && !formData.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>

                <div className="text-center">
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
