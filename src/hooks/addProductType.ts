import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import api from '../services/api';
import { ProductType } from '../types';

export const addProductType = (): UseMutationResult<ProductType> => {
  const queryClient = useQueryClient();
  const add = async (productType: ProductType): Promise<ProductType> => {
    const response = await api.post<ProductType>('/product-type', productType);
    return response.data;
  };

  return useMutation(add, {
    onMutate: async (newProductType) => {
      await queryClient.cancelQueries('product-type-list');
      const previousList =
        queryClient.getQueryData<ProductType[]>('product-type-list');
      queryClient.setQueryData<ProductType[]>('product-type-list', (old) => {
        return [...(old ?? []), newProductType];
      });
      return { previousList };
    },
    onError: (
      err,
      newProductType,
      context: { previousList: ProductType[] }
    ) => {
      console.log('mutation error', (err as any).message);
      queryClient.setQueryData('product-type-list', context.previousList);
    },
    onSettled: () => {
      queryClient.invalidateQueries('product-type-list');
    },
  });
};
