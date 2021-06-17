import { useRouter } from 'next/router';
import {
  Grid,
  GridItem,
  List,
  Text,
  Flex,
  Icon,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/auth';
import {
  IoCartOutline,
  IoHomeOutline,
  IoCubeOutline,
  IoTimeOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { StyleListItem } from './list-item';
import Link from 'next/link';

const DefaultLayout: React.FC = ({ children }) => {
  const { route } = useRouter();
  if (route.includes('login')) return <>{children}</>;
  const [value, setValue] = useState(new Date());
  const { user } = useAuth();
  const links = [
    {
      label: 'Home',
      href: '/',
      icon: IoHomeOutline,
    },
    {
      label: 'Produtos',
      href: '/produtos',
      icon: IoCubeOutline,
      childrens: [
        {
          label: 'Novo produto',
          href: '/produtos/novo',
        },
        {
          label: 'Tipo',
          href: '/produtos/tipo',
        },
      ],
    },
    {
      label: 'Vendas',
      href: '/vendas',
      icon: IoCartOutline,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" h="100vh" w="100vw" gap={6}>
      <GridItem bg="purple.200" colSpan={1} h="100%">
        <Flex w="100%" h="100%" direction="column">
          <VStack spacing="3" p="3" alignItems="start" ml="4">
            <Flex justifyContent="space-between" w="100%" alignItems="center">
              <Text fontSize="xl" fontWeight="medium">
                <Icon as={IoTimeOutline} w={6} h={6} mr="2" mb="1" />
                {value.toLocaleString()}
              </Text>
              <Icon
                as={IoLogOutOutline}
                w={6}
                h={6}
                cursor="pointer"
                onClick={handleSignOut}
              />
            </Flex>
            <Text fontSize="xl" fontWeight="medium">
              <Icon as={IoPersonCircleOutline} w={6} h={6} mr="2" mb="1" />
              {user?.name ?? 'Desconhecido'}
            </Text>
          </VStack>
          <List spacing={8} my="10">
            {links.map((l) => (
              <StyleListItem
                w="100%"
                key={l.href}
                active={route === l.href && true}
              >
                <ChakraLink as={Link} href={l.href} w="100%">
                  <Flex alignItems="center" mx="6" w="100%">
                    <Icon as={l.icon} w={6} h={6} mr={3} />
                    <Text cursor="pointer" fontSize="2xl" fontWeight="medium">
                      {l.label}
                    </Text>
                  </Flex>
                </ChakraLink>
              </StyleListItem>
            ))}
          </List>
        </Flex>
      </GridItem>
      <GridItem colSpan={4}>{children}</GridItem>
    </Grid>
  );
};

export default DefaultLayout;
