import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./home.styles";
import Text from "@/components/ui/text";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import DashboardHeader from "./components/dashboard-header";
import DashboardWalletCard from "./components/dashboard-wallet-card";

const Home = () => {
  return (
    <ScreenWrapper insets="top">
      <LinearGradient
        colors={["rgba(0, 198, 251, 0.25)", "rgba(0, 0, 0, 0)"]}
        style={styles.header_container}
      >
        <DashboardHeader />

        <DashboardWalletCard />
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default Home;
