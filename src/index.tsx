import React from 'react';
import type { TextProps } from 'react-native';
import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent';

export interface FastTextProps
  extends Omit<
    TextProps,
    | 'onPress'
    | 'onPressIn'
    | 'onPressOut'
    | 'onLongPress'
    | 'pressRetentionOffset'
  > {}

const Text: React.FC<FastTextProps> = (props) => {
  return <NativeText {...props} />;
};

export { Text };
