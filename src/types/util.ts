export type WithChildren<T = {}> = {
    children: React.ReactNode
} & T;

export type WithoutChildren<T = {}> = {
    children: never
} & T;