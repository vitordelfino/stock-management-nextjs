import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ProductType } from '../../../types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  Text,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  HStack,
  useToast,
  ModalOverlay,
} from '@chakra-ui/react';
import { addProduct } from '../../../hooks/addProduct';
import { CurrencyInput } from '../../../components/CurrencyInput';
type NovoProdutoProps = {
  tipos: ProductType[];
  isOpen: boolean;
  onClose: () => void;
};

const NovoProduto: React.FC<NovoProdutoProps> = ({
  isOpen,
  onClose,
  tipos = [],
}) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const { mutate, isSuccess, isError, isLoading } = addProduct();
  const onSubmit = useCallback((data) => {
    if (!data.purchasePrice || !data.salePrice) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Por favor, preencha preço de compra e preço de venda',
        position: 'top',
        duration: 3000,
      });
      return;
    }
    mutate({
      ...data,
      purchasePrice: Number(data.purchasePrice),
      salePrice: Number(data.salePrice),
    });
  }, []);
  const handleChangePurchasePrice = useCallback(
    (event: any, value: any, _: any) => {
      event.preventDefault();
      setValue('purchasePrice', value);
      console.log('value', value);
    },
    []
  );

  const handleChangeSalePrice = useCallback(
    (event: any, value: any, _: any) => {
      event.preventDefault();
      setValue('salePrice', value);
    },
    []
  );

  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        status: 'success',
        title: 'Sucesso',
        description: 'Novo produto adicionado',
        position: 'top-right',
        duration: 3000,
      });
      reset();
    }
    if (isError)
      toast({
        status: 'error',
        title: 'Error',
        description:
          'Houve algum erro ao adicionar o produto. Por favor, tente novamente',
        position: 'top-right',
        duration: 3000,
      });
  }, [isSuccess, isError]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Cadastro de novo produto</Text>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Flex w="100%" px="5" mb="5" direction="column">
              <FormControl id="productTypeId" isRequired mt="5">
                <FormLabel fontSize="xl">Tipo do produto</FormLabel>
                <Select
                  placeholder="Selecione um tipo de produto"
                  {...register('productTypeId')}
                  name="productTypeId"
                  bg="purple.50"
                >
                  {tipos.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="name" isRequired mt="5">
                <FormLabel fontSize="xl">Nome</FormLabel>
                <Input
                  {...register('name')}
                  name="name"
                  bg="purple.50"
                  placeholder="Biscuit"
                />
              </FormControl>
              <HStack alignItems="center" justifyContent="center" mt="5">
                <FormControl id="purchasePrice" isRequired>
                  <FormLabel fontSize="xl">Preço de compra</FormLabel>

                  <CurrencyInput
                    name="purchasePrice"
                    bg="purple.50"
                    placeholder="R$ 10,00"
                    onChangeInput={handleChangePurchasePrice}
                  />
                </FormControl>
                <FormControl id="salePrice" isRequired>
                  <FormLabel fontSize="xl">Preço de venda</FormLabel>
                  <CurrencyInput
                    name="salePrice"
                    bg="purple.50"
                    placeholder="R$ 10,00"
                    onChangeInput={handleChangeSalePrice}
                  />
                </FormControl>
              </HStack>
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

export default NovoProduto;
