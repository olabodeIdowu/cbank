import axios, { axiosPrivate } from "./axios";

// GET POS ANALYTICS APIs

export async function getPosAnalyticsApi() {
  try {
    const data = await axiosPrivate.get("/admin/analytics/pos?duration=weekly");
    console.log(data?.data?.data);
    return data?.data?.data;
  } catch (err) {
    console.log(err);
  }
}

// POS PAYMENTS APIs

export async function getAllPosPaymentsApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos-payments");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// export async function getAllPosPaymentsDetailApi(id) {
//   try {
//     const data = await axiosPrivate.get(`/admin/pos-payments/${id}`);
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// POS APIs

export async function getAllPosApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos?include=account,type");
    console.log(data?.data?.data?.pos?.data);
    return data?.data?.data?.pos?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPosApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos/create");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPosApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos/create");
    console.log(data?.data?.data);
    return data?.data?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createMerchantPosApi(payload) {
  try {
    const data = await axiosPrivate.post("/admin/pos", payload);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createAgentPosApi(payload) {
  try {
    const data = await axiosPrivate.post("/admin/pos", payload);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function detachPosFromAccountApi(action) {
  console.log(action);
  try {
    const data = await axiosPrivate.patch(
      `/admin/pos/${action?.posId}`,
      action?.data
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// POS REQUESTS APIs

export async function getAllPosRequestApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos-requests");
    console.log(data?.data?.data?.pos_requests?.data);
    return data?.data?.data?.pos_requests?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPosRequestApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos-requests/create");
    console.log(data);
    return data?.data?.data?.status;
  } catch (err) {
    console.log(err);
  }
}

export async function updateManyPosRequestApi(payload) {
  try {
    const data = await axiosPrivate.post(`/admin/pos-requests/status`, payload);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateSinglePosRequestApi(payload) {
  try {
    const data = await axiosPrivate.post(`/admin/pos-requests/status`, payload);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deletePosRequestApi(id) {
  try {
    await axiosPrivate.delete(`/admin/pos-requests/${id}`);
  } catch (err) {
    console.log(err);
  }
}

// POST TYPE APIs

export async function getAllPosTypeApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos-types");
    // console.log(data);
    return data?.data?.data?.pos_types?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPosTypeApi(payload) {
  try {
    const data = await axiosPrivate.post("/admin/pos-types", payload);
    // console.log(data?.data?.data?.pos_types?.data);
    return data?.data?.data?.pos_types?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPosTypeApi() {
  try {
    const data = await axiosPrivate.get("/admin/pos-types/create");
    // console.log(data);
    return data?.data?.data?.providers;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePosTypeApi(action) {
  // console.log(action);
  try {
    const data = await axiosPrivate.patch(
      `/admin/pos-types/${action?.posTypeId}`,
      action?.data
    );
    // console.log(data);
    return data?.data?.data?.pos_types;
  } catch (err) {
    console.log(err);
  }
}

// TERMINAL APIs

export async function getAllTerminalApi() {
  try {
    const data = await axiosPrivate.get(
      "/admin/terminals?include=pos,request,type"
    );
    console.log(data);
    return data?.data?.data?.terminals?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createTerminalApi(payload) {
  try {
    const data = await axiosPrivate.post("/admin/terminals", payload);
    console.log(data?.data?.data?.terminal);
    return data?.data?.data?.terminal;
  } catch (err) {
    console.log(err);
  }
}

export async function getTerminalApi() {
  try {
    const data = await axiosPrivate.get("/admin/terminals/create");
    // console.log(data?.data?.data);
    return data?.data?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTerminalApi(action) {
  // console.log(action);
  try {
    const data = await axiosPrivate.patch(
      `/admin/terminals/${action?.terminalId}`,
      action?.data
    );
    // console.log(data);
    return data?.data?.data?.terminal;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTerminalApi(id) {
  try {
    await axiosPrivate.delete(`/admin/terminals/${id}`);
  } catch (err) {
    console.log(err);
  }
}
