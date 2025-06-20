import { Text } from "@react-navigation/elements";
import { View } from "react-native";
import { styles } from "./profile.styles";
import { ProfileProps } from "./profile.types";

export function Profile({ route }: ProfileProps) {
  return (
    <View style={styles.container}>
      <Text>{route.params.user}'s Profile</Text>
    </View>
  );
}
