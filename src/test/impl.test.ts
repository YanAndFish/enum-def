import { defineEnum } from '../impl'
import { expect, test } from 'vitest'

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

  expect(arrow.up == 1).true
  expect(arrow[1] == 'up').true
})
