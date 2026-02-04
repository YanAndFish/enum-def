import { defineEnum } from '../impl'
import { expect, expectTypeOf, test } from 'vitest'
import type { EnumNames, RequestStrictEnumItem } from '../types'

test('enum', () => {
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

  console.log(arrow)

  expect(+arrow.up).toBe(1)
  expect(`${arrow[1]}`).toBe('up')

  for (const item of arrow) {
    expect(item).toBeDefined()
  }

  expect(+arrow.up === 1).true
  expect(`${arrow[1]}` === 'up').true

  expectTypeOf<EnumNames<typeof arrow>>().toEqualTypeOf<'up' | 'down' | 'left' | 'right'>()

  expect(arrow.$in(1)).true
})

test('RequestStrictEnumItem', () => {
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

  // 测试接收严格枚举项的函数
  function handleMove(item: RequestStrictEnumItem<typeof arrow>) {
    return item.name
  }

  // 测试枚举项可以通过
  expect(handleMove(arrow.up)).toBe('up')
  expect(handleMove(arrow.down)).toBe('down')
  expect(handleMove(arrow.left)).toBe('left')
  expect(handleMove(arrow.right)).toBe('right')

  // 测试通过已知枚举值访问
  expect(handleMove(arrow[1])).toBe('up')
  expect(handleMove(arrow[2])).toBe('down')
  expect(handleMove(arrow[3])).toBe('left')
  expect(handleMove(arrow[4])).toBe('right')

  // 验证返回的枚举项属性
  const item = arrow.up as RequestStrictEnumItem<typeof arrow>
  expect(item.name).toBe('up')
  expect(item.title).toBe('上')
  expect(+item.value).toBe(1)

  // 类型测试：确保具体枚举项可以赋值给 RequestStrictEnumItem
  expectTypeOf<typeof arrow.up>().toMatchTypeOf<RequestStrictEnumItem<typeof arrow>>()
  expectTypeOf<typeof arrow[1]>().toMatchTypeOf<RequestStrictEnumItem<typeof arrow>>()
})