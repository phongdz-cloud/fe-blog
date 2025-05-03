import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UserHeader from './UserHeader.tsx';

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default UserLayout;
