/**
 * Function returns keys from Enum
 * @param {any} en Enum that we want keys from
 * @return {string[]} Array of keys strings
*/
export const getEnumKeys = (en: any): string[] => {
  return Object.keys(en) as string[];
};

/**
 * Function returns values from Enum
 * @param {any} en Enum that we want values from
 * @return {string[]} Array of values strings
*/
export const getEnumValues = (en: any): string[] => {
  return Object.values(en) as string[];
};

/**
 * Function checks if value is in Enum
 * @param {any} en Enum that we want to use to check
 * @param {string} value
 */
export const isValueInEnum = (en: any, value: string): boolean => {
  return getEnumValues(en).includes(value);
};

/**
 * Function checks if key is in Enum
 * @param {any} en Enum that we want to use to check
 * @param {string} key
 */
export const isKeyInEnum = (en: any, key: string): boolean => {
  return getEnumKeys(en).includes(key);
};
