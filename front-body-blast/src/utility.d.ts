declare type Nullable<T> = T | null;
declare type DeepNullable<T> = T extends object ? { [P in keyof T]: T[P] | null } : T | null;
declare type Nillable<T> = T | null | undefined;
declare type Optional<T> = T | undefined;

declare type NotNull<T> = Exclude<T, null>;
declare type NotNill<T> = Exclude<T, null | undefined>;
declare type Defined<T> = Exclude<T, undefined>;

declare type Writable<T> = { -readonly [P in keyof T]: T[P] };

declare type Without<T, U> = T | U extends object ? { [P in Exclude<keyof T, keyof U>]?: never } : never;
declare type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
declare type Intersection<T, U> = T | U extends object ? { [P in Extract<keyof T, keyof U>]: T[P] } : never;
declare type Diff<T, U> = T | U extends object ? { [P in Exclude<keyof T, keyof U>]: T[P] } : never;
