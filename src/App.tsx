import React from 'react';

import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const showCart = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
