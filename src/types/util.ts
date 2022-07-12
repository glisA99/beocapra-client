export type WithChildren<T = {}> = {
    children: React.ReactNode
} & T;

export type WithoutChildren<T = {}> = {
    children: never
} & T;

export type MakeRequired<T,K extends keyof T> = Omit<T,K> & Required<{
    [P in K]: T[P]
}>

export type MakeOptional<T,K extends keyof T> = Omit<T,K> & Partial<{
    [P in K]: T[P]
}>

