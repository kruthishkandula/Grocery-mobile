import nodeApi from '@/api/nodeapi';
import { useQuery } from '@tanstack/react-query';

export const getProperties = async () => {
    const response = await nodeApi.get('properties');  // Dummy user endpoint
    return response;
};

const useGetProperties = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['properties'],
        queryFn: getProperties,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching
    };
};

export default useGetProperties;