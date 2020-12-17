import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState as userInitialState } from "../features/user/userSlice";
import * as api from "../api/session";

/**
 * Sets preloadedState with logged in user data if there is an active session
 * @returns preloadedState
 */
export async function setPreloadedUserState() {
  let preloadedState = {
    user: { ...userInitialState }
  };
  
  try {
    const response = await api.getUserSession();
    
    if (response.data.data) {
      preloadedState.user.data = response.data.data;
      preloadedState.user.isLoggedIn = true;
    }
      }
    }

  } catch (error) {
    console.log(error);
  }

  return preloadedState;
}

/**
 * Returns the configured redux store after setting the preloaded user state object
 */
export const configStore = async () => {

  try {
    return configureStore({
      reducer: {
        user: userReducer
      },
      preloadedState: await setPreloadedUserState()
    })
  } catch (error) {
    console.log(error);
  }
}

export default configureStore({
  reducer: {
    user: userReducer,
  }
});
