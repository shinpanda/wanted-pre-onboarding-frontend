const KEY: string = "accessToken";

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(KEY, accessToken);
};

export const getAccessToken = () => {
  const item = localStorage.getItem(KEY);
  return item !== null ? (item as string) : "";
};

export const hasAccessAuth = () => {
  console.log(getAccessToken());
  return getAccessToken() ? true : false;
};

export const removeAccessToken = () => {
  localStorage.removeItem(KEY);
};

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
