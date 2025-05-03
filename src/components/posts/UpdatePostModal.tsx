import React, { useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useUpdatePostForm } from '../../hooks/useUpdatePostForm';
import { Post } from '../../services/postService';

interface UpdatePostModalProps {
  show: boolean;
  onHide: () => void;
  onPostUpdated: () => void;
  post: Post | null;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({ show, onHide, onPostUpdated, post }) => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, reset } = useUpdatePostForm({
    onSuccess: () => {
      onHide();
      onPostUpdated();
    },
    post,
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
        userId: post.userId,
      });
    }
  }, [post, reset]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register('title')}
              placeholder="Enter post title"
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('body')}
              placeholder="Enter post content"
              isInvalid={!!errors.body}
            />
            <Form.Control.Feedback type="invalid">{errors.body?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              {...register('userId')}
              placeholder="Enter user ID"
              isInvalid={!!errors.userId}
            />
            <Form.Control.Feedback type="invalid">{errors.userId?.message}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePostModal;
