import { Box, Img, Text, Icon, Tooltip, Divider } from '@chakra-ui/react';
import { IoOpenOutline } from 'react-icons/io5';
import { MdMoneyOff, MdAttachMoney } from 'react-icons/md';
import { Product } from '../../types';
import { formatCurrency } from '../../utils';

type ProductCardProps = {
  product: Product;
  delay: string;
};
const ProductCard: React.FC<ProductCardProps> = ({ product, delay }) => {
  return (
    <Box
      minW="300px"
      w="300px"
      borderWidth="1px"
      borderRadius="lg"
      data-aos="fade-down"
      data-aos-delay={delay}
      _hover={{
        filter: 'drop-shadow(0.2rem 0.2rem 0.5rem #b3a6e4)',
      }}
    >
      <Img
        src={`https://via.placeholder.com/300x150/553C9A/FFFFFF?text=${product.name}`}
        alt={product.name}
        fallbackSrc="https://via.placeholder.com/150?text=teste"
      />
      <Box p="5">
        <Box
          d="flex"
          alignItems="center"
          isTruncated
          justifyContent="space-between"
        >
          <Text fontWeight="medium" fontSize="xl">
            {product.name}
          </Text>

          <Tooltip label="Editar produto" fontSize="md">
            <Icon as={IoOpenOutline} w={5} h={5} mb="1" cursor="pointer" />
          </Tooltip>
        </Box>
        <Box d="flex" alignItems="baseline" isTruncated my="3">
          <Tooltip
            label={product.description}
            colorScheme="purple"
            placement="bottom-start"
          >
            <Text fontWeight="normal" fontSize="lg">
              {product.description
                ? product.description
                : 'Produto sem descrição'}
            </Text>
          </Tooltip>
        </Box>
        <Divider />
        <Box d="flex" alignItems="center" isTruncated my="3">
          <Icon as={MdMoneyOff} w={5} h={5} mr="2" color="red.600" mb="1" />
          <Text fontWeight="normal" fontSize="lg">
            {formatCurrency(product.purchasePrice)}
          </Text>
        </Box>

        <Box d="flex" alignItems="baseline" isTruncated my="3">
          <Icon
            as={MdAttachMoney}
            w={5}
            h={5}
            mr="2"
            color="green.600"
            mb="1"
          />
          <Text fontWeight="normal" fontSize="lg">
            {formatCurrency(product.salePrice)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
