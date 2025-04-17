import type { EnumDefine, EnumOption, EnumItemOption } from './types'

/**
 * 定义一个枚举
 * @param option 枚举定义
 * @example
 * ```ts
 * ```
 */
export function defineEnum<const T extends EnumOption>(option: T): EnumDefine<T> {
  const res: any = {}

  Object.entries(option).forEach(([key, value]: [string, any]) => {
    const _value = Object.freeze({
      ...value,
      name: key,
    })
    Object.defineProperty(res, key, {
      enumerable: true,
      value: Object.assign(new Number((value as EnumItemOption).value), _value),
      writable: false,
    })
    Object.defineProperty(res, (value as EnumItemOption).value, {
      enumerable: false,
      value: Object.assign(new String(key), _value),
      writable: false,
    })
  })

  res[Symbol.iterator] = function* () {
    for (const key in res) {
      yield res[key]
    }
  }

  Object.defineProperty(res, '$in', {
    enumerable: false,
    value: (value: number | string, ...items: (keyof T)[]) => {
      items = items.length === 0 ? Object.keys(res) : items

      if (typeof value === 'number') {
        return items.some((item) => res[item].value === value)
      } else {
        return items.some((item) => res[item].name === value)
      }
    },
    writable: false
  })

  Object.defineProperty(res, '$pick', {
    enumerable: false,
    value: (...items: (keyof T)[]) => {
      return defineEnum(Object.fromEntries(items.map((item) => [item, res[item]])))
    },
    writable: false
  })

  Object.defineProperty(res, '$omit', {
    enumerable: false,
    value: (...items: (keyof T)[]) => {
      return defineEnum(Object.fromEntries(Object.keys(res).filter((key) => !items.includes(key as keyof T)).map((key) => [key, res[key]])))
    },
    writable: false
  })

  return res
}
