import { Text } from "@react-navigation/elements";
import { View, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { styles } from "./profile.styles";
import { ProfileProps } from "./profile.types";

export function Profile({ route }: ProfileProps) {
  const { user, isAuthenticated, isLoading, login, signOut } = useAuth();

  const handleLogin = async () => {
    const result = await login("demo@example.com", "password123");
    if (result.success) {
      Alert.alert("Success", "Logged in successfully!");
    } else {
      Alert.alert("Error", result.error || "Login failed");
    }
  };

  const handleLogout = () => {
    signOut();
    Alert.alert("Success", "Logged out successfully!");
  };

  return (
    <View style={styles.container}>
      <Text>{route.params.user}'s Profile</Text>

      <View style={{ marginTop: 20 }}>
        <Text>
          Auth Status: {isAuthenticated ? "Logged In" : "Not Logged In"}
        </Text>
        {isLoading && <Text>Loading...</Text>}

        {isAuthenticated && user && (
          <View style={{ marginTop: 10 }}>
            <Text>User: {user.email}</Text>
            <Text>Name: {user.name}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={isAuthenticated ? handleLogout : handleLogin}
          style={{
            backgroundColor: isAuthenticated ? "#ff4444" : "#44ff44",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            {isAuthenticated ? "Logout" : "Login (Demo)"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
