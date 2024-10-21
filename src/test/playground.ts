import { defineEnum } from '../impl'
import {
  type EnumItemValue,
  type EnumIterate,
  type EnumNames,
  type EnumTitles,
  type EnumValues,
  type RequestEnumItem,
  type RequestEnumValue,
  type RequestStrictEnumValue,
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

// err
audit.Passed === 3

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
// err
enumItem(audit.Failing)
// err
enumItem(audit[1])
// err
enumItem(audit[n]!)
enumItem(arrow[n]!)
enumItem(arrow.dddddd!)

declare const ev: RequestEnumValue<typeof arrow>
declare function enumValue(item: RequestEnumValue<typeof arrow>): void

enumValue(1)
enumValue(n)
// err
enumValue(arrow.down)
enumValue(arrow.down.value)
// err
enumValue(audit.Failing.value)
// err
enumValue(audit[n]!.value)
enumValue(arrow[n]!.value)
enumValue(arrow.foo!.value)

  ;[arrow.down.value, arrow.up.value].includes(1)

declare function giveMeAEnumItem(item: number): void
giveMeAEnumItem(arrow.down.value)

declare const evs: RequestStrictEnumValue<typeof arrow>
declare function striceEnumValue(item: RequestStrictEnumValue<typeof arrow>): void

// err
striceEnumValue(1)
// err
striceEnumValue(n)
// err
striceEnumValue(arrow.down)
striceEnumValue(arrow.down.value)
// err
striceEnumValue(audit.Failing.value)
// err
striceEnumValue(audit[n]!.value)
// err
striceEnumValue(arrow[n]!.value)
striceEnumValue(arrow[1].value)
striceEnumValue(arrow['left'].value)
// err
striceEnumValue(arrow.foo!.value)

type num = 1
type enu = EnumItemValue<{}, 1>

type eiv = EnumItemValue<{ a: { title: 'ddd'; value: 1 }; b: { title: 'b'; value: 2 } }, 3>
type eive = UnWrapEnumValue<eiv>
type eivs = UnWrapEnumValue<1>
type eivss = UnWrapEnumValue<number>

type av = (typeof arrow)[EnumValues<typeof arrow>]['value']

type unknownIter = EnumIterate<{}>

arrow.in(1, 'down', 'up')