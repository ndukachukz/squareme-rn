import { useAuthStore, User } from "../store";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    token,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUser,
    clearAuth,
  } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      loginStart();

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

        loginSuccess(mockUser, mockToken);

        return { success: true };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      loginFailure();
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const signOut = () => {
    logout();
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const clearAuthData = () => {
    clearAuth();
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
