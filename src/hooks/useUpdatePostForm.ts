import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema, PostFormData } from '../validations/postValidation';
import { toast } from 'react-toastify';
import { postService, Post } from '../services/postService';

interface UseUpdatePostFormProps {
  onSuccess: () => void;
  post: Post | null;
}

export const useUpdatePostForm = ({ onSuccess, post }: UseUpdatePostFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          body: post.body,
          userId: post.userId,
        }
      : undefined,
  });

  const onSubmit = async (data: PostFormData) => {
    if (!post) return;

    try {
      await postService.updatePost(post.id, data);
      toast.success('Post updated successfully!');
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset,
  };
};
