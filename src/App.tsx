import React, { useEffect } from 'react';

import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import { NotificationType } from './store/ui-slice';
import { sendCartData, fetchCartData } from './store/cart-actions';
import { CartStateType } from './store/cart-slice';

let isInitial = true;

function App() {
  const dispatch = useAppDispatch();
  const showCart = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );
  const notification = useSelector<RootState, NotificationType | null>(
    (state) => state.ui.notification
  );
  const cart = useSelector<RootState, CartStateType>((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
