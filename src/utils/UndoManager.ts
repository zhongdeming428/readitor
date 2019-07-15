/*
 * @Author: Russ Zhong
 * @Date: 2019-07-02 19:41:16
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-05 15:47:00
 * 撤销重做管理器
 */

import config from '../config'

/* istanbul ignore next */
const maxUndoCount = config.maxUndoCount || 20

class UndoManager {
	stack: string[] = []
	idx: number = -1

	constructor(public maxUndoCount: number) {}

	/**
	 * 撤销函数，返回撤销后的值
	 */
	undo(): string {
		if (!this.canUndo) return ''
		else return this.stack[--this.idx]
	}

	/**
	 * 重做函数，返回重做后对应的值
	 */
	redo(): string {
		if (!this.canRedo) return this.stack[this.idx]
		else return this.stack[++this.idx]
	}

	/**新值入栈函数 */
	push(content: string): void {
		// 新内容入栈前，抛弃游标后方的内容
		this.stack = this.stack.slice(0, this.idx + 1)
		// 栈溢出，往前推
		if (this.stack.length === this.maxUndoCount) {
			this.stack.shift()
			this.stack.push(content)
		} else this.stack.push(content)
		// 更新游标
		this.idx = this.stack.length - 1
	}

	/**
	 * 获取当前 manager 的实际大小
	 */
	get size() {
		return this.stack.length
	}
	/**是否可以重做 */
	get canRedo(): boolean {
		return this.idx < this.size - 1
	}
	/**是否可以撤销 */
	get canUndo(): boolean {
		return this.idx >= 0
	}
}

export { UndoManager }

export default new UndoManager(maxUndoCount)
