import React, { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  let { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{ cartCount }</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;