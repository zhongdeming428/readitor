/*
 * @Author: Russ Zhong
 * @Date: 2019-06-30 17:03:59
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-06-30 17:34:39
 * 事件发布订阅
 */

export const eventsType = {
	BEFORE_CHANGE: 'before_change',
	AFTER_CHANGE: 'after_change',
}

class EventBus {
	events: {
		[eventName: string]: Set<Function>
	} = {}

	subscribe(eventName: string, cb: Function) {
		if (!(eventName in this.events)) this.events[eventName] = new Set()
		this.events[eventName].add(cb)
	}

	unsubscribe(eventName: string, cb: Function) {
		if (!(eventName in this.events)) return
		this.events[eventName].delete(cb)
	}

	emit(eventName: string, ...args: any) {
		this.events[eventName].forEach((cb: Function) => {
			cb(...args)
		})
	}
}

export default new EventBus()
