# react-native-fast-text

A faster version of the React Native Text component that removes (for the most part) unnecessary overhead.

## Why?

The native Text implementation includes additional \*onPress props:

- onLongPress
- onPress
- onPressIn
- onPressOut
- disabled
- pressReactOffset

It also includes a state variable called `isHighlighted`, which causes unnecessary renders. 
Additionally, it wraps the Text with the `<TextAncestor.Provider />` context provider, thereby polluting the React tree. 

By removing this extra logic and going straight down into `RCTText` we have a much faster text component.

### Notice

It's worth noting that removing the context provider has one downside: while nesting Text inside Text still works, each individual Text node must be styled independently since style inheritance is lost. The advantages outweigh the disadvantages though.

## Installation

Install the module. Use it however you'd like.

There's a codmod in here that will convert _all_ of your `import { Text } from 'react-native` to use `import { Text } from 'react-native-fast-text`.

```
npx jscodeshift -t node_modules/react-native-fast-text/codemods/transform-to-fast-text.js
```

Then when the time comes, you can also run a codemod to remove `react-native-fast-text`

```
npx jscodeshift -t node_modules/react-native-fast-text/codemods/transform-from-fast-text.js
```

### Links

Read this [Twitter thread by Nate](https://x.com/natebirdman/status/1695511232298783079?s=42)

Here's the [Text implementation from React Native](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Text/Text.js)

## Thanks

All I did was create the package. The brains behind this is Nate from Tamagui ([@natebirdman](https://x.com/natebirdman)). Tamagui is an incredible cross platform library.

[@FernandoTheRojo](https://x.com/FernandoTheRojo) also had an awesome [thread](https://x.com/fernandotherojo/status/1707762822015267219?s=42) breaking down why this is happening.
