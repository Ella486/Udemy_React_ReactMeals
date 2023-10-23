import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCarState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });
        
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            /**
             * <state를 변경할 수 없는 방식으로 업데이트하려면?
             * ==> 이전 state 스냅샷을 편집하고 싶지 않다! >
             * concat() : 새 배열을 도출 (메모리에서 이전 배열 편집 x)
             * push(): 기존 배열 편집 (즉, state에 변화가 생김)
             *  */
            updatedItems = state.items.concat(action.item);
        } 

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'ADD_MODAL_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });
        
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        } 

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => {
                return item.id !== action.id;
            });
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCarState;
};

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCarState);

    const addItemToCartHandler = (item) => {
        if (props.cartIsShown === true) {
            dispatchCartAction({
                type: 'ADD_MODAL_CART',
                item: item
            });
        } else {
            dispatchCartAction({
                type: 'ADD',
                item: item
            });
        }
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;