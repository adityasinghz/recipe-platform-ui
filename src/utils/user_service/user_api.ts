import axios from 'axios';


export const loginUser = async (req: any) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, req).then((res) => res);
};

export const registerUser = async (req: any) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/users`, req).then((res) => res);
};



export const sentOTP = async (userRequest: any) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${userRequest['email']}`,userRequest).then((res) => res);
    return response;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Re-throw the error after logging it
  }
};

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  otp: number;
}
export const verifyOTP = async (otp: any, userData: any) => {
  const otpNumber = Number(otp["secret_key"]);
  const data: UserData = {
    ...userData,
    otp: otpNumber
  };

  console.log("userData ", data);

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data);
    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; // Re-throw the error after logging it
  }
};






