import styled, { css } from 'styled-components';
import { Link, ListItem, ListItemProps } from '@chakra-ui/react';

interface IListItemProps extends ListItemProps {
  active: boolean;
}

export const StyleListItem = styled(ListItem)<IListItemProps>`
  display: flex;
  position: relative;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 4.2rem;
        bottom: 0;
        margin-left: -4rem;
        height: 2.3rem;
        width: 3px;
        border-radius: 0 2px 2px 0;
        background: #322659;
      }
    `}

  &:hover {
    &::after {
      content: '';
      position: absolute;
      left: 4.2rem;
      bottom: 0;
      margin-left: -4rem;
      height: 2.3rem;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: #322659;
    }
  }
`;
