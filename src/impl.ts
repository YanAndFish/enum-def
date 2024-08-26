import type { EnumDefine, EnumOption, UnknownEnumDefine } from './types'

export function defineEnum<const T extends EnumOption>(items: T): EnumDefine<T> & UnknownEnumDefine<T> {
  return null as any
}
