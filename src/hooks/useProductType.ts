import { useQuery, UseQueryResult } from 'react-query';
import api from '../services/api';
import { ProductType } from '../types';

export const useProductType = (): UseQueryResult<ProductType[]> => {
  const fetchProductTypeList = async (): Promise<ProductType[]> => {
    const response = await api.get<ProductType[]>('/product-type');
    return response.data;
  };
  return useQuery('product-type-list', fetchProductTypeList, {
    cacheTime: 60 * 60 * 1, // 1 hour
    initialData: [],
  });
};
