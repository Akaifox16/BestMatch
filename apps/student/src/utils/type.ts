import { ReactNode } from 'react';
import { z } from 'zod';

type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

type ParentNode = {
  children: ReactNode;
};

type ModelId = 'updatedAt' | 'createdAt' | 'id';
type ZodObject<T> = z.ZodObject<z.ZodRawShape, 'strip', z.ZodType<T>>;

export type { TupleUnion, ParentNode, ModelId, ZodObject };
