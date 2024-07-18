import axios from "axios";

const base_url = "http://localhost:4545";

export const loginUser = async (req : any) => {
  return axios.post(`${base_url}/users/login`, req).then((res) => res);
};

export const registerUser = async (req : any) => {
  return axios.post(`${base_url}/users/register`, req).then((res) => res);
};
