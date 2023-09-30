import { createElement } from "react";

export const Text = ({
  pressRectOffset,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => createElement("RCTText", props);
