import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postService } from '../../services/postService';

interface CreatePostModalProps {
  show: boolean;
  onHide: () => void;
  onPostCreated: () => void;
}

interface PostFormData {
  title: string;
  body: string;
  userId: number;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ show, onHide, onPostCreated }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    body: '',
    userId: 1,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PostFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PostFormData, string>> = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
      isValid = false;
    }

    if (!formData.userId || formData.userId <= 0) {
      newErrors.userId = 'User ID is required and must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await postService.createPost(formData);
      toast.success('Post created successfully!');
      onPostCreated();
      onHide();
      setFormData({ title: '', body: '', userId: 1 });
      setErrors({});
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    setFormData({ ...formData, userId: isNaN(numValue) ? 0 : numValue });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Title <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              isInvalid={!!errors?.title}
            />
            <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Content <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter post content"
              value={formData.body}
              onChange={e => setFormData({ ...formData, body: e.target.value })}
              isInvalid={!!errors?.body}
            />
            <Form.Control.Feedback type="invalid">{errors?.body}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              User ID <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter user ID"
              value={formData.userId}
              onChange={handleUserIdChange}
              isInvalid={!!errors?.userId}
              min="1"
            />
            <Form.Control.Feedback type="invalid">{errors?.userId}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;
