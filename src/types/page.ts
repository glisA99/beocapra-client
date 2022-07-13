export type Pagable = {
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean
}

export type PagePros = {
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export type Page<T> = PagePros & {
    content: Array<T>,
    pageable: Pagable
}