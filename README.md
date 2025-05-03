# Blog Management System

A modern blog management system built with React, TypeScript, and Bootstrap. This project provides a user-friendly interface for managing blog posts with features like search, create, edit, and delete posts.

## Features

### Post Management

- View all posts with pagination
- Search posts by:
  - Title (case-insensitive)
  - User ID
  - Date range (start date and end date)
- Create new posts
- Edit existing posts
- Delete posts
- Collapsible search interface

### User Interface

- Responsive design using Bootstrap
- Modern and clean interface
- Toast notifications for user feedback
- Loading states for async operations
- Collapsible sidebar for admin panel
- User profile section

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   └── AdminSidebar.tsx
│   └── posts/
│       ├── CreatePostModal.tsx
│       ├── DeletePostModal.tsx
│       ├── ListPosts.tsx
│       ├── PostSearch.tsx
│       └── UpdatePostModal.tsx
├── pages/
│   └── admin/
│       ├── Dashboard.tsx
│       ├── Posts.tsx
│       └── Users.tsx
├── services/
│   ├── api.ts
│   └── postService.ts
└── styles/
    └── components/
        └── posts/
            └── PostSearch.css
```

## Components

### Layout Components

- `AdminLayout`: Main layout component with sidebar and content area
- `AdminSidebar`: Collapsible sidebar with navigation and user profile

### Post Components

- `CreatePostModal`: Modal for creating new posts
- `DeletePostModal`: Modal for confirming post deletion
- `ListPosts`: Table view of posts with pagination
- `PostSearch`: Search interface with collapsible card
- `UpdatePostModal`: Modal for editing existing posts

### Services

- `api.ts`: Axios configuration with interceptors for authentication
- `postService.ts`: API service for post-related operations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```bash
npm start
# or
yarn start
```

## Technologies Used

- React
- TypeScript
- React Bootstrap
- React Router
- Axios
- React Toastify
- React Bootstrap Icons

## Features in Detail

### Post Search

- Collapsible search interface
- Multiple search criteria:
  - Title search (case-insensitive)
  - User ID filter
  - Date range filter
- Reset search functionality
- Real-time search results

### Post Management

- Create posts with title, content, and user ID
- Edit existing posts
- Delete posts with confirmation
- Paginated post list
- Responsive table view

### User Interface

- Modern and clean design
- Responsive layout
- Toast notifications for success/error messages
- Loading states for better UX
- Collapsible sidebar for space management

## Future Enhancements

- User authentication and authorization
- Post categories and tags
- Rich text editor for post content
- Image upload and management
- Post preview functionality
- Advanced search filters
- Export/import functionality
- Analytics dashboard
