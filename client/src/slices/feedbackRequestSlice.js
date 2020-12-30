import { createSlice } from "@reduxjs/toolkit";

import * as api from "../api/forms";

export const formSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {},
});

export const { updateName, updateEmail, updateMessage } = formSlice.actions;

export const submit = (formData) => async () => {
  try {
    const { data } = await api.createForm(formData);
    console.log("submit success");
    console.log(data);
  } catch (err) {
    console.log("submit failed");
    console.log(err);
  }
};

export const update = (id, formData) => async () => {
  try {
    const { data } = await api.updateFeedbackDetails(id, formData);
    console.log("update success");
    console.log(data);
  } catch (err) {
    console.log("update failed");
    console.log(err);
  }
};

export default formSlice.reducer;
