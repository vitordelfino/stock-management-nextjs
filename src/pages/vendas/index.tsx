import { Center, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';
const Vendas = (): JSX.Element => {
  return (
    <Center w="100%" h="100%" flexDirection="column">
      <Text fontSize="5xl">Vendas</Text>
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
  return {
    props: {},
  };
};

export default Vendas;
