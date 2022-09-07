export async function userData(url = '', username, password) {
  try {
    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);

    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      grant_type: 'authorization_code',
      body: params, // body data type must match "Content-Type" header
    });
    return response;
  } catch (e) {
    console.log('Error: ', e);
  }
}
