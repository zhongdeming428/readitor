import { UndoManager } from '../src/utils/UndoManager'

function getManagerInstance(count = 10) {
	// 假设最大撤销数为 10
	return new UndoManager(count)
}

describe('test push', () => {
	let content = 'The first str'
	test('manager obj has the correct maxUndoCount', () => {
		const manager = getManagerInstance()
		expect(manager.maxUndoCount).toEqual(10)
		expect(manager.idx).toEqual(-1)
		expect(manager.stack).toEqual([])
		expect(manager.canUndo).toEqual(false)
		expect(manager.canRedo).toEqual(false)
	})
	test('push one', () => {
		const manager = getManagerInstance()
		manager.push(content)
		expect(manager.idx).toEqual(0)
		expect(manager.stack).toEqual([content])
	})
	test('push 5 items', () => {
		const manager = getManagerInstance()
		for (let i = 0; i < 5; i++) {
			manager.push(content)
		}
		expect(manager.idx).toEqual(4)
		expect(manager.stack).toEqual(Array(5).fill(content))
	})
	test('push 11 items', () => {
		const manager = getManagerInstance(),
			theSpecificItem = 'the specifc item'
		for (let i = 0; i < 11; i++) {
			manager.push(i === 10 ? theSpecificItem : content)
		}
		expect(manager.idx).toEqual(9)
		expect(manager.stack).toEqual([...Array(9).fill(content), theSpecificItem])
		for (let i = 0; i < 4; i++) {
			manager.push('new item')
		}
		expect(manager.stack).toEqual([
			...Array(5).fill(content),
			theSpecificItem,
			...Array(4).fill('new item'),
		])
	})
})

describe('test undo & redo', () => {
	const manager = getManagerInstance()
	const contents = [
		'1111',
		'2222',
		'3333',
		'4444',
		'5555',
		'6666',
		'7777',
		'8888',
		'9999',
		'0000',
	]
	for (let i = 0; i < 10; i++) {
		manager.push(contents[i])
	}

	test('undo', () => {
		let curStr = manager.undo()
		expect(curStr).toEqual(contents[manager.idx])
		expect(getManagerInstance().undo()).toEqual('')
		expect(manager.idx).toEqual(8)
		expect(manager.stack).toEqual(contents)
		curStr = manager.undo()
		expect(curStr).toEqual(contents[manager.idx])
		expect(manager.stack).toEqual(contents)
		expect(manager.idx).toEqual(7)
		manager.push('9999')
		expect(manager.idx).toEqual(8)
		expect(manager.size).toEqual(9)
	})

	test('redo', () => {
		for (let i = 0; i < 10; i++) {
			manager.push(contents[i])
		}
		expect(manager.stack).toEqual(contents)
		expect(manager.idx).toEqual(manager.size - 1)
		for (let i = 0; i < 5; i++) {
			manager.undo()
		}
		for (let i = 0; i < 5; i++) {
			let str = manager.redo()
			expect(str).toEqual(contents[i + 5])
		}
		expect(manager.stack).toEqual(contents)
		expect(manager.idx).toEqual(manager.size - 1)
		expect(manager.canRedo).toEqual(false)
		expect(manager.canUndo).toEqual(true)
		let str = manager.redo()
		expect(manager.idx).toEqual(manager.size - 1)
		expect(str).toEqual(manager.stack[manager.idx])
	})
})
