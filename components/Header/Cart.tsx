import { Flex, Image, Text } from "@chakra-ui/react";
import { memo } from "react";
import CartSvg from "../../assets/svgs/cart.svg";

const Cart = memo(() => {
  return (
    <Flex alignItems="center" gap={2}>
      <Image h="22px" src={CartSvg} w="22px" />
      <Text>Cart</Text>
    </Flex>
  );
});

export default Cart;
