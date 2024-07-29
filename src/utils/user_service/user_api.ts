import axios from 'axios';

export const loginUser = async (req: any) => {
  try{
    const response= axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, req).then((res) => res);
    return response;
  }catch (error) {
    console.error('Logging Failed:', error);
    throw error;
  }
};

export const registerUser = async (req: any) => {
  try{
    const response= axios.post(`${import.meta.env.VITE_BASE_URL}/users`, req).then((res) => res);
    return response;
  } catch (error) {
    console.error('Registration Failed:', error);
    throw error;
  }
};


export const sentOTP = async (req: any) => {
  try {
    const response= await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${req['email']}`,req).then((res) => res);
    return response;
  } catch (error) {
    console.error('Cannot Send OTP:', error);
    throw error;
  }
};


export const verifyOTP = async (req: any) => {
  try {
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, req).then((res) => res);
    return response;
  } catch (error) {
    console.error('Verification Failed:', error);
    throw error;
  }
};