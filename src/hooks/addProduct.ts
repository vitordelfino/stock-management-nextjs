import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import api from '../services/api';
import { Product, ProductType } from '../types';

export const addProduct = (): UseMutationResult<Product> => {
  const queryClient = useQueryClient();
  const add = async (product: Product): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  };

  return useMutation(add, {
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries('products');

      const previousList = queryClient.getQueryData<Product[]>([
        'products',
        newProduct.productTypeId,
      ]);
      queryClient.setQueryData<Product[]>(
        ['products', newProduct.productTypeId],
        (old) => {
          return [...(old ?? []), newProduct];
        }
      );
      return { previousList };
    },
    onError: (err, newProduct, context: { previousList: Product[] }) => {
      console.log('mutation error', (err as any).message);

      queryClient.setQueryData(
        ['products', newProduct.productTypeId],
        context.previousList
      );
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(['products', data.productTypeId]);
    },
  });
};
