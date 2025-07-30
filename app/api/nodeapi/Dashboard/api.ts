import { NODE_URLS } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';
import nodeApi from '..';


export const useFetchDashboardData = (options = {}) => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await nodeApi?.post(NODE_URLS.DASHBOARD, { populate: '*' });
            return response.data;
        },
        ...options,
    });
};