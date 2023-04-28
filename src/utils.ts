// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = <T extends readonly any[]>(
  value: T | unknown
): value is T => Array.isArray(value);
