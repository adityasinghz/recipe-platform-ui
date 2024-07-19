import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

console.log('Base URL:', baseURL); // Debug log

export const loginUser = async (req: any) => {
  return axios.post(`${baseURL}/users/login`, req).then((res) => res);
};

export const registerUser = async (req: any) => {
  return axios.post(`${baseURL}/users/register`, req).then((res) => res);
};
