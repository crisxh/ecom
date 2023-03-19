import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{ cartCount }</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;