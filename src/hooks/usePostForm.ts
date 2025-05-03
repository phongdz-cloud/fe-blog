import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema, PostFormData, defaultPostValues } from '../validations/postValidation';
import { toast } from 'react-toastify';
import { postService, Post } from '../services/postService';

interface UsePostFormProps {
  onSuccess: () => void;
  post?: Post | null;
}

export const usePostForm = ({ onSuccess, post }: UsePostFormProps) => {
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
      : defaultPostValues,
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      if (post) {
        await postService.updatePost(post.id, data);
        toast.success('Post updated successfully!');
      } else {
        await postService.createPost(data);
        toast.success('Post created successfully!');
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(`Failed to ${post ? 'update' : 'create'} post`);
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
