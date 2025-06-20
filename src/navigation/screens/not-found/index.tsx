import { Text, Button } from "@react-navigation/elements";
import { View } from "react-native";
import { styles } from "./not-found.styles";

export function NotFound() {
  return (
    <View style={styles.container}>
      <Text>404</Text>
      <Button screen="HomeTabs">Go to Home</Button>
    </View>
  );
}
