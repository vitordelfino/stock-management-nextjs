import { Flex, Text, Divider, Button, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useProductType } from '../../../hooks/useProductType';
import NovoTipo from '../modal/novo-tipo';
const TipoProduto = (): JSX.Element => {
  const { isLoading, data } = useProductType();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w="100%" h="100%" flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="5xl">Tipos de Produto&nbsp;({data.length || 0})</Text>
        <Button mr="6" onClick={onOpen}>
          Novo Tipo
        </Button>
      </Flex>
      <Divider />
      <NovoTipo isOpen={isOpen} onClose={onClose} />
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

export default TipoProduto;
