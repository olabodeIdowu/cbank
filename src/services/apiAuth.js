import axios, { axiosPrivate } from './axios';

export async function forgotPasswordApi(payload) {
  try {
    const data = await axios.post('/tokens/reset/password', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function resetPasswordApi(payload) {
  try {
    const data = await axiosPrivate.post('/password/reset', payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
