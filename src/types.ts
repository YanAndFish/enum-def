type Definite<T> = {
  [K in keyof T as K extends `${infer _}` ? K : never]: T[K]
}

const enumOptSymbol: unique symbol = Symbol('enum_opt')
const enumValueSymbol: unique symbol = Symbol('enum_value')

type EnumOptSymbol = typeof enumOptSymbol
type EnumValueSymbol = typeof enumValueSymbol

export type EnumItemOption = {
  /**
   * 枚举标题
   */
  title: string
  /**
   * 枚举值
   */
  value: number
}

export type EnumOption = Record<string, EnumItemOption>

// 类型的值都不存在于运行时
type ValueMeta<S extends EnumOptSymbol | EnumValueSymbol, V> = Partial<Record<S, V>>

export type EnumItemValue<D extends EnumOption, V extends number> = ValueMeta<EnumOptSymbol, D> & ValueMeta<EnumValueSymbol, V> & V

export type EnumItem<T extends string, N extends string, V extends number, D extends EnumOption> = {
  /**
   * 枚举标题
   */
  readonly title: T
  /**
   * 枚举名称
   */
  readonly name: N
  /**
   * 枚举值
   */
  readonly value: EnumItemValue<D, V>
}

export type UnknownEnumType<D extends EnumOption> = EnumItem<string, string, number, D>
type NumEnumIter<D extends EnumOption> = {
  [K in keyof D as D[K] extends EnumItemOption ? K : never]: NumWrapEnumItem<
    D[K]['title'],
    K & string,
    D[K]['value'],
    D
  >
}
type StrEnumIter<D extends EnumOption> = {
  [K in keyof D as D[K] extends EnumItemOption ? D[K]['value'] : never]: StrWrapEnumItem<
    D[K]['title'],
    K & string,
    D[K]['value'],
    D
  >
}
export type EunmItemsDefine<D extends EnumOption> = NumEnumIter<D> & StrEnumIter<D>

export type EnumIterate<D> = [{}] extends [D]
  ? Iterable<unknown>
  : D extends EnumOption
  ? Iterable<NumEnumIter<D>[keyof NumEnumIter<D>]>
  : Iterable<unknown>

export type UnknownEnumDefine<D extends EnumOption = EnumOption> = {
  readonly [s: string]: (UnknownEnumType<D> & number) | undefined
} & {
  readonly [n: number]: (UnknownEnumType<D> & string) | undefined
} & EnumIterate<D>

export type DefiniteEnumDefine<D extends EnumOption> = EunmItemsDefine<D> & EnumIterate<D>

type EnumMethods<D extends EnumOption> = {
  /**
   * 判断一个值是否在指定的一个或多个枚举项中
   * @param value 值，可以是枚举值或枚举名称
   * @param items 枚举项名称，如果不传则默认所有枚举项
   */
  $in(value: number | string, ...items: (keyof D)[]): boolean
  /**
   * 排除指定的枚举项，返回一个新的枚举
   * @param items 枚举项名称
   */
  $omit<T extends (keyof D)[]>(...items: T): EnumDefine<Omit<D, T[number]>>
  /**
   * 选择指定的枚举项，返回一个新的枚举
   * @param items 枚举项名称
   */
  $pick<T extends (keyof D)[]>(...items: T): EnumDefine<Pick<D, T[number]>>
}

export type EnumDefine<D extends EnumOption> = DefiniteEnumDefine<D> & UnknownEnumDefine<D> & EnumMethods<D>

type NumWrapEnumItem<T extends string, N extends string, V extends number, D extends EnumOption> = EnumItem<
  T,
  N,
  V,
  D
> &
  Number

type StrWrapEnumItem<T extends string, N extends string, V extends number, D extends EnumOption> = EnumItem<
  T,
  N,
  V,
  D
> &
  String

// utils

/**
 * 获取枚举项名称联合类型
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * type ArrowNames = EnumNames<typeof arrow> // 'up' | 'down'
 * ```
 */
