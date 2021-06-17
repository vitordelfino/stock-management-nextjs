import { ProductType } from '../../types';
import { Flex, Text, Divider, Spinner } from '@chakra-ui/react';
import { useProductByType } from '../../hooks/useProductsByType';
import { StyledCroll } from './styles';

import ProductCard from '../ProductCard';
type ProductListProps = {
  productType: ProductType;
};

const ProductList: React.FC<ProductListProps> = ({ productType }) => {
  const { isLoading, data } = useProductByType(productType._id);

  return (
    <Flex direction="column">
      <Text fontSize="xl" fontWeight="medium">
        {productType.name}
        {isLoading && <Spinner />}
      </Text>
      <Divider size="lg" />

      <StyledCroll spacing={3} my="8" overflowX="auto" p="5">
        {data &&
          data.map((product, i) => (
            <ProductCard
              key={product._id}
              product={product}
              delay={(i * 100).toString()}
            />
          ))}
      </StyledCroll>
    </Flex>
  );
};

export default ProductList;
