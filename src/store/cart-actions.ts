import { ThunkDispatch } from '@reduxjs/toolkit';
import { showNotification } from './ui-slice';
import { CartStateType, replaceCart } from './cart-slice';
import { RootActions, RootState } from './store';

export const fetchCartData = () => {
  return async (dispatch: ThunkDispatch<RootState, undefined, RootActions>) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-39eeb-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) throw new Error('Could not fetch cart data!');

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          changed: cartData.changed,
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed',
        })
      );
    }
  };
};

export const sendCartData = (cart: CartStateType) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, RootActions>) => {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-39eeb-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) throw new Error('Sending cart data failed.');
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        })
      );
    }
  };
};
