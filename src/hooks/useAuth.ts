import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  clearAuth,
  User,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, token } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo authentication - in real app, replace with actual API call
      if (email && password) {
        const mockUser: User = {
          id: "1",
          email: email,
          name: "Demo User",
          avatar: "https://via.placeholder.com/100",
        };

        const mockToken = "demo-jwt-token-" + Date.now();

        dispatch(
          loginSuccess({
            user: mockUser,
            token: mockToken,
          })
        );

        return { success: true };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      dispatch(loginFailure());
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const updateUser = (userData: User) => {
    dispatch(setUser(userData));
  };

  const clearAuthData = () => {
    dispatch(clearAuth());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    signOut,
    updateUser,
    clearAuthData,
  };
};
