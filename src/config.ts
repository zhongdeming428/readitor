/*
 * @Author: Russ Zhong
 * @Date: 2019-06-30 14:11:03
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2019-07-05 17:03:32
 * 配置信息文件
 */

/**
 * configs which icon to show
 */

export interface IConfig {
	/**
	 * 控制 icons 的显隐
	 */
	icons?: {
		[iconName: string]: boolean
	}
	/**
	 * 指定图标颜色
	 */
	iconColor?: string
	/**
	 * 图标大小
	 */
	iconSize?: number
	/**
	 * 图标在鼠标滑过时的颜色
	 */
	iconHoverColor?: string
	/**
	 * 取色板可用的颜色
	 */
	colors?: string[]
	/**
	 * 最大撤销步数
	 */
	maxUndoCount?: number
	/**
	 * 编辑器 placeholder
	 */
	placeholder?: string
	/**
	 * 是否自动聚焦
	 */
	autoFocus?: boolean
}

const config: IConfig = {
	icons: {
		bold: true,
		italic: true,
		underline: true,
		delline: true,
		cleardoc: true,
		selectAll: true,
		alignLeft: true,
		alignCenter: true,
		alignRight: true,
		alignFull: true,
		indent: true,
		outdent: true,
		link: true,
		unlink: true,
		removeformat: true,
		unorderedlist: true,
		orderedlist: true,
		pformat: true,
		fontsize: true,
		insertHr: true,
		setForeColor: true,
		setBackColor: true,
	},
	iconColor: '#666',
	iconSize: 24,
	iconHoverColor: '#c3c3c3',
	colors: [
		'#fff',
		'#000',
		'#c00000',
		'#ff0000',
		'#ffc000',
		'#ffff00',
		'#92d050',
		'#00b050',
		'#00b0f0',
		'#0070c0',
		'#002060',
		'#7030a0',
	],
	maxUndoCount: 20,
	placeholder: '开始编辑……',
	autoFocus: false,
}

export default config
