/**
 * Simple promise to create delay
 * @param {number} msTime Time to wait ```in milliseconds```
 */
export const delay = async (msTime: number): Promise<void> => {
  await new Promise((res) => setTimeout(res, msTime));
};
