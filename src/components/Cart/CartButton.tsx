import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { UiAction, toggle } from '../../store/ui-slice';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const CartButton = () => {
  const dispatch = useDispatch<Dispatch<UiAction>>();
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity)

  const toggleCartHandler = () => {
    dispatch(toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
