/*
 * @Author: Russ Zhong
 * @Date: 2019-07-01 15:24:56
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-05 17:17:48
 * Range 操作方法，不考虑 IE <= 8
 */

import { RefObject } from 'react'
import commands from './commands'

export const getSel = () => window.getSelection()

export const getRange = (idx = 0) => window.getSelection()!.getRangeAt(idx)

export const setFontSize = (size: string) => {
	const wrapper = getSelectionContainerElement(),
		sel = getSel()
	if (!sel || !wrapper) return
	if (
		wrapper!.nodeName.toLowerCase() === 'span' &&
		wrapper!.textContent === sel!.toString()
	)
		(wrapper as HTMLElement)!.style.fontSize = size + 'px'
	else {
		const range = sel!.getRangeAt(0),
			span = document.createElement('span')
		span.style.fontSize = `${size}px`
		range.surroundContents(span)
	}
}

export const getSelectionContainerElement = (): Node | null => {
	let range = getRange(),
		elem
	if (range) {
		elem = range.commonAncestorContainer
		return elem.nodeType === 1 ? elem : elem.parentNode
	}
	return null
}

export const restoreSelection = () => {
	const sel = window.getSelection()
	if (!sel) return
	sel.removeAllRanges()
	sel.addRange(getRange())
}

export const createRangeByElement = (elem: Node) => {
	if (elem.nodeType !== 1) return

	const range = document.createRange()
	range.selectNode(elem)
	range.collapse(true)
}

/**
 * 把 list 整到 p 外边
 */
export function processList() {
	let elem = getSelectionContainerElement()
	if (!elem) return

	// 如果选取到了列表子节点，向上获取
	if (elem!.nodeName.toLowerCase() === 'li') elem = elem.parentNode
	const elemName = elem!.nodeName.toLowerCase()
	// 非列表元素不处理
	if (elemName !== 'ol' && elemName !== 'ul') return
	const elemParent = elem!.parentNode
	const editor = document.getElementById('reditor__content__panel')
	// 非顶级元素不处理
	if (editor !== elemParent!.parentNode || !editor) return
	editor!.insertBefore(elem!, elemParent)
	;(elemParent as HTMLElement).remove()
}

/**获得焦点的时候如果编辑器是空的，就先加入一个 p 标签 */
/**回车时使用 p 标签代替 div */
export function replaceDivWithP(editor: RefObject<HTMLElement>) {
	return (e: KeyboardEvent) => {
		let children = (editor.current && editor.current.children) || []
		if (!children.length) commands.formatBlock('p')

		if (e.keyCode === 13) {
			// 如果是回车键
			let node = getSelectionContainerElement() as HTMLElement
			if (
				node.parentNode !== editor.current || // 非顶级标签不处理
				node.tagName.toLowerCase() === 'p' || // p 标签不处理
				!/^\s*$/.test(node.innerText) // 有内容不处理
			)
				return
			const p = document.createElement('p')
			const br = document.createElement('br')
			p.appendChild(br)
			editor.current!.insertBefore(p, node)
			node.remove()
		}
	}
}
