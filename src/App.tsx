import React, { useEffect } from 'react';

import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { NotificationType, showNotification } from './store/ui-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );
  const notification = useSelector<RootState, NotificationType | null>(
    (state) => state.ui.notification
  );
  const cart = useSelector<RootState, any>((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://react-http-39eeb-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) throw new Error('Sending cart data failed.');

      const responseData = await response.json();

      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        })
      );
    });
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
