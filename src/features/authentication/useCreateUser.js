// import { useMutation } from '@tanstack/react-query';
// import { createUser } from '../../services/apiAuth';
// import { toast } from 'react-hot-toast';

// export default function useCreateUser() {
//   const { mutate: signup, isLoading } = useMutation({
//     mutationKey: ['user'],
//     mutationFn: createUser,
//     onSuccess: (user) => {
//       console.log(user);
//       toast.success(
//         "Account successfully created! Please verify the new account from the user's email address."
//       );
//     },
//   });

//   return { isLoading, signup };
// }
