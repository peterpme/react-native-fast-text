# react-native-fast-text

TLDR https://x.com/natebirdman/status/1695511232298783079?s=42

The Text component in React Native includes extra props like `onLongPress` `onPress`, etc. It also includes an extra `setHighlighted` call that for most folks doesn't matter. This adds overhead.

This component removes the overhead. This will most likely be fixed in React Native eventually, but for now, feel free to drop it right in.

https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Text/Text.js

Thanks

- Nate from Tamagui (@natebirdman)
- Fernando from Beatgig/Moti (@FernandoTheRojo)
