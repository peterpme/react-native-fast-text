// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "tsx";

export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find the import statement from 'react-native-fast-text'
  const fastTextImportDeclaration = root.find(j.ImportDeclaration, {
    source: { value: "react-native-fast-text" }
  });

  if (fastTextImportDeclaration.size() === 0) {
    // No import statement from 'react-native-fast-text', return the original source
    return fileInfo.source;
  }

  // Find the import statement from 'react-native'
  const reactNativeImportDeclaration = root.find(j.ImportDeclaration, {
    source: { value: "react-native" }
  });

  // If there's already an import statement from 'react-native', add Text to it
  if (reactNativeImportDeclaration.size() > 0) {
    reactNativeImportDeclaration
      .get(0)
      .node.specifiers.push(j.importSpecifier(j.identifier("Text")));
  } else {
    // If there's no import statement from 'react-native', create one
    const newImportReactNative = j.importDeclaration(
      [j.importSpecifier(j.identifier("Text"))],
      j.stringLiteral("react-native")
    );

    // Insert the new import statement after the 'react-native-fast-text' import statement
    fastTextImportDeclaration.insertAfter(newImportReactNative);
  }

  // Remove the 'react-native-fast-text' import statement
  fastTextImportDeclaration.remove();

  return root.toSource();
}
