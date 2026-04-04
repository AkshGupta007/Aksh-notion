import { createSlice } from "@reduxjs/toolkit";

// const getInitialToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token") || null;
//   }
//   return null; // fallback for server-side
// };


let parsedToken = null;
try {
  const storedToken = localStorage.getItem("token");
  if (storedToken && storedToken !== "undefined") {
    parsedToken = JSON.parse(storedToken);
  }
} catch (error) {
  console.error("Invalid token in localStorage:", error);
  parsedToken = null;
}

const initialState = {
  token: parsedToken,
  signup: null,
  loading: false,
};


// console.log(localStorage.getItem("token"));

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // localStorage.setItem("token", action.payload);
    },
    setSignup: (state, action) => {
      state.signup = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, setSignup, setLoading } = authSlice.actions;
export default authSlice.reducer;
