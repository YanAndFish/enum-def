import { defineEnum } from '../impl'
import {
  type EnumItemValue,
  type EnumIterate,
  type EnumNames,
  type EnumTitles,
  type EnumValues,
  type RequestEnumItem,
  type RequestEnumValue,
  type RequestStrictEnumItem,
  type RequestStrictEnumValue,
  type UnknownEnumDefine,
  type UnWrapEnumValue,
  type UnWrapEnumValues,
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

arrow.$in(1, 'down', 'up')
const v = arrow.$omit('down', 'up')
const h = arrow.$pick('down', 'up')

v.left.value
h.up.value

declare function handleMove<T extends RequestStrictEnumValue<typeof arrow>[]>(...val: T): UnWrapEnumValues<typeof arrow>

const strictRes = handleMove(arrow.left.value, arrow.down.value)
// err
handleMove(v.left.value)

// ========== RequestStrictEnumItem 测试用例 ==========

// 声明一个接收严格枚举项的函数
declare function handleStrictMove(item: RequestStrictEnumItem<typeof arrow>): void

// ok: 直接传入枚举项
handleStrictMove(arrow.up)
handleStrictMove(arrow.down)
handleStrictMove(arrow.left)
handleStrictMove(arrow.right)

// ok: 通过已知枚举值访问
handleStrictMove(arrow[1])
handleStrictMove(arrow[2])
handleStrictMove(arrow[3])
handleStrictMove(arrow[4])
handleStrictMove(arrow['up'])
handleStrictMove(arrow['down'])

// err: 不能传入其他枚举的项
handleStrictMove(audit.Failing)
// err: 不能传入未知的枚举项
handleStrictMove(arrow[n]!)
// err: 不能传入未知的属性访问
handleStrictMove(arrow.foo!)

// 类型赋值测试
declare const strictItem1: RequestStrictEnumItem<typeof arrow>
declare const strictItem2: RequestStrictEnumItem<typeof arrow>

// ok: 可以赋值为已知枚举项
const si1: RequestStrictEnumItem<typeof arrow> = arrow.up
const si2: RequestStrictEnumItem<typeof arrow> = arrow[1]
const si3: RequestStrictEnumItem<typeof arrow> = arrow['left']

// 泛型函数测试
declare function processItems<T extends RequestStrictEnumItem<typeof arrow>[]>(...items: T): void

// ok: 传入多个严格枚举项
processItems(arrow.up, arrow.down)
processItems(arrow[1], arrow[2], arrow[3])
processItems(arrow.left, arrow['right'])

// err: 不能混入其他枚举
processItems(arrow.up, audit.Failing)
// err: 不能传入未知枚举项
processItems(arrow.up, arrow[n]!)

// 与 RequestEnumItem 对比测试（展示区别）
declare function looseMove(item: RequestEnumItem<typeof arrow>): void

// ok: RequestEnumItem 可以接受未知枚举项
looseMove(arrow.up)
looseMove(arrow[n]!)
looseMove(arrow.foo!)

// 但 RequestStrictEnumItem 不可以
// err
handleStrictMove(arrow[n]!)
// err
handleStrictMove(arrow.foo!)

