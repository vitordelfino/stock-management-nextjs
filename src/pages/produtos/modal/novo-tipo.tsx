import {
  Modal,
  ModalContent,
  ModalHeader,
  Text,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  ModalFooter,
  useToast,
  ModalOverlay,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addProductType } from '../../../hooks/addProductType';

type NovoTipoProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NovoTipo: React.FC<NovoTipoProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();

  const { mutate, isSuccess, isError, isLoading } = addProductType();
  const onSubmit = useCallback((data) => {
    mutate(data);
  }, []);

  const toast = useToast();

  useEffect(() => {
    if (isSuccess)
      toast({
        status: 'success',
        title: 'Sucesso',
        description: 'Novo tipo de produto adicionado',
        position: 'top-right',
        duration: 3000,
      });
    if (isError)
      toast({
        status: 'error',
        title: 'Error',
        description:
          'Houve algum erro ao adicionar o tipo de produto. Por favor, tente novamente',
        position: 'top-right',
        duration: 3000,
      });
  }, [isSuccess, isError]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Cadastro de novo tipo de produto</Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Flex w="100%" px="5" mb="5" direction="column">
              <FormControl id="name" isRequired mt="5">
                <FormLabel fontSize="xl">Nome</FormLabel>
                <Input
                  {...register('name')}
                  name="name"
                  bg="purple.50"
                  placeholder="Biscuit"
                />
              </FormControl>
              <FormControl id="description" mt="5">
                <FormLabel fontSize="xl">Descrição</FormLabel>
                <Input
                  {...register('description')}
                  name="description"
                  bg="purple.50"
                  placeholder="descrição do tipo do produto"
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w="96%" justifyContent="start">
              <Button
                isLoading={isLoading}
                loadingText="SALVAR"
                size="lg"
                type="submit"
              >
                salvar
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NovoTipo;
