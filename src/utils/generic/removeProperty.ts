/**
 * Removes a property from an object
 *
 * @param object Object to remove property from
 * @param key 	 Key of property to remove
 * @returns 		 New object with property removed
 */
export function removeProperty<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  // eslint-disable-next-line
  const { [key]: deletedProperty, ...newObject } = object;
  return newObject;
}
