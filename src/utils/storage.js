const USER_KEY = "user";

export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const updateUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
