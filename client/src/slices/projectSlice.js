import { createSlice } from "@reduxjs/toolkit";

import * as projectApi from "../api/projects";

export const projectSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {},
});

export const { updateName, updateEmail, updateMessage } = projectSlice.actions;

export const submit = (formData) => async () => {
  try {
    const { data } = await projectApi.createProject(formData);
    console.log("submit success");
    console.log(data);
    return { data }
  } catch (err) {
    console.log("submit failed");
    console.log(err);
  }
};

export const update = (id, formData) => async () => {
  try {
    const { data } = await projectApi.updateProject(id, formData);
    console.log("update success");
    console.log(data);
  } catch (err) {
    console.log("update failed");
    console.log(err);
  }
};

export default projectSlice.reducer;
