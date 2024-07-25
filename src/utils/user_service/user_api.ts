import axios from 'axios';

export const loginUser = async (req: any) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, req).then((res) => res);
};

export const registerUser = async (req: any) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/users`, req).then((res) => res);
};
