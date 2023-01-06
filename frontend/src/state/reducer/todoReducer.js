import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//
// localStorage.getItem("token")
export const createTask = createAsyncThunk(
  "todo/createTask",
  async (userObj, thunkAPI) => {
    console.log("userObj from createTask", userObj);
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
    let data = await fetch("https://lywmqv.sse.codesandbox.io/createTask", obj);
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);

export const readTask = createAsyncThunk("todo/readTask", async (thunkAPI) => {
  const obj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      authtoken: localStorage.getItem("token")
    }
  };
  //
  let data = await fetch("https://lywmqv.sse.codesandbox.io/readTask", obj);
  let data2 = await data.json();
  console.log("api-response from thunk", data2);
  //
  return data2;
});

//
export const updateTask = createAsyncThunk(
  "todo/updateTask",
  async (userObj, thunkAPI) => {
    console.log("userObj from updateTask", userObj);
    //
    const obj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      },
      body: JSON.stringify(userObj.data)
    };
    //
    let data = await fetch(
      `https://lywmqv.sse.codesandbox.io/updateTask/${userObj.Id}`,
      obj
    );
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);
//
export const deleteTask = createAsyncThunk(
  "todo/deleteTask",
  async (userId, thunkAPI) => {
    console.log("userObj from deleteTask", userId);
    //
    const obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        authtoken: localStorage.getItem("token")
      }
      // body: JSON.stringify(userObj)
    };
    //
    let data = await fetch(
      `https://lywmqv.sse.codesandbox.io/deleteTask/${userId}`,
      obj
    );
    let data2 = await data.json();
    console.log("api-response from thunk", data2);
    //
    return data2;
  }
);
//
const initialState = {
  taskArray: [],
  status: "idle", //'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  todomsg: ""
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //creatingTask
    builder.addCase(createTask.fulfilled, (state, action) => {
      //
      if (Object.keys(action.payload)[0] === "error") {
        state.todomsg = action.payload.error[0].msg;
        console.log("todocreate msg", state.todomsg);
        alert(`${state.todomsg}`);
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.taskArray = action.payload.result;
        console.log("resp from todoCreate", state.taskArray);
      }
      // state.status = "succeeded";
      //
    });
    builder.addCase(createTask.pending, (state, action) => {
      // state.status = "loading";
    });
    builder.addCase(createTask.rejected, (state, action) => {
      // state.status = "idle";
      // state.error = action.payload;
    });
    //reading task
    builder.addCase(readTask.fulfilled, (state, action) => {
      state.taskArray = action.payload.result;
      state.status = "succeeded";
    });
    builder.addCase(readTask.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(readTask.rejected, (state, action) => {
      console.log("error payload", action.payload);

      state.status = "idle";
      state.error = action.payload;
    });
    //
    //updatingTask
    builder.addCase(updateTask.fulfilled, (state, action) => {
      //
      if (Object.keys(action.payload)[0] === "error") {
        state.todomsg = action.payload.error[0].msg;
        console.log("todocreate msg", state.todomsg);
        alert(`${state.todomsg}`);
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.taskArray = action.payload.result;
        console.log("resp from todoCreate", state.taskArray);
      }
      //
    });
    builder.addCase(updateTask.pending, (state, action) => {});
    builder.addCase(updateTask.rejected, (state, action) => {});
    //deletingTask
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      //
      if (Object.keys(action.payload)[0] === "error") {
        state.todomsg = action.payload.error[0].msg;
        console.log("todocreate msg", state.todomsg);
        alert(`${state.todomsg}`);
      } else if (Object.keys(action.payload)[0] === "msg") {
        state.taskArray = action.payload.result;
        console.log("resp from todoCreate", state.taskArray);
      }
      //
    });
    builder.addCase(deleteTask.pending, (state, action) => {});
    builder.addCase(deleteTask.rejected, (state, action) => {});
    //
  }
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
