import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

const Input = ({ ...rest }: InputProps): JSX.Element => {
  return (
    <ChakraInput
      {...rest}
      borderColor="purple.500"
      _hover={{ borderColor: 'purple.900' }}
      fontSize="lg"
    />
  );
};

export default Input;
