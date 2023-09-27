// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';

// export function useLogout() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { logoutApi } = useAuthContext();

//   const { mutate: logout, isLoading } = useMutation({
//     mutationFn: logoutApi,
//     onSuccess: () => {
//       queryClient.removeQueries();
//       navigate('/login', { replace: true });
//     },
//   });

//   return { logout, isLoading };
// }
