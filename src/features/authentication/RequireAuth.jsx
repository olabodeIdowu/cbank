import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role.id)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/dashboard' state={{ from: location }} replace />
  );
};

export default RequireAuth;

// import { redirect, Outlet } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

// const RequireAuth = ({ children, allowedRoles }) => {
//   const { auth } = useAuth();

//   // console.log(location);
//   return auth?.roles?.find((role) => allowedRoles?.includes(role.id)) ? (
//     <section>
//       <Outlet />
//     </section>
//   ) : auth?.user ? (
//     redirect('/unauthorized')
//   ) : (
//     // <navigate to='/unauthorized' />
//     redirect('/login')
//   );
//   // <navigate to='/login' />
// };

// export default RequireAuth;
