export const setUserData = (username) => {
  return {
    type: 'SET_USERNAME',
    payload: username,
  };
};
