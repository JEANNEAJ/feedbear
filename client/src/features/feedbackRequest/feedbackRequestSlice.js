import { createSlice } from "@reduxjs/toolkit";

import * as api from "../../api/forms";

export const formSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {},
});

export const { updateName, updateEmail, updateMessage } = formSlice.actions;

export const submit = (form) => async (dispatch) => {
  console.log("form:", form);
  try {
    const { data } = await api.createForm(form);
    console.log("submit success");
    console.log(data);
    // dispatch({ name, email, message });
  } catch (err) {
    console.log("submit failed");
    console.log(err);
  }
};

export const update = (form, id) => async (dispatch) => {
  try {
    const { data } = await api.updateFeedbackDetails(id, form);
    console.log("update success");
    console.log(data);
  } catch (err) {
    console.log("update failed");
    console.log(err);
  }
}

export default formSlice.reducer;
