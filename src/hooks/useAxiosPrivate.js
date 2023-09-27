import { axiosPrivate } from '../services/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = axiosPrivate.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        // console.log(config);
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseIntercept = axiosPrivate.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // console.log(response, response.status);
        // Do something with response data
        return response;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const prevRequest = error?.config;
        // console.log(error, prevRequest, error?.response);
        // Do something with response error
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          const { accessToken, refreshToken } = await refresh();

          console.log(accessToken, refreshToken);

          prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          prevRequest.headers['X-Refresh-Token'] = `${refreshToken}`;

          console.log(prevRequest.headers);

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
