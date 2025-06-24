import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  ScrollView,
  Keyboard,
  Platform,
  Dimensions,
  KeyboardEvent,
  LayoutChangeEvent,
  TextInput,
  findNodeHandle,
} from "react-native";
import {
  KeyboardAwareViewProps,
  KeyboardState,
} from "./keyboard-aware-view.types";
import styles from "./keyboard-aware-view.styles";
import { useTheme } from "@/hooks/useTheme";

const KeyboardAwareView: React.FC<KeyboardAwareViewProps> = ({
  children,
  style,
  contentContainerStyle,
  enableOnAndroid = true,
  enableAutomaticScroll = true,
  extraHeight = 75,
  extraScrollHeight = 0,
  keyboardShouldPersistTaps = "handled",
  resetScrollToCoords = { x: 0, y: 0 },
  viewIsInsideTabBar = false,
  innerRef,
  onKeyboardWillShow,
  onKeyboardWillHide,
  onKeyboardDidShow,
  onKeyboardDidHide,
  ...scrollViewProps
}) => {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const viewRef = useRef<View>(null);
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    keyboardHeight: 0,
    isKeyboardVisible: false,
  });
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const currentlyFocusedInput = useRef<TextInput | null>(null);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      handleKeyboardShow
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      handleKeyboardHide
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    const dimensionsListener = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        setScreenHeight(window.height);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      dimensionsListener?.remove();
    };
  }, []);

  const scrollToFocusedInput = useCallback(
    (keyboardHeight: number) => {
      if (
        !scrollViewRef.current ||
        !viewRef.current ||
        !currentlyFocusedInput.current
      )
        return;

      const inputHandle = findNodeHandle(currentlyFocusedInput.current);
      if (!inputHandle) return;

      currentlyFocusedInput.current.measureInWindow((x, y, width, height) => {
        const inputBottom = y + height;
        const availableHeight =
          screenHeight - keyboardHeight - (viewIsInsideTabBar ? 50 : 0);

        if (inputBottom > availableHeight) {
          const scrollOffset =
            inputBottom - availableHeight + extraHeight + extraScrollHeight;

          scrollViewRef.current?.scrollTo({
            x: 0,
            y: scrollOffset,
            animated: true,
          });
        }
      });
    },
    [screenHeight, viewIsInsideTabBar, extraHeight, extraScrollHeight]
  );

  const handleKeyboardShow = useCallback(
    (event: KeyboardEvent) => {
      if (Platform.OS === "android" && !enableOnAndroid) return;

      const { height } = event.endCoordinates;

      setKeyboardState({
        keyboardHeight: height,
        isKeyboardVisible: true,
      });

      onKeyboardWillShow?.();

      if (enableAutomaticScroll && currentlyFocusedInput.current) {
        scrollToFocusedInput(height);
      }
    },
    [
      enableOnAndroid,
      onKeyboardWillShow,
      enableAutomaticScroll,
      scrollToFocusedInput,
    ]
  );

  const handleKeyboardHide = useCallback(() => {
    setKeyboardState({
      keyboardHeight: 0,
      isKeyboardVisible: false,
    });

    onKeyboardWillHide?.();

    if (scrollViewRef.current && resetScrollToCoords) {
      scrollViewRef.current.scrollTo({
        x: resetScrollToCoords.x,
        y: resetScrollToCoords.y,
        animated: true,
      });
    }
  }, [onKeyboardWillHide, resetScrollToCoords]);

  const handleKeyboardDidShow = useCallback(
    (event: KeyboardEvent) => {
      onKeyboardDidShow?.(event);
    },
    [onKeyboardDidShow]
  );

  const handleKeyboardDidHide = useCallback(() => {
    onKeyboardDidHide?.();
  }, [onKeyboardDidHide]);

  const onFocusCapture = useCallback((event: any) => {
    const target = event.target;
    if (target && target._inputRef) {
      currentlyFocusedInput.current = target._inputRef;
    } else if (target) {
      currentlyFocusedInput.current = target;
    }
  }, []);

  const handleRef = useCallback(
    (ref: ScrollView) => {
      scrollViewRef.current = ref;
      innerRef?.(ref);
    },
    [innerRef]
  );

  const contentInsetBottom = useMemo(
    () => (Platform.OS === "ios" ? keyboardState.keyboardHeight : 0),
    [keyboardState.keyboardHeight]
  );

  const scrollViewContentContainerStyle = useMemo(
    () => [
      styles.scrollViewContainer,
      contentContainerStyle,
      { paddingBottom: contentInsetBottom },
    ],
    [contentContainerStyle, contentInsetBottom]
  );

  return (
    <View
      ref={viewRef}
      style={[styles.container, { backgroundColor: colors.background }, style]}
      onTouchStart={onFocusCapture}
    >
      <ScrollView
        ref={handleRef}
        style={styles.container}
        contentContainerStyle={scrollViewContentContainerStyle}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default KeyboardAwareView;
