import { NODE_URL } from '@/utility/config';
import axios from 'axios';
import nodeApi from '..';

const BASE_URL = NODE_URL;

// Login
export const login = async ({
  username,
  password,
}: { username: string; password: string }) => {
  const res = await nodeApi.post(
    `/api/auth/login`,
    { username, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return res.data;
};

// Register
export const register = async ({
  username,
  password,
  email,
  phonenumber,
  role,
}: {
  username: string;
  password: string;
  email: string;
  phonenumber: string;
  role: string;
}) => {
  const res = await nodeApi.post(
    `/api/auth/register`,
    { username, password, email, phonenumber, role },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return res.data;
};