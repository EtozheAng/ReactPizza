export enum sortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  NAME_DESC = 'name',
  NAME_ASC = '-name',
}

export type Sort = {
  name: string
  sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}
