/*
 * @Author: Russ Zhong
 * @Date: 2019-06-30 16:01:54
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-05 17:25:08
 * 封装所有 document.execCommand 操作
 */

import eventbus, { eventsType } from './eventbus'
import { processList } from './TextOperation'

const exec = (cmd: string, param?: any) =>
	document.execCommand(cmd, false, param)

const commands = {
	/**加粗 */
	bold: () => exec('bold'),
	/**斜体 */
	italic: () => exec('italic'),
	/**背景色 */
	backColor: (color: string) => exec('backcolor', color),
	/**复制 */
	copy: () => exec('copy'),
	/**新增链接 */
	createLink: (url: string) => exec('createlink', url),
	/**剪切 */
	cut: () => exec('cut'),
	/**删除 */
	delete: () => exec('delete'),
	/**设置字体 */
	setFontFamily: (fontname: string) => exec('fontname', fontname),
	/**设置字体大小， 1~7 */
	setFontSize: (size: number) => exec('fontsize', size),
	/**修改字体颜色 */
	setFontColor: (color: string) => exec('forecolor', color),
	/**用指定标签包围当前文本块 */
	formatBlock: (tagName: string) => exec('formatblock', `<${tagName}>`),
	/**缩进文本 */
	setIndent: () => exec('indent'),
	/**插入一根横线 */
	insertHR: () => exec('inserthorizontalrule'),
	/**插入图片 */
	insertImg: (src: string) => exec('insertimage', src),
	/**插入有序列表 */
	insertOL: () => {
		exec('insertorderedlist')
		processList()
	},
	/**插入无序列表 */
	insertUL: () => {
		exec('insertunorderedlist')
		processList()
	},
	/**插入 p 标签 */
	insertP: () => exec('insertparagraph'),
	/**文本居中 */
	setTextCtr: () => exec('justifycenter'),
	/**文本居左 */
	setTextLeft: () => exec('justifyleft'),
	/**文本居右 */
	setTextRight: () => exec('justifyright'),
	/**文本两端对齐 */
	setTextFull: () => exec('justifyfull'),
	/**减少缩进 */
	setOutdent: () => exec('outdent'),
	/**粘贴 */
	paste: () => exec('paste'),
	/**移除文本块格式 */
	removeFormat: () => exec('removeformat'),
	/**选中所有文本 */
	selectAll: () => exec('selectall'),
	/**加下划线 */
	setUnderline: () => exec('underline'),
	/**移除文本的链接 */
	unlink: () => exec('unlink'),
	/**删除线 */
	strikeThrough: () => exec('strikethrough'),
}

Object.keys(commands).forEach(key => {
	let tmp = commands[key]
	commands[key] = (...args: any) => {
		// before change
		eventbus.emit(eventsType.BEFORE_CHANGE)
		let res = tmp(...args)
		// after change
		eventbus.emit(eventsType.AFTER_CHANGE)
		return res
	}
})

export default commands
