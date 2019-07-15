import { REditor } from '../REditor'
import { eventsType, eventbus } from '../utils'

/**获取编辑器文本内容 */
export function getTextContent(this: REditor): string {
	return this.editor.current!.textContent || ''
}

/**获取编辑器 html 内容 */
export function getHTMLContent(this: REditor): string {
	return this.editor.current!.innerHTML
}

/**清空编辑器 */
export function clear(this: REditor) {
	// focused?
	this.editor.current!.innerHTML = ''
}

/**注册事件 */
export function beforeChange(cb: Function) {
	eventbus.subscribe(eventsType.BEFORE_CHANGE, cb)
}

export function afterChange(cb: Function) {
	eventbus.subscribe(eventsType.AFTER_CHANGE, cb)
}

export interface IApis {
	clear(): void
	getTextContent(): string
	getHTMLContent(): string
	beforeChange(cb: Function): void
	afterChange(cb: Function): void
}
