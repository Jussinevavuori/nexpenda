import { canCapitalizeChar } from "./canCapitalizeChar";

export type CapitalizeOptions = {
  eachWord?: boolean;
};

export const capitalizeDefaultOptions: Required<CapitalizeOptions> = {
  eachWord: true,
};

export function capitalize(str: string, options: CapitalizeOptions = {}) {
  // Defaulted options
  const ops = { ...capitalizeDefaultOptions, ...options };

  // Final result
  let result = "";

  // Flag for when capitalization should be stopped
  let preventCapitalization = false;

  // Helper func to push char to str as is
  const preserve = (char: string) => {
    result += char;
  };

  // Helper func to push char to str as capitalized if can capitalize,
  // else pushes char to str as is
  const capitalize = (char: string) => {
    if (preventCapitalization) {
      result += char;
    } else {
      result += char.toUpperCase();
      if (!ops.eachWord && canCapitalizeChar(char)) {
        preventCapitalization = true;
      }
    }
  };

  // For each character, check whether it should be capitalized and
  // attempt capitalize it
  for (let i = 0; i < str.length; i++) {
    // Should always capitalize first letter and any letters that are
    // preceeded by other characters that can not be capitalized
    const shouldCapitalize = i === 0 || !canCapitalizeChar(str[i - 1] || "");

    if (shouldCapitalize) capitalize(str[i] || "");
    else preserve(str[i] || "");
  }

  return result;
}
