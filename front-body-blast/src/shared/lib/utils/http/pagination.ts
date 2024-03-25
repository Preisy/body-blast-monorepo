export type IPagination<T extends string = string> = IPagination.Base & IPagination.Sort<T> & IPagination.Filter;

export namespace IPagination {
  export interface Base {
    page: number;
    size: number;
    readonly totalPages: number;
  }

  export interface Sort<T extends string = string> {
    field?: T;
    order?: Sort.EOrder;
  }

  export namespace Sort {
    export type EOrder = keyof typeof EOrder.locale;

    export namespace EOrder {
      export const locale = {
        ASC: 'По возрастанию',
        DESC: 'По убыванию',
      } as const;

      export const values = () => Object.keys(locale) as EOrder[];
    }
  }

  export interface Filter {
    query?: string;
  }

  export type Params = Partial<Omit<IPagination, 'totalPages'>>;

  export interface Res<T = unknown> extends Base {
    content: T[];
  }
}
