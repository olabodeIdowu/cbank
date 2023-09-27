import axios from '../services/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  // console.log(auth?.token);
  // console.log(auth?.refresh_token);

  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', {
        headers: { 'X-Refresh-Token': `${auth?.refresh_token}` },
        // withCredentials: true,
      });

      console.log(response, response?.data?.data);
      const accessToken = response?.data?.data?.token;
      const refreshToken = response?.data?.data?.refresh_token;

      setAuth((prev) => {
        return {
          ...prev,
          token: response?.data?.data?.token,
          refresh_token: response?.data?.data?.refresh_token,
        };
      });

      console.log(auth?.token);
      console.log(auth?.refresh_token);

      return { accessToken, refreshToken };
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
