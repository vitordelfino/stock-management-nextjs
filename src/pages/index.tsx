import { Center, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useAuth } from '../contexts/auth';
import { parseCookies } from 'nookies';
import { dehydrate } from 'react-query/hydration';
import { QueryClient } from 'react-query';

import { getAPIClient } from '../services/axios';
const Home = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Center w="100%" h="100%" flexDirection="column">
      <Text fontSize="5xl">Área Logada</Text>
      <Text fontSize="5xl">{user?.name}</Text>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'stock_management.token': token } = parseCookies(ctx);

  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  const fetchProductTypeList = async () => {
    const api = getAPIClient(ctx);
    const response = await api.get('/product-type');
    return response.data;
  };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('product-type-list', fetchProductTypeList);
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
};

export default Home;
