import * as yup from 'yup';

export interface PostFormData {
  title: string;
  body: string;
  userId: number;
}

export const postSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),
  body: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(500, 'Content must not exceed 500 characters'),
  userId: yup
    .number()
    .required('User ID is required')
    .positive('User ID must be positive')
    .integer('User ID must be an integer'),
});

export const defaultPostValues: PostFormData = {
  title: '',
  body: '',
  userId: 1,
};
