import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userObj, thunkAPI) => {
    console.log("userObj from registerUser", userObj);
    //
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(userObj)
    };
    //
    let data = await fetch("https://lywmqv.sse.codesandbox.io/newuser", obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

//updating User data
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userObj, thunkAPI) => {
    console.log("userObj from updateUser", userObj);
    //
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      },
      body: JSON.stringify(userObj)
    };
    //
    let data = await fetch("https://lywmqv.sse.codesandbox.io/updateuser", obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userObj, thunkAPI) => {
    console.log("userObj from loginUser", userObj);
    //
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(userObj)
    };
    //
    let data = await fetch("https://lywmqv.sse.codesandbox.io/loginuser", obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

const initialState = {
  //signupUser
  dataArray: [],
  signupmsg: "",
  signuperror: null,
  //loginUser
  loginArray: [],
  loginmsg: "",
  ownerInfo: "",
  loginerror: null,
  //updateUser
  updateArray: [],
  updatemsg: "",
  updateerror: null
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSmsg: (state) => {
      state.signupmsg = "";
      console.log("Signup_msg has been cleared");
    },
    clearLmsg: (state) => {
      state.loginmsg = "";
      console.log("Login_msg has been cleared");
    },
    clearUmsg: (state) => {
      state.updatemsg = "";
      console.log("Update_msg has been cleared");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.dataArray = state.dataArray.concat(action.payload);

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.signupmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.signupmsg = action.payload.msg;
      }
      //end of builder
    });
    builder.addCase(registerUser.pending, (state, action) => {});
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.signuperror = action.payload;
    });
    //
    builder.addCase(loginUser.fulfilled, (state, action) => {
      //
      state.loginArray = state.loginArray.concat(action.payload);
      console.log("userReducer fulfilled action.payload = ", action.payload);
      //
      //saving messages to state.msg so that it can be used on the front-side
      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.loginmsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.loginmsg = action.payload.msg;
        //
        if (action.payload.msg === "password matched") {
          state.loginmsg = action.payload.msg;
          state.ownerInfo = action.payload.ownerObj;
          localStorage.setItem("token", action.payload.token);
        }
      }
      //end of builder
    });
    builder.addCase(loginUser.pending, (state, action) => {
      console.log("userReducer pending action.payload = ", action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.loginerror = action.payload;
    });
    //updatingUser
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateArray = state.updateArray.concat(action.payload);

      if (Object.keys(action.payload)[0] === "error") {
        console.log("error exists...");
        state.updatemsg = action.payload.error[0].msg;
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.updatemsg = action.payload.msg;
        console.log("msg from updating thunk", state.updatemsg);
        //updating state.ownerinfo
        if (state.updatemsg === "User data has been updated.") {
          console.log("updating ownerInfo=>", action.payload.result.name);
          state.ownerInfo = {
            ...state.ownerInfo,
            name: action.payload.result.name,
            email: action.payload.result.email
          };
        }
      }
      //end of builder
    });
    builder.addCase(updateUser.pending, (state, action) => {});
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("error payload", action.payload);
      state.updateerror = action.payload;
    });
    //
  }
});

export const {
  clearSmsg,
  clearLmsg,
  clearUmsg,
  updateOwnerInfo
} = usersSlice.actions;
export default usersSlice.reducer;
