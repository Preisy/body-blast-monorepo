import { Moment } from 'moment';

export interface IRes<T = unknown> {
  data: T;
  message: string;
  timestamp: Moment;
}

export namespace IRes {
  export function isRes(val: unknown): val is IRes {
    return !!val && typeof val === 'object' && 'data' in val && 'message' in val && typeof val.message === 'string';
    //------1-------------------2----------------------3-------------------4----------------------------5
    //1 - val not undefined + val not null
    //2 - val is object
    //3 - val has 'data', something like {data: 123}
    //4 - val has 'message', something like {data: 123, message: "234"}
    //5 - val.message is string

    //Example of acceptable val:
    // val = {
    //   data: {
    //     a: 123,
    //     b: 456
    //   },
    //   message: "Accepted!"
    // }
  }
}
