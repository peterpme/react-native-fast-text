declare module 'react-native/Libraries/Text/TextNativeComponent' {
  import {TextProps} from 'react-native';

  export interface NativeTextProps extends TextProps {
    isHighlighted?: boolean;
    selectionColor?: any;
    onClick?: (event: any) => void;
    isPressable?: boolean;
  }

  export const NativeText: React.ComponentType<NativeTextProps>;
  export const NativeVirtualText: React.ComponentType<NativeTextProps>;
}
