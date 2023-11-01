import React from 'react';

// context 기본값으로 초기화 : 자동 완성 기능 사용하기 위해서(실제 사용 X)
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
}); 

export default CartContext;
