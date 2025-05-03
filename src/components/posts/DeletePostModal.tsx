import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Post } from '../../services/postService';
import { toast } from 'react-toastify';
import { postService } from '../../services/postService';

interface DeletePostModalProps {
  show: boolean;
  onHide: () => void;
  onPostDeleted: () => void;
  post: Post | null;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ show, onHide, onPostDeleted, post }) => {
  const handleDelete = async () => {
    if (!post) return;

    try {
      await postService.deletePost(post.id);
      toast.success('Post deleted successfully!');
      onHide();
      onPostDeleted();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this post?
        <div className="mt-3">
          <strong>Title:</strong> {post?.title}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePostModal;