export type EnumNames<T extends UnknownEnumDefine> = Exclude<keyof Definite<T>, keyof EnumMethods<any>> & string

/**
 * 获取枚举项值联合类型
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * type ArrowValues = EnumValues<typeof arrow> // 1 | 2
 * ```
 */
export type EnumValues<T extends UnknownEnumDefine> = {
  [K in EnumNames<T>]: T[K] extends EnumItem<string, string, infer V, {}> ? V : never
}[EnumNames<T>]

/**
 * 获取枚举项标题联合类型
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * type ArrowTitles = EnumTitles<typeof arrow> // '上' | '下'
 * ```
 */
export type EnumTitles<T extends UnknownEnumDefine> = {
  [K in EnumNames<T>]: T[K] extends EnumItem<infer T, string, number, {}> ? T : never
}[EnumNames<T>]
/**
 * 请求枚举项类型，通常用于函数形参的定义
 * 可以通过的类型有：
 * - 枚举项 `arrow.up`
 * - 未知的枚举项 `arrow[n]!` 或 `arrow.foo!`
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * function handleMove(arrow: RequestEnumItem<typeof arrow>) {
 *   //...
 * }
 * handleMove(arrow.up) // ok
 * handleMove(arrow[n]!) // ok
 * handleMove(arrow.foo!) // ok
 * handleMove(animals.brid) // error
 * ```
 */
export type RequestEnumItem<T> = T extends UnknownEnumDefine<infer D>
  ? EunmItemsDefine<D>[keyof EunmItemsDefine<D>] | UnknownEnumType<D>
  : never
/**
 * 请求枚举值类型，通常用于函数形参的定义
 * 可以通过的类型有：
 * - 枚举值 `arrow.up.value`
 * - 未知的枚举值 `arrow[n]!` 或 `arrow.foo!.value`
 * - 数字
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 *
 * function handleMove(arrow: RequestEnumValue<typeof arrow>) {
 *  //...
 * }
 *
 * handleMove(arrow.up.value) // ok
 * handleMove(1) // ok
 * handleMove(arrow[n]!) // ok
 * handleMove(arrow.foo!.value) // ok
 * handleMove(animals.brid.value) // error
 * handleMove(9999) // 非法的枚举值，但是不会报错
 * ```
 */
export type RequestEnumValue<T> = T extends UnknownEnumDefine<infer D> ? Partial<ValueMeta<EnumOptSymbol, D>> & number : never

/**
 * 请求严格枚举值类型，通常用于函数形参的定义
 * 可以通过的类型有：
 * - 枚举值 `arrow.up.value`
 * - 未知的枚举值 `arrow[n]!` 或 `arrow.foo!.value`
 * - 数字
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 *
 * function handleMove(arrow: RequestEnumValue<typeof arrow>) {
 *  //...
 * }
 *
 * handleMove(arrow.up.value) // ok
 * handleMove(1) // error
 * handleMove(arrow[n]!) // error
 * handleMove(arrow.foo!.value) // error
 * handleMove(animals.brid.value) // error
 * handleMove(9999) // error
 * ```
 */
export type RequestStrictEnumValue<T> = T extends UnknownEnumDefine<infer D> ? EnumItemValue<D, EnumValues<T>> : never

/**
 * 解构枚举类型
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * const up = arrow.up.value // EnumItemValue<{ up: { title: '上', value: 1 }, down: { title: '下', value:2 } }, 1>
 *
 * type UpValue = UnWrapEnumValue<typeof up> // 1
 * ```
 */
export type UnWrapEnumValue<T> = T extends ValueMeta<EnumValueSymbol, infer V> ? V : T extends number ? T : never

/**
 * 获取枚举项值解构联合类型
 * @example
 * ```ts
 * const arrow = defineEnum({ up: { title: '上', value: 1 }, down: { title: '下', value:2 } })
 * type ArrowValues = EnumValues<typeof arrow> // 1 | 2
 * ```
 */
export type UnWrapEnumValues<T extends UnknownEnumDefine> = T extends UnknownEnumDefine<infer D> ? D[keyof D]['value'] : never