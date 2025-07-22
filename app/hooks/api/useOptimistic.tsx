import { useMutation, useQueryClient } from '@tanstack/react-query';


const useOptimisticMutation = ({
    mutationFn,
    queryKey,
    optimisticUpdateFn,
    successMessage,
    errorMessage,
}: {
    mutationFn: (data: any) => Promise<any>;
    queryKey: string[];
    optimisticUpdateFn: (old: any, newData: any) => any;
    successMessage?: string;
    errorMessage?: string;
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onMutate: async (newData) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey });

            // Snapshot current value
            const previousData = queryClient.getQueryData(queryKey);

            // Optimistically update
            queryClient.setQueryData(queryKey, (old: any) =>
                optimisticUpdateFn(old, newData)
            );

            return { previousData };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousData) {
                queryClient.setQueryData(queryKey, context.previousData);
            }
            // showToast(errorMessage || 'Something went wrong');
        },
        onSuccess: () => {
            // showToast(successMessage || 'Success!');
        },
        onSettled: () => {
            // Always refetch after mutation
            queryClient.invalidateQueries({ queryKey });
        },
    });
};


export default useOptimisticMutation;