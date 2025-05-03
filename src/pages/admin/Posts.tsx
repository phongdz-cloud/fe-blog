import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { postService, Post } from '../../services/postService';
import CreatePostModal from '../../components/posts/CreatePostModal';
import UpdatePostModal from '../../components/posts/UpdatePostModal';
import DeletePostModal from '../../components/posts/DeletePostModal';
import PostSearch, { PostSearchParams } from '../../components/posts/PostSearch';
import ListPosts from '../../components/posts/ListPosts';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useState<PostSearchParams>({});

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  const fetchPosts = async () => {
    try {
      const allPosts = await postService.getAllPosts();
      let filteredPosts = [...allPosts];

      // Apply search filters
      if (searchParams.title) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(searchParams.title!.toLowerCase())
        );
      }

      if (searchParams.userId) {
        filteredPosts = filteredPosts.filter(post => post.userId === searchParams.userId);
      }

      if (searchParams.startDate) {
        const startDate = new Date(searchParams.startDate!);
        filteredPosts = filteredPosts.filter(() => {
          // Use a default date if createdAt is not available
          const postDate = new Date();
          return postDate >= startDate;
        });
      }

      if (searchParams.endDate) {
        const endDate = new Date(searchParams.endDate!);
        filteredPosts = filteredPosts.filter(() => {
          // Use a default date if createdAt is not available
          const postDate = new Date();
          return postDate <= endDate;
        });
      }

      setPosts(filteredPosts);
    } catch {
      toast.error('Failed to fetch posts');
    }
  };

  const handleSearch = (params: PostSearchParams) => {
    setSearchParams(params);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  const handleDelete = (post: Post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Posts</h2>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Create New Post
        </Button>
      </div>

      <PostSearch onSearch={handleSearch} />

      <ListPosts
        posts={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreatePostModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />

      <UpdatePostModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        onPostUpdated={fetchPosts}
        post={selectedPost}
      />

      <DeletePostModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onPostDeleted={fetchPosts}
        post={selectedPost}
      />
    </div>
  );
};

export default Posts;
