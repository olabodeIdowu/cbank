import { axiosPrivate } from './axios';

export async function getAllAccountApi() {
  try {
    const data = await axiosPrivate.get('/admin/accounts');
    console.log(data);
    return data?.data?.data?.accounts?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateAccountApi(action) {
  try {
    const data = await axiosPrivate.patch(
      `/admin/accounts${action?.accountId}`,
      action?.data
    );
    console.log(data);
    return data?.data?.data?.accounts?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateAccountNameApi(action) {
  try {
    const data = await axiosPrivate.patch(
      `/admin/accounts${action?.accountId}`,
      action?.data
    );
    console.log(data);
    return data?.data?.data?.accounts?.data;
  } catch (err) {
    console.log(err);
  }
}
