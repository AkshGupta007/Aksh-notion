import { createSlice } from "@reduxjs/toolkit";
// const initialstate={ //     token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :null, // }
const initialState = {
  cart: [],
  totalitems: 0,
  totalPrice: 0,
};
const cartslice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems: (state, value) => {
      state.totalitems +=1;
    },
    resetcart: (state) => {
      state.items = [];
      state.totalitems = 0;
    },
    addtocart: (state, value) => {
      state.cart.push(value.payload);
      state.totalitems += 1;
      state.totalPrice += value.payload.price;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload,
        
      );

      if (itemToRemove) {
        state.totalitems -= 1;
        state.totalPrice -= itemToRemove.price;

        // filter returns a new array without the removed item
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
      //locslstorage.setitema("cart")
    },
  },
  // add to cart
  // remove to cart
});
export const { setTotalItems,resetcart,addtocart,removeItem } = cartslice.actions;
export default cartslice.reducer;
