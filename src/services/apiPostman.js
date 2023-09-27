export async function getLogin(raw) {
  try {
    const response = await fetch(
      'https://stagingapi.errandpay.com/epagentauth/api/v1/login',
      {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    if (!response) throw new Error('logins could not be completed');
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}
