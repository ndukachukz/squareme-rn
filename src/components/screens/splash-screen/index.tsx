import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { SplashScreenProps } from "./splash-screen.types";
import styles from "./splash-screen.styles";

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationFinish,
  minDuration = 3000,
}) => {
  // const { colors } = useTheme();
  const animationRef = useRef<LottieView>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Ensure minimum duration
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  useEffect(() => {
    // Trigger finish callback when both conditions are met
    if (animationCompleted && minTimeElapsed && onAnimationFinish) {
      onAnimationFinish();
    }
  }, [animationCompleted, minTimeElapsed, onAnimationFinish]);

  const handleAnimationFinish = () => {
    setAnimationCompleted(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#12054A" />
      <LottieView
        ref={animationRef}
        source={require("@assets/lottie/Squareme-splash.json")}
        style={[styles.animation]}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        resizeMode="contain"
        speed={1}
      />
    </View>
  );
};
