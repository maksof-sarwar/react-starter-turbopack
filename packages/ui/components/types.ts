import { HTMLAttributes } from "react";

type TypeWithGeneric<T> = T[]
type extractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

export type TProps<A extends HTMLAttributes<HTMLElement>> = React.DetailedHTMLProps<A, extractGeneric<TypeWithGeneric<A>>>;


