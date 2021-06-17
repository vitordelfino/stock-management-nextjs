import { Flex, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';
import React from 'react';
import { useProductType } from '../../hooks/useProductType';
import MenuItem from './menu-item';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import NovoProduto from './modal/novo-produto';
import ProductList from '../../components/ProductList';
const Produtos = (): JSX.Element => {
  const { data } = useProductType();
  const route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w="100%" h="100%" flexDirection="column" p={8}>
      <NovoProduto isOpen={isOpen} onClose={onClose} tipos={data || []} />
      <Flex mb="8">
        <MenuItem
          text="Novo Produto"
          delay="100"
          icon={IoAddOutline}
          onClick={onOpen}
        />
        <MenuItem
          text="Tipo de Produto"
          delay="200"
          onClick={() => route.push('/produtos/tipo')}
        />
      </Flex>
      {data && data.map((pt) => <ProductList key={pt._id} productType={pt} />)}
    </Flex>
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

export default Produtos;
