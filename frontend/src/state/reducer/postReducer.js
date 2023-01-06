import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//
//creatinPost
export const createPost = createAsyncThunk(
  "post/createPost",
  async (userObj, thunkAPI) => {
    console.log("userObj from createPost", userObj);
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
    let data = await fetch("https://lywmqv.sse.codesandbox.io/createpost", obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

//readingPost
export const readPost = createAsyncThunk("post/readPost", async (thunkAPI) => {
  const obj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      authtoken: localStorage.getItem("token")
    }
  };
  //
  let data = await fetch("https://lywmqv.sse.codesandbox.io/readpost", obj);
  let data2 = await data.json();
  console.log("api-response from thunk", data2);
  //
  return data2;
});

//
const initialState = {
  postArray: [],
  status: "idle", //'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  postmsg: "",
  //
  readPostArray: [],
  readPostStatus: "idle",
  readPostError: null
};

const postSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearPmsg: (state) => {
      state.postmsg = "";
      console.log("POSTmsg has been cleared.");
    }
  },
  extraReducers: (builder) => {
    //creatingPost
    builder.addCase(createPost.fulfilled, (state, action) => {
      //
      if (Object.keys(action.payload)[0] === "error") {
        state.postmsg = action.payload.error[0].msg;
        console.log("createPost msg", state.postmsg);
        // alert(`${state.postmsg}`);
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.readPostArray = action.payload.result;
        state.postmsg = action.payload.msg;
        // alert(`${state.postmsg}`);
        console.log("resp from createPost", state.postArray);
      }
      //
    });
    builder.addCase(createPost.pending, (state, action) => {});
    builder.addCase(createPost.rejected, (state, action) => {});
    //
    //readingPost
    builder.addCase(readPost.fulfilled, (state, action) => {
      state.readPostArray = action.payload.result;
      state.readPostStatus = "succeeded";
      //
    });
    builder.addCase(readPost.pending, (state, action) => {
      state.readPostStatus = "loading";
    });
    builder.addCase(readPost.rejected, (state, action) => {
      state.readPostStatus = "idle";
      state.readPostError = action.payload;
    });
    //
  }
});

export const { clearPmsg } = postSlice.actions;
export default postSlice.reducer;
