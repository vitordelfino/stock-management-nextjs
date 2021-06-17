import { Flex, Text, Icon } from '@chakra-ui/react';

type MenuItemProps = {
  text: string;
  delay: string;
  icon?: any;
  onClick: () => void;
};
const MenuItem: React.FC<MenuItemProps> = ({ text, delay, icon, onClick }) => {
  return (
    <Flex data-aos="fade-down" data-aos-delay={delay}>
      <Flex
        bg="purple.200"
        h="100"
        w="200px"
        borderRadius="md"
        justifyContent="center"
        alignItems="center"
        mr="8"
        cursor="pointer"
        transition="transform 0.2s !important"
        _hover={{
          transform: 'translate(0, -5px) !important',
          bg: 'purple.300',
        }}
        direction="column"
        onClick={onClick}
      >
        {icon && <Icon as={icon} w={6} h={6} />}
        <Text fontWeight="medium" fontSize="lg">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MenuItem;
