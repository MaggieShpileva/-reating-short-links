export async function squeeze(url = '', link, token, token_type) {
  try {
    let params = new URLSearchParams();
    params.set('link', link);

    // params.set('access_token', access_token);
    // params.set('token_type', token_type);

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      //grant_type: 'authorization_code',
      body: params, // body data type must match "Content-Type" header
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
