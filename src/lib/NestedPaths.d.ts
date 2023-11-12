type Primitive = string | number | symbol;

type GenericObject = Record<Primitive, unknown>;

type Join<
  L extends Primitive | undefined,
  R extends Primitive | undefined,
> = L extends string | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined;

type Union<
  L extends unknown | undefined,
  R extends unknown | undefined,
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;

/**
 * NestedPaths
 * Get all the possible paths of an object
 *
 * Copy from { @see https://javascript.plainenglish.io/advanced-typescript-type-level-nested-object-paths-7f3d8901f29a#4b40 }
 *
 * @example
 * type Keys = NestedPaths<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
export type NestedPaths<
  T extends GenericObject,
  Previous extends Primitive | undefined = undefined,
  Path extends Primitive | undefined = undefined,
  Except extends string = undefined,
> = {
  [K in keyof T]: T[K] extends GenericObject
    ? NestedPaths<
        T[K],
        Union<Previous, Path>,
        K extends Except ? undefined : Join<Path, K>,
        Except
      >
    : Union<
        Union<Previous, Path>,
        Join<Path, K extends Except ? undefined : K>
      >;
}[keyof T];
