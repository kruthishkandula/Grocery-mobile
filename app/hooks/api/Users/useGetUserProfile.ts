
import nodeApi from '@/api/nodeapi';
import { useQuery } from '@tanstack/react-query';

export const getUserProfile = async () => {
  const response = await nodeApi.get('profile');  // Dummy user endpoint
  return response;
};

const useGetUserProfile = () => {
  const {
    data: userProfileData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  return {
    userProfileData,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetUserProfile;