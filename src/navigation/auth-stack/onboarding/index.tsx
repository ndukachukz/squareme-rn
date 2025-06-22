import { Animated, Image, ImageBackground, View } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import React, { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { verticalScale } from "@/utils/metrics";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import onboardingImgPattern from "@/assets/imgs/onboarding-bg-pattern.png";
import onboarding1 from "@/assets/imgs/onboarding-1.png";
import onboarding2 from "@/assets/imgs/onboarding-2.png";
import onboarding3 from "@/assets/imgs/onboarding-3.png";
import onboardingNotification from "@/assets/imgs/notification.png";
import styles, {
  TITLE_TICKER_HEIGHT,
  DESCRIPTION_TICKER_HEIGHT,
} from "./onboarding.styles";

const onboardingViews = [
  {
    title: "Spend your money easily without any complications",
    description: "Receive funds sent to you in seconds.",
    image: onboarding1,
  },
  {
    title: "A super secure way to pay your bills",
    description: "Pay your bills with the cheapest rates in town.",
    image: onboarding2,
  },
  {
    title: "A virtual USD card for your payments",
    description: "Shop globally. Renew your subscriptions with ease.",
    image: onboarding3,
  },
];

const AnimatedPager = Animated.createAnimatedComponent(PagerView);
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const Ticker = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const { colors } = useTheme();

  const inputRange = [0, onboardingViews.length];
  const titleTranslateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, onboardingViews.length * -TITLE_TICKER_HEIGHT],
  });

  const descriptionTranslateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, onboardingViews.length * -DESCRIPTION_TICKER_HEIGHT],
  });

  return (
    <View style={styles.ticker_container}>
      <View style={styles.title_ticker_container}>
        <Animated.View style={{ transform: [{ translateY: titleTranslateY }] }}>
          {onboardingViews.map(({ title }, index) => {
            return (
              <Text
                key={index}
                fontSize={24}
                fontWeight="600"
                style={[styles.title, { color: colors.gray500 }]}
              >
                {title}
              </Text>
            );
          })}
        </Animated.View>
      </View>

      <View style={styles.description_ticker_container}>
        <Animated.View
          style={{ transform: [{ translateY: descriptionTranslateY }] }}
        >
          {onboardingViews.map(({ description }, index) => {
            return (
              <Text
                key={index}
                fontSize={15}
                fontWeight="400"
                style={[styles.description, { color: colors.gray400 }]}
              >
                {description}
              </Text>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

const Onboarding = () => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const backgrounds = [colors.secondary300, "#4285F4", colors.tertiary400];

  const globalBackgroundColor = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: backgrounds,
    extrapolate: "clamp",
  });

  const createIndicatorAnimation = useCallback(
    (index: number) => {
      return Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
      ).interpolate({
        inputRange: [index - 0.5, index, index + 0.5],
        outputRange: [0.3, 1, 0.3],
        extrapolate: "clamp",
      });
    },
    [scrollOffsetAnimatedValue, positionAnimatedValue]
  );

  const createImageSlideUpAnimation = useCallback(
    (index: number) => {
      return Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
      ).interpolate({
        inputRange: [index - 0.5, index, index + 0.5],
        outputRange: [0, verticalScale(-50), 0],
        extrapolate: "clamp",
      });
    },
    [scrollOffsetAnimatedValue, positionAnimatedValue]
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom,
          backgroundColor: colors.background,
        },
      ]}
    >
      <AnimatedPager
        style={styles.pager_view}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      >
        {onboardingViews.map((item, index) => (
          <AnimatedImageBackground
            key={index}
            source={onboardingImgPattern}
            style={[
              styles.image_background,
              {
                flex: 1,
                backgroundColor: globalBackgroundColor,
              },
            ]}
          >
            <Animated.Image
              source={item.image}
              style={[
                styles.image,
                {
                  bottom:
                    index === 0 ? verticalScale(-320) : verticalScale(-260),
                  transform: [
                    { scale: 1.4 },
                    { translateY: createImageSlideUpAnimation(index) },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            {index === 0 && (
              <>
                <Image
                  source={onboardingNotification}
                  style={[styles.notification, styles.notification_1]}
                />

                <Image
                  source={onboardingNotification}
                  style={[styles.notification, styles.notification_2]}
                />
              </>
            )}
          </AnimatedImageBackground>
        ))}
      </AnimatedPager>

      <View style={styles.content_wrapper}>
        <View style={styles.indicator_wrapper}>
          {onboardingViews.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: colors.primary500,
                  opacity: createIndicatorAnimation(index),
                  transform: [
                    {
                      scale: Animated.add(
                        scrollOffsetAnimatedValue,
                        positionAnimatedValue
                      ).interpolate({
                        inputRange: [index - 0.5, index, index + 0.5],
                        outputRange: [0.8, 1.2, 0.8],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        <Ticker
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
        />

        <View style={styles.cta_wrapper}>
          <Button title="Create an account" />
          <Button title="I already have an account" variant="outline" />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
