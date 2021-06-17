import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Grid,
  GridItem,
  Img,
  useToast,
} from '@chakra-ui/react';
import Input from '../../components/Input';
import InputMask from 'react-input-mask';
import { useCallback, useState } from 'react';
import { useAuth } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Lottie from 'react-lottie';
import * as animationData from './delivery-cart-box.json';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { register, handleSubmit } = useForm();

  const { signIn } = useAuth();
  const onSubmit = useCallback(async (data) => {
    try {
      setLoading(true);
      await signIn(
        data.document.replace(/\./g, '').replace(/-/g, ''),
        data.password
      );
    } catch (e) {
      setLoading(false);
      const error = e as AxiosError;
      let message = 'Houve algum problema ao tentar realizar login';
      if (error.response?.data.code === 'VALIDATION_ERROR')
        message = error.response.data.errors.join('.' + '\n');
      else if (error.response?.data.message) {
        message = error.response.data.message;
      }
      toast({
        title: 'Erro ao realizar login',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" h="100vh" w="100vw" gap={6}>
      <GridItem bg="purple.900" colSpan={2}>
        <Center flexDirection="column" height="80%">
          {/* <Img src="/estoque.gif" w="md" mb="7" /> */}
          <Lottie
            isClickToPauseDisabled={true}
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={500}
            width={500}
          />
          <Text
            filter="drop-shadow(0.2rem 0.2rem 0.5rem #d3c9f6)"
            fontSize="4xl"
            color="purple.100"
            mt="10"
            fontWeight="medium"
          >
            Gerenciador de Estoque
          </Text>
        </Center>
      </GridItem>
      <GridItem colSpan={3}>
        <Center flexDirection="column" height="100%">
          {/* <Heading top="-20" position="relative" color="purple.900">
            Gerenciador de Estoque
          </Heading> */}
          <Flex
            border="1px solid"
            direction="column"
            borderRadius="sm"
            w="xl"
            p="10"
            borderColor="purple.800"
            alignItems="center"
            bg="rgba(233, 216, 253, 0.3)"
            data-aos="fade-right"
          >
            <Text fontWeight="medium" fontSize="md">
              Preencha o formulário para realizer login
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="document" isRequired mt="5">
                <FormLabel fontSize="xl">Documento</FormLabel>
                {/* <Input bg="purple.50" placeholder="999.999.999-99" /> */}
                <InputMask
                  {...register('document')}
                  name="document"
                  mask="999.999.999-99"
                  maskChar={null}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      bg="purple.50"
                      placeholder="999.999.999-99"
                    />
                  )}
                  {/* <MaterialInput  type="tel" disableUnderline onChange={props.onChange} />} */}
                </InputMask>
              </FormControl>

              <FormControl id="password" isRequired mt="5">
                <FormLabel fontSize="xl">Senha</FormLabel>
                <Input
                  {...register('password')}
                  name="password"
                  bg="purple.50"
                  type="password"
                  placeholder="*********"
                />
              </FormControl>

              <Button
                mt="5"
                // onClick={onFinish}
                isLoading={loading}
                loadingText="ENTRAR"
                size="lg"
                type="submit"
              >
                entrar
              </Button>
            </form>
          </Flex>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default Login;
