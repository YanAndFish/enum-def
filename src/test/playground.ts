import { defineEnum } from '../impl'
import {
  type EnumItemValue,
  type EnumNames,
  type EnumTitles,
  type EnumValues,
  type RequestEnumItem,
  type RequestEnumValue,
  type UnknownEnumDefine,
  type UnWrapEnumValue,
} from '../types'

const audit = defineEnum({
  /** 待提交 */
  PendingRequest: {
    title: '待提交',
    value: 1,
  },
  /** 待审核 */
  Pending: {
    title: '待审核',
    value: 2,
  },
  /** 审核通过 */
  Passed: {
    title: '审核通过',
    value: 3,
  },
  /** 审核退回 */
  Failing: {
    title: '审核退回',
    value: 4,
  },
  /** 作废 */
  abandon: {
    title: '作废',
    value: 5,
  },
  /** 待反审 */
  Review: {
    title: '待反审',
    value: 6,
  },
})

const arrow = defineEnum({
  up: {
    title: '上',
    value: 1,
  },
  down: {
    title: '下',
    value: 2,
  },
  left: {
    title: '左',
    value: 3,
  },
  right: {
    title: '右',
    value: 4,
  },
})

audit.Passed.name
audit.hhhh
audit.Failing.name
audit[4].value === 4

const n: number = 10
audit[n]?.name

type names = EnumNames<typeof audit>
type values = EnumValues<typeof audit>
type titles = EnumTitles<typeof audit>

declare function qblmq(houa: number): void
declare function houa(qblmq: string): void
houa(audit[n]!)

declare const unknownEnum: UnknownEnumDefine<{ houa: { title: 'ddd'; value: 1 } }>
unknownEnum.houa?.value

declare function naive(enums: UnknownEnumDefine): void
naive(unknownEnum)
naive(audit)

declare function enumItem(item: RequestEnumItem<typeof arrow>): void

enumItem(arrow.down)
enumItem(audit.Failing)
enumItem(audit[1])
enumItem(audit[n]!)
enumItem(arrow[n]!)
enumItem(arrow.dddddd!)

declare const ev: RequestEnumValue<typeof arrow>
declare function enumValue(item: RequestEnumValue<typeof arrow>): void

enumValue(1)
enumValue(n)
enumValue(arrow.down.value)
enumValue(audit.Failing.value)
enumValue(audit[n]!.value)
enumValue(arrow[n]!.value)
enumValue(arrow.foo!.value)

declare function giveMeAEnumItem(item: number): void
giveMeAEnumItem(arrow.down.value)

type num = 1
type enu = EnumItemValue<{}, 1>
type CheckNum<T extends number> = T extends {
  __enum_opt: unknown
}
  ? 'enum'
  : 'number'

type test = CheckNum<num>
type test2 = CheckNum<enu>

type eiv = EnumItemValue<{ a: { title: 'ddd'; value: 1 }; b: { title: 'b'; value: 2 } }, 3>
type eive = UnWrapEnumValue<eiv>
type eivs = UnWrapEnumValue<1>
type eivss = UnWrapEnumValue<number>

type av = (typeof arrow)[EnumValues<typeof arrow>]['value']
