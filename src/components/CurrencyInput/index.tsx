import { PropsWithChildren } from 'react';
import { StyledCurrencyInput } from './styles';
import { chakra, InputProps } from '@chakra-ui/react';
const currencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

type IProps = {
  placeholder: string;
  onChangeInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    maskedValue: string
  ) => void;
  style?: any;
  disabled?: any;
  onBlur?: any;
  name?: string;
  ref?: any;
};

export const CurrencyInput: React.FC<PropsWithChildren<InputProps & IProps>> =
  ({ onChangeInput, style, placeholder, disabled, onBlur, ...rest }) => {
    const ChakraCurrencyInput = chakra(StyledCurrencyInput);
    return (
      <ChakraCurrencyInput
        config={currencyConfig}
        currency="BRL"
        onChange={onChangeInput}
        maskChar={null}
        style={style}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        h="10"
        border="1px solid"
        borderRadius="md"
        borderColor="inherit"
        paddingInlineStart="4"
        paddingInlineEnd="4"
        fontSize="md"
        {...rest}
      />
    );
  };
