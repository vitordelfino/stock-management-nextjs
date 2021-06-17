import styled from 'styled-components';
import CurrencyInput from 'react-intl-currency-input';

export const StyledCurrencyInput = styled(CurrencyInput)`
  width: 100%;
  min-width: 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  transition: all 0.2s;

  &:hover {
  }

  &:focus {
    border-color: #322659;
    z-index: 1;
    box-shadow: 0 0 0 1px #322659;
  }
`;
