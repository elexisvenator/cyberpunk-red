import { resolveValue } from "path-value";

type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}` | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

/**
 * The type safe path to a value in {T} as a string, in dot notation
 */
export type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export interface IStringPathable {
  getPath<P extends Path<this>>(path: P): P;
}

export function getValueByPath<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  return resolveValue(obj, path as string) as PathValue<T, P>;
}
