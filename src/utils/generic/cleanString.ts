// Trim and replace extra whitespace with single spaces
export function cleanString(
  str: string,
  options: {
    disableTrimEnd?: boolean;
    disableTrimStart?: boolean;
    disableReplaceWhitespace?: boolean;
  } = {}
) {
  let result = str;

  // Perform all operations unless disabled
  if (!options.disableTrimEnd) result = result.trimEnd();
  if (!options.disableTrimStart) result = result.trimStart();
  if (!options.disableReplaceWhitespace) result = result.replace(/\s+/g, " ");

  return result;
}
