import { createSlice } from "@reduxjs/toolkit";

// ── Load saved cart from localStorage on app start ──
const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved
      ? JSON.parse(saved)
      : { cart: [], totalitems: 0, totalPrice: 0 };
  } catch {
    return { cart: [], totalitems: 0, totalPrice: 0 };
  }
};

// ── Save current cart state to localStorage ──
const saveCart = (state) => {
  try {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        cart: state.cart,
        totalitems: state.totalitems,
        totalPrice: state.totalPrice,
      }),
    );
  } catch {}
};

const cartslice = createSlice({
  name: "cart",
  initialState: loadCart(), // ← replaces hardcoded initialState
  reducers: {
    addtocart: (state, action) => {
      // prevent duplicate items
      const exists = state.cart.find((item) => item._id === action.payload._id);
      if (exists) return;

      state.cart.push(action.payload);
      state.totalitems += 1;
      state.totalPrice += action.payload.price;
      saveCart(state); // ← persist
    },

    removeItem: (state, action) => {
      const itemToRemove = state.cart.find(
        (item) => item._id === action.payload._id,
      );

      if (itemToRemove) {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id,
        );
        state.totalitems -= 1;
        state.totalPrice -= itemToRemove.price;
        saveCart(state); // ← persist
      }
    },

    resetcart: (state) => {
      state.cart = [];
      state.totalitems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart"); // ← wipe from localStorage too
    },
  },
});

export const { addtocart, removeItem, resetcart } = cartslice.actions;
export default cartslice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// // const initialstate={ //     token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :null, // }
// const initialState = {
//   cart: [],
//   totalitems: 0,
//   totalPrice: 0,
// };
// const cartslice = createSlice({
//   name: "cart",
//   initialState: initialState,
//   reducers: {
//     setTotalItems: (state, value) => {
//       state.totalitems +=1;
//     },
//     resetcart: (state) => {
//       state.items = [];
//       state.totalitems = 0;
//     },
//     addtocart: (state, value) => {
//       state.cart.push(value.payload);
//       state.totalitems += 1;
//       state.totalPrice += value.payload.price;
//     },
//     removeItem: (state, action) => {
//       const itemToRemove = state.cart.find(
//         (item) => item.id === action.payload,

//       );

//       if (itemToRemove) {
//         state.totalitems -= 1;
//         state.totalPrice -= itemToRemove.price;

//         // filter returns a new array without the removed item
//         state.cart = state.cart.filter((item) => item.id !== action.payload);
//       }
//       //locslstorage.setitema("cart")
//     },
//   },
//   // add to cart
//   // remove to cart
// });
// export const { setTotalItems,resetcart,addtocart,removeItem } = cartslice.actions;
// export default cartslice.reducer;
