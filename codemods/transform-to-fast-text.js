export const parser = "tsx";

export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find the import statement from 'react-native'
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: { value: "react-native" }
  });

  if (importDeclaration.size() === 0) {
    // No import statement from 'react-native', return the original source
    return fileInfo.source;
  }

  // Check if Text is one of the imported identifiers
  const hasTextImport =
    importDeclaration
      .find(j.ImportSpecifier, { imported: { name: "Text" } })
      .size() > 0;

  if (!hasTextImport) {
    // Text is not imported from 'react-native', return the original source
    return fileInfo.source;
  }

  // Create a new import statement for Text from 'react-native-fast-text'
  const newImportText = j.importDeclaration(
    [j.importSpecifier(j.identifier("Text"))],
    j.stringLiteral("react-native-fast-text")
  );

  // Insert the new import statement before the existing import statement
  root.get().node.program.body.unshift(newImportText);

  // Remove Text from the original import statement
  importDeclaration
    .find(j.ImportSpecifier, { imported: { name: "Text" } })
    .remove();

  // Check if the original import statement still has any specifiers,
  // if not, remove the entire import statement
  if (importDeclaration.find(j.ImportSpecifier).size() === 0) {
    importDeclaration.remove();
  }

  return root.toSource();
}
