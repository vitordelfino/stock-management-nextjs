import { HStack, StackProps } from '@chakra-ui/layout';
import styled from 'styled-components';

export const StyledCroll = styled(HStack)<StackProps>`
  &::-webkit-scrollbar {
    width: 10px;
    height: 13px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #f9d4ff 14%, #c7ceff 64%);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(13deg, #c7ceff 14%, #f9d4ff 64%);
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px transparent;
  }
`;
