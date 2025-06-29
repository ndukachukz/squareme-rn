import React from "react";

export interface MenuListItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  iconContainerBgColor?: string;
}
