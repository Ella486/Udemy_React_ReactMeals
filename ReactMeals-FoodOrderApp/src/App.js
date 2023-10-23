import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShwon] = useState(false);

  const showCartHandler = () => {
    setCartIsShwon(true);
  };

  const hideCartHandler = () => {
    setCartIsShwon(false);
  };

  return (
    <CartProvider cartIsShown={cartIsShown}>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
