import { useQuery, UseQueryResult } from 'react-query';
import api from '../services/api';
import { Product } from '../types';

export const useProductByType = (id: string): UseQueryResult<Product[]> => {
  const fetchProductByType = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/type/${id}`);
    return response.data;
  };

  return useQuery(['products', id], fetchProductByType, {
    cacheTime: 60 * 60 * 1, //1 hours
    initialData: [],
    enabled: !!id,
  });
};
