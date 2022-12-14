import { ReactNode } from "react";

type TupleUnion<U extends string, R extends string[] = []> = {
    [S in U]: Exclude<U, S> extends never 
                ? [...R, S] 
                : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] & string[];

type ParentNode = {
  children: ReactNode
}

export type {
  TupleUnion,
  ParentNode,
}