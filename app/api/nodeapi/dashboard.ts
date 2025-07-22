import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { NODE_URLS } from '@/constants/urls';

interface DashboardData {
  status: string;
  message: string;
  result: {
    user_count: number;
    orders_count: number;
    products_count: number;
  }
}

const getDashboardData = async () => {
  const response = await axios.get<DashboardData>(`${NODE_URLS}/api/admin/dashboard`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
  return response.data;
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });
};
