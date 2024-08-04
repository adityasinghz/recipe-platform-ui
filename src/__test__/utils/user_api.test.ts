import axios from 'axios';
import { describe, it, expect, vi } from 'vitest';
import { loginUser, registerUser, sentOTP, verifyOTP } from '../../utils/user_service/user_api';

// Mock axios
vi.mock('axios');

const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('User API Functions', () => {
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should call loginUser with correct parameters and return response', async () => {
    const requestPayload = { email: 'test@example.com', password: 'password123' };
    const response = { data: 'Login Success' };
    
    mockedAxios.post.mockResolvedValue(response);
    
    const result = await loginUser(requestPayload);
    
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      requestPayload
    );
    expect(result).toEqual(response);
  });

  it('should call registerUser with correct parameters and return response', async () => {
    const requestPayload = { email: 'test@example.com', password: 'password123' };
    const response = { data: 'Registration Success' };
    
    mockedAxios.post.mockResolvedValue(response);
    
    const result = await registerUser(requestPayload);
    
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/users`,
      requestPayload
    );
    expect(result).toEqual(response);
  });

  it('should call sentOTP with correct parameters and return response', async () => {
    const requestPayload = { email: 'test@example.com', otp: '123456' };
    const response = { data: 'OTP Sent' };
    
    mockedAxios.put.mockResolvedValue(response);
    
    const result = await sentOTP(requestPayload);
    
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/users/${requestPayload.email}`,
      requestPayload
    );
    expect(result).toEqual(response);
  });

  it('should call verifyOTP with correct parameters and return response', async () => {
    const requestPayload = { email: 'test@example.com', otp: '123456' };
    const response = { data: 'OTP Verified' };
    
    mockedAxios.post.mockResolvedValue(response);
    
    const result = await verifyOTP(requestPayload);
    
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/users`,
      requestPayload
    );
    expect(result).toEqual(response);
  });

  it('should handle errors for loginUser', async () => {
    const requestPayload = { email: 'test@example.com', password: 'password123' };
    const error = new Error('Login Failed');
    
    mockedAxios.post.mockRejectedValue(error);
    
    await expect(loginUser(requestPayload)).rejects.toThrow('Login Failed');
  });

  it('should handle errors for registerUser', async () => {
    const requestPayload = { email: 'test@example.com', password: 'password123' };
    const error = new Error('Registration Failed');
    
    mockedAxios.post.mockRejectedValue(error);
    
    await expect(registerUser(requestPayload)).rejects.toThrow('Registration Failed');
  });

  it('should handle errors for sentOTP', async () => {
    const requestPayload = { email: 'test@example.com', otp: '123456' };
    const error = new Error('Cannot Send OTP');
    
    mockedAxios.put.mockRejectedValue(error);
    
    await expect(sentOTP(requestPayload)).rejects.toThrow('Cannot Send OTP');
  });

  it('should handle errors for verifyOTP', async () => {
    const requestPayload = { email: 'test@example.com', otp: '123456' };
    const error = new Error('Verification Failed');
    
    mockedAxios.post.mockRejectedValue(error);
    
    await expect(verifyOTP(requestPayload)).rejects.toThrow('Verification Failed');
  });
});
