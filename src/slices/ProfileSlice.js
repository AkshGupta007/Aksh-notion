import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./authSlice";
// const initialstate={ //     token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :null, /
// / }
let parseduser= null;
try {
  const storeduser = localStorage.getItem("user");
  if (storeduser && storeduser !== "undefined") {
    parseduser = JSON.parse(storeduser);
  }
} catch (error) {
  console.error("Invalid user in localStorage:", error);
  parseduser= null;
}


const initialState = {
    user:parseduser,
    loading:false
 };

const profileslice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser: (state, value) => {
      state.user = value.payload;
    },
    setLoading:(state,value)=>{
      state.loading=value.payload;
    }
  },
});

export const { setUser } = profileslice.actions;
export default profileslice.reducer;
