import { type ReactNode } from 'react';
import { type z } from 'zod';

type ParentNode = {
  children: ReactNode;
};

type ModelId = 'updatedAt' | 'createdAt' | 'id';
type ZodObject<T> = z.ZodObject<z.ZodRawShape, 'strip', z.ZodType<T>>;

export type { ParentNode, ModelId, ZodObject };
